import { Router } from 'express';
import { restaurantStore } from '../store/restaurantStore.js';
import { broadcastStateChange } from '../sockets/socketHandler.js';
const router = Router();
// GET /api/metrics?range=today|2days|7days|10days|30days
router.get('/', (req, res) => {
    const range = req.query.range || 'today';
    res.json({
        success: true,
        data: restaurantStore.getMetricsByPeriod(range)
    });
});
// GET /api/metrics/notifications
router.get('/notifications', (_req, res) => {
    res.json({
        success: true,
        data: restaurantStore.getNotifications()
    });
});
// PATCH /api/metrics/notifications/read-all
router.patch('/notifications/read-all', (_req, res) => {
    restaurantStore.markAllNotificationsAsRead();
    broadcastStateChange('notifications:read_all', {});
    res.json({ success: true });
});
// POST /api/metrics/reset-demo
router.post('/reset-demo', (_req, res) => {
    restaurantStore.resetToDefaults();
    broadcastStateChange('demo:reset', {});
    res.json({
        success: true,
        message: 'Estado del restaurante restablecido a valores iniciales de demo.'
    });
});
export default router;
