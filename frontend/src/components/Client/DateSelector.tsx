import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const AVAILABLE_TIMES = [
  '13:00',
  '13:30',
  '14:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
];

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(10); // Noviembre (0-indexed: 10)
  const [viewYear, setViewYear] = useState(2026);

  // Parse current selected date
  const [selYear, selMonth, selDay] = selectedDate.split('-').map(Number);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

  // Days in selected month
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // First day of month (0 = Sun, 1 = Mon...)
  const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(viewMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const newDate = `${viewYear}-${formattedMonth}-${formattedDay}`;
    onSelectDate(newDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md space-y-3 relative">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* SECCIÓN FECHA (MANUAL + BOTÓN CALENDARIO) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-amber-400" />
            <span>Fecha:</span>
          </span>

          {/* Opción 1: Entrada manual directa */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white font-semibold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            title="Escribir fecha manualmente"
          />

          {/* Opción 2: Botón para abrir el Calendario Visual interactivo */}
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Calendario Completo</span>
          </button>

          {/* Etiqueta si es hoy */}
          {selectedDate === '2026-11-13' && (
            <span className="text-[11px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-lg font-bold">
              Hoy (Viernes 13)
            </span>
          )}
        </div>

        {/* SECCIÓN HORARIOS (SE ACTUALIZA EL PLANO EN VIVO) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <Clock className="w-4 h-4 text-amber-400 shrink-0 mr-1" />
          <span className="text-xs font-bold text-slate-300 shrink-0 mr-1">Hora:</span>
          {AVAILABLE_TIMES.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
                title={`Ver mesas para las ${time} hs`}
              >
                {time} hs
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL / POPOVER DEL CALENDARIO VISUAL INTERACTIVO */}
      {isCalendarOpen && (
        <div className="absolute top-full left-4 z-50 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-fade-in">
          {/* Cabecera del mes y controles */}
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-xs font-bold text-white">
              {monthNames[viewMonth]} {viewYear}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleNextMonth}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1.5">
            {daysOfWeek.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Cuadrícula de días */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Espacios vacíos antes del primer día */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="p-1.5" />
            ))}

            {/* Días del mes */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = viewYear === 2026 && viewMonth === 10 && day === 13;
              const isSelected =
                viewYear === selYear && viewMonth === selMonth - 1 && day === selDay;

              return (
                <button
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : isToday
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Accesos rápidos */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between gap-1 text-[11px]">
            <button
              onClick={() => {
                onSelectDate('2026-11-13');
                setIsCalendarOpen(false);
              }}
              className="text-amber-400 hover:underline font-semibold"
            >
              Hoy (13 Nov)
            </button>
            <button
              onClick={() => {
                onSelectDate('2026-11-14');
                setIsCalendarOpen(false);
              }}
              className="text-slate-300 hover:underline"
            >
              Mañana (14 Nov)
            </button>
            <button
              onClick={() => {
                onSelectDate('2026-11-15');
                setIsCalendarOpen(false);
              }}
              className="text-slate-300 hover:underline"
            >
              Domingo (15 Nov)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

