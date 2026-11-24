import { Router, Request, Response } from 'express';
import { restaurantStore } from '../store/restaurantStore.js';
import { broadcastStateChange } from '../sockets/socketHandler.js';

const router = Router();

// GET /api/metrics?range=today|2days|7days|10days|30days
router.get('/', (req: Request, res: Response) => {
  const range = (req.query.range as any) || 'today';
  res.json({
    success: true,
    data: restaurantStore.getMetricsByPeriod(range)
  });
});

// GET /api/metrics/notifications
router.get('/notifications', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: restaurantStore.getNotifications()
  });
});

// PATCH /api/metrics/notifications/read-all
router.patch('/notifications/read-all', (_req: Request, res: Response) => {
  restaurantStore.markAllNotificationsAsRead();
  broadcastStateChange('notifications:read_all', {});
  res.json({ success: true });
});

// POST /api/metrics/reset-demo
router.post('/reset-demo', (_req: Request, res: Response) => {
  restaurantStore.resetToDefaults();
  broadcastStateChange('demo:reset', {});
  res.json({
    success: true,
    message: 'Estado del restaurante restablecido a valores iniciales de demo.'
  });
});

export default router;
