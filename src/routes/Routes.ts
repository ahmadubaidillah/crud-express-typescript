import express from 'express';
import RoleController from '../controllers/RoleController';

const router = express.Router();

router.get('/role', RoleController.getRole)

// Create Role
router.post('/role', RoleController.createRole);

// Update Role
router.put('/role/:id', RoleController.updateRole);

// Delete Role
router.delete('/role/:id', RoleController.deleteRole);

export default router;