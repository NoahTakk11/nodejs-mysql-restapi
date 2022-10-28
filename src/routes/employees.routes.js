import { Router } from "express";
import { deleteEmployees, getEmployees, createEmployees, updatePatchEmployees, getEmployee, updateEmployees } from '../controllers/employees.controller.js';
const router = Router();

router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployee);
router.post('/employees', createEmployees);
router.put('/employees/:id', updateEmployees);
router.patch('/employees/:id', updatePatchEmployees);
router.delete('/employees/:id', deleteEmployees);

export default router;
