import express from 'express';
import { StudentController } from './student.controller';


const router = express.Router();
router.post('/create-student',StudentController.createStudent);
router.get('/get-all-student',StudentController.findAllStudend);
router.get('/specific-Student/:studentId',StudentController.specificStudentFind);
router.delete('/isDeleted/:studentId',StudentController.isDeletedUpdateOne);

export const StudentRouter=router;