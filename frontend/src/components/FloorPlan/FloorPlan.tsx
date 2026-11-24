import React from 'react';
import { Table } from '../../types';
import { TableElement } from './TableElement';
import { InteriorZone } from './InteriorZone';
import { PatioZone } from './PatioZone';
import { FloorLegend } from './FloorLegend';

interface FloorPlanProps {
  tables: Table[];
  selectedTable: Table | null;
  onSelectTable: (table: Table) => void;
  isAdmin?: boolean;
}

export const FloorPlan: React.FC<FloorPlanProps> = ({
  tables,
  selectedTable,
  onSelectTable,
  isAdmin = false,
}) => {
  const availableCount = tables.filter((t) => t.status === 'available').length;
  const reservedCount = tables.filter((t) => t.status === 'reserved').length;
  const occupiedCount = tables.filter((t) => t.status === 'occupied' || t.status === 'billing').length;

  return (
    <div className="w-full flex flex-col">
      {/* Leyenda simple */}
      <FloorLegend
        availableCount={availableCount}
        reservedCount={reservedCount}
        occupiedCount={occupiedCount}
        isAdmin={isAdmin}
      />

      {/* Plano 2D Grande y Visual */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#070b14] shadow-xl">
        <div className="overflow-x-auto p-2 md:p-3">
          <div className="relative min-w-[800px] h-[550px] md:h-[580px] rounded-xl overflow-hidden bg-slate-950">
            {/* Fondo Salón Interior */}
            <div className="absolute inset-y-0 left-0 right-[38%] bg-[#0b101d] border-r border-slate-800" />

            {/* Fondo Patio Exterior */}
            <div className="absolute inset-y-0 right-0 left-[62%] bg-gradient-to-br from-[#121c15] to-[#0c140f]" />

            {/* Zonas y Referencias (Entrada, Baños, Caja, Patio) */}
            <InteriorZone />
            <PatioZone />

            {/* Mesas */}
            {tables.map((table) => (
              <TableElement
                key={table.id}
                table={table}
                isSelected={selectedTable?.id === table.id}
                onSelect={onSelectTable}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
