import { Router } from 'express';
import { restaurantStore } from '../store/restaurantStore.js';
import { broadcastStateChange } from '../sockets/socketHandler.js';
const router = Router();
// GET /api/tables?date=YYYY-MM-DD&time=HH:mm
router.get('/', (req, res) => {
    const date = req.query.date || '2026-11-13';
    const time = req.query.time || '21:00';
    res.json({
        success: true,
        data: restaurantStore.getTablesForSlot(date, time)
    });
});
// PATCH /api/tables/:id/status
router.patch('/:id/status', (req, res) => {
    const id = String(req.params.id);
    const { status, date, time } = req.body;
    if (!status) {
        return res.status(400).json({ success: false, error: 'El estado es requerido.' });
    }
    const targetDate = date || '2026-11-13';
    const targetTime = time || '21:00';
    restaurantStore.updateTableSlotStatus(id, targetDate, targetTime, status);
    const updatedTables = restaurantStore.getTablesForSlot(targetDate, targetTime);
    broadcastStateChange('table:slot_updated', {
        tableId: id,
        status,
        date: targetDate,
        time: targetTime,
        tables: updatedTables
    });
    res.json({
        success: true,
        data: updatedTables.find((t) => t.id === id)
    });
});
export default router;
