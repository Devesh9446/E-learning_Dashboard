import { Router } from 'express';

import { add_learners, get_learners, delete_learners, update_learner } from '../controllers/learners.controllers.js';
import { add_teacher, get_teachers, delete_teachers, update_teacher } from '../controllers/teachers.controller.js';
import { get_income } from "../controllers/dashboard.controller.js";

const router = Router();

// Learner routes
router.route('/learner')
    .post(add_learners)
    .get(get_learners)
    .delete(delete_learners);

router.route('/learner/:id').put(update_learner);

// Teacher routes
router.route('/teacher')
    .post(add_teacher)
    .get(get_teachers)
    .delete(delete_teachers);

router.route('/teacher/:id').put(update_teacher);

// Dashboard route
router.route('/income').get(get_income);

export default router;