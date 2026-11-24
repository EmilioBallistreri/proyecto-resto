import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/auth/admin-login
router.post('/admin-login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Correo electrónico y contraseña requeridos.'
    });
  }

  // Demo authorization check
  const validAdmin = 
    (email === 'admin@restaurante.com' && password === 'admin123') ||
    (email.length >= 4 && password.length >= 4);

  if (!validAdmin) {
    return res.status(401).json({
      success: false,
      error: 'Credenciales de acceso no válidas.'
    });
  }

  return res.json({
    success: true,
    user: {
      role: 'ADMINISTRATOR',
      email: email,
      name: 'Gerencia de Operaciones',
      permissions: ['ALL']
    },
    token: 'jwt-demo-token-' + Date.now()
  });
});

export default router;

