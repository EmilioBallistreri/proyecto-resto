import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface TimeSlotSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const TIMES = ['13:00', '13:30', '14:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Selector de Fecha */}
      <div className="flex items-center gap-2.5">
        <Calendar className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-semibold text-slate-300">Fecha:</span>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onSelectDate(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-white font-medium text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
        />
        {selectedDate === '2026-11-13' && (
          <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-medium">
            Hoy Viernes 13
          </span>
        )}
      </div>

      {/* Selector de Horario */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        <Clock className="w-4 h-4 text-amber-400 shrink-0 mr-1" />
        <span className="text-xs font-semibold text-slate-300 shrink-0 mr-1">Hora:</span>
        {TIMES.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {time} hs
            </button>
          );
        })}
      </div>
    </div>
  );
};
