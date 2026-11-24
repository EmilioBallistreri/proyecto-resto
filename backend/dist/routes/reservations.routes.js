import { Router } from 'express';
import { restaurantStore } from '../store/restaurantStore.js';
import { broadcastStateChange } from '../sockets/socketHandler.js';
const router = Router();
// GET /api/reservations
router.get('/', (_req, res) => {
    res.json({
        success: true,
        data: restaurantStore.getReservations()
    });
});
// POST /api/reservations
router.post('/', (req, res) => {
    const { tableId, customer, date, time, partySize, notes } = req.body;
    if (!tableId || !customer || !customer.nombre || !customer.dni || !customer.telefono || !time) {
        return res.status(400).json({
            success: false,
            error: 'Todos los datos obligatorios del cliente y la mesa son requeridos.'
        });
    }
    const result = restaurantStore.createReservation({
        tableId,
        customer,
        date: date || '2026-11-13',
        time,
        partySize: Number(partySize) || 2,
        notes
    });
    if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
    }
    // Broadcast new reservation event to all connected clients & admin
    broadcastStateChange('reservation:new', {
        reservation: result.reservation,
        notification: result.notification
    });
    res.status(201).json({
        success: true,
        data: result.reservation
    });
});
// PATCH /api/reservations/:id/status
router.patch('/:id/status', (req, res) => {
    const id = String(req.params.id);
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ success: false, error: 'El estado de la reserva es requerido.' });
    }
    const updatedReservation = restaurantStore.updateReservationStatus(id, status);
    if (!updatedReservation) {
        return res.status(404).json({ success: false, error: 'Reserva no encontrada.' });
    }
    broadcastStateChange('reservation:status_changed', { reservation: updatedReservation });
    res.json({
        success: true,
        data: updatedReservation
    });
});
export default router;
