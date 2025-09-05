"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DaySchedule, TimeSlot } from "@/types/discount";
import { Switch } from "@/components/ui/switch";
import { Plus, Copy, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface ComplexSchedulingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  daySchedules: DaySchedule[];
  onSave: (scheduleData: { daySchedules: DaySchedule[]; validityPeriod?: DateRange }) => void;
}

interface CopyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceDay: string;
  timeSlots: TimeSlot[];
  onCopy: (targetDays: number[]) => void;
}

function CopyModal({ open, onOpenChange, sourceDay, timeSlots, onCopy }: CopyModalProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const days = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedDays(checked ? days.map(d => d.value) : []);
  };

  const handleDayToggle = (dayValue: number) => {
    const newSelected = selectedDays.includes(dayValue)
      ? selectedDays.filter(d => d !== dayValue)
      : [...selectedDays, dayValue];
    setSelectedDays(newSelected);
    setSelectAll(newSelected.length === days.length);
  };

  const handleApply = () => {
    onCopy(selectedDays);
    onOpenChange(false);
    setSelectedDays([]);
    setSelectAll(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white text-gray-900 border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Copy times to</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="select-all"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
          </div>
          
          <div className="space-y-2">
            {days.map(day => (
              <div key={day.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`day-${day.value}`}
                  checked={selectedDays.includes(day.value)}
                  onChange={() => handleDayToggle(day.value)}
                  className="rounded"
                />
                <label htmlFor={`day-${day.value}`} className="text-sm">
                  {day.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-[#D8550D] hover:bg-[#A8420A] text-white">
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ComplexSchedulingModal({ 
  open, 
  onOpenChange, 
  daySchedules: initialDaySchedules, 
  onSave 
}: ComplexSchedulingModalProps) {
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>(initialDaySchedules);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [copySource, setCopySource] = useState<{ day: string; timeSlots: TimeSlot[] } | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 1 week from now
  });

  const days = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  const handleSave = () => {
    // Include the date range in the saved data
    const scheduleWithDates = {
      daySchedules,
      validityPeriod: dateRange
    };
    onSave(scheduleWithDates);
    onOpenChange(false);
  };

  const toggleDay = (dayOfWeek: number) => {
    setDaySchedules(prev => {
      const existing = prev.find(d => d.dayOfWeek === dayOfWeek);
      if (existing) {
        return prev.map(d => 
          d.dayOfWeek === dayOfWeek 
            ? { ...d, enabled: !d.enabled }
            : d
        );
      } else {
        return [...prev, {
          dayOfWeek,
          enabled: true,
          timeSlots: [{ id: Date.now().toString(), startTime: '06:00', endTime: '08:00' }]
        }];
      }
    });
  };

  const addTimeSlot = (dayOfWeek: number) => {
    setDaySchedules(prev => prev.map(d => {
      if (d.dayOfWeek !== dayOfWeek) return d;
      
      // If no time slots, use default values
      if (d.timeSlots.length === 0) {
        return {
          ...d,
          timeSlots: [...d.timeSlots, {
            id: Date.now().toString(),
            startTime: '06:00',
            endTime: '07:00'
          }]
        };
      }
      
      // Get the last time slot
      const lastSlot = d.timeSlots[d.timeSlots.length - 1];
      const [endHour, endMinute] = lastSlot.endTime.split(':').map(Number);
      
      // Calculate next start time (1 hour after last end time)
      let nextStartHour = endHour + 1;
      if (nextStartHour > 23) nextStartHour = 0; // Handle midnight rollover
      
      // Set end time to 1 hour after start
      let nextEndHour = nextStartHour + 1;
      if (nextEndHour > 23) nextEndHour = 0; // Handle midnight rollover
      
      // Format times to HH:MM
      const formatTime = (hour: number, minute: number) => 
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      
      return {
        ...d,
        timeSlots: [
          ...d.timeSlots,
          {
            id: Date.now().toString(),
            startTime: formatTime(nextStartHour, endMinute),
            endTime: formatTime(nextEndHour, endMinute)
          }
        ]
      };
    }));
  };

  const removeTimeSlot = (dayOfWeek: number, slotId: string) => {
    setDaySchedules(prev => prev.map(d => 
      d.dayOfWeek === dayOfWeek 
        ? { ...d, timeSlots: d.timeSlots.filter(slot => slot.id !== slotId) }
        : d
    ));
  };

  const updateTimeSlot = (dayOfWeek: number, slotId: string, updates: Partial<TimeSlot>) => {
    setDaySchedules(prev => prev.map(d => 
      d.dayOfWeek === dayOfWeek 
        ? { 
            ...d, 
            timeSlots: d.timeSlots.map(slot => 
              slot.id === slotId ? { ...slot, ...updates } : slot
            )
          }
        : d
    ));
  };

  const copyTimesToDays = (sourceDayOfWeek: number, targetDays: number[]) => {
    const sourceDay = daySchedules.find(d => d.dayOfWeek === sourceDayOfWeek);
    if (!sourceDay) return;

    setDaySchedules(prev => {
      const updated = [...prev];
      
      targetDays.forEach(targetDay => {
        const existingIndex = updated.findIndex(d => d.dayOfWeek === targetDay);
        const newTimeSlots = sourceDay.timeSlots.map(slot => ({
          ...slot,
          id: `${targetDay}-${Date.now()}-${Math.random()}`
        }));
        
        if (existingIndex >= 0) {
          updated[existingIndex] = {
            dayOfWeek: targetDay,
            enabled: true,
            timeSlots: newTimeSlots
          };
        } else {
          updated.push({
            dayOfWeek: targetDay,
            enabled: true,
            timeSlots: newTimeSlots
          });
        }
      });
      
      return updated;
    });
  };

  const getDaySchedule = (dayOfWeek: number) => {
    return daySchedules.find(d => d.dayOfWeek === dayOfWeek) || {
      dayOfWeek,
      enabled: false,
      timeSlots: []
    };
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-auto max-w-4xl max-h-[80vh] flex flex-col bg-white text-gray-900 border-gray-200 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Schedule Discount Availability</DialogTitle>
            <div className="mt-4">
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                Discount Validity Period
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                          {format(dateRange.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-1">
            {days.map(day => {
              const daySchedule = getDaySchedule(day.value);
              return (
                <div key={day.value} className="flex items-start space-x-3 py-3 min-w-0">
                  <div className="w-32 flex items-center space-x-2">
                    <Switch
                      checked={daySchedule.enabled}
                      onCheckedChange={() => toggleDay(day.value)}
                      className="flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {day.label}
                    </span>
                  </div>
                  
                  {daySchedule.enabled && (
                    <div className="flex-1 min-w-0 space-y-2 pr-4">
                      {daySchedule.timeSlots.map((slot, index) => (
                        <div key={slot.id} className="flex items-center space-x-2 min-w-0">
                          <input
                            type="time"
                            value={slot.startTime}
                            onChange={(e) => updateTimeSlot(day.value, slot.id, { startTime: e.target.value })}
                            className="px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm w-24 flex-shrink-0 [&::-webkit-calendar-picker-indicator]:hidden"
                          />
                          <span className="text-gray-500 flex-shrink-0">-</span>
                          <input
                            type="time"
                            value={slot.endTime}
                            onChange={(e) => updateTimeSlot(day.value, slot.id, { endTime: e.target.value })}
                            className="px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm w-24 flex-shrink-0 [&::-webkit-calendar-picker-indicator]:hidden"
                          />
                          <div className="flex space-x-1 flex-shrink-0">
                            {index === 0 ? (
                              <>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => addTimeSlot(day.value)}
                                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCopySource({ day: day.label, timeSlots: daySchedule.timeSlots });
                                    setCopyModalOpen(true);
                                  }}
                                  className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(day.value, slot.id)}
                                className="p-1 text-gray-600 hover:text-red-600 hover:bg-gray-100 h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <DialogFooter className="flex-shrink-0 border-t border-gray-200 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#D8550D] hover:bg-[#A8420A] text-white">
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {copySource && (
        <CopyModal
          open={copyModalOpen}
          onOpenChange={setCopyModalOpen}
          sourceDay={copySource.day}
          timeSlots={copySource.timeSlots}
          onCopy={(targetDays) => {
            const sourceDayValue = days.find(d => d.label === copySource.day)?.value;
            if (sourceDayValue !== undefined) {
              copyTimesToDays(sourceDayValue, targetDays);
            }
          }}
        />
      )}
    </>
  );
}
