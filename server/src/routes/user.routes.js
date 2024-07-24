import {Router} from 'express'

import {add_learners} from '../controllers/learners.controllers.js'
import {get_learners} from '../controllers/learners.controllers.js'
import {delete_learners} from '../controllers/learners.controllers.js'
import { update_learner } from '../controllers/learners.controllers.js'

import {get_income} from "../controllers/dashboard.controller.js"
import {dashboard_details} from "../controllers/dashboard.controller.js"

const router =Router()

router.route('/learner').post(add_learners)
router.route('/learner').get(get_learners)
router.route('/learner').delete(delete_learners)
router.route('/learner/:id').put(update_learner);

router.route('/income').get(get_income)
router.route('/dashboard').get(dashboard_details)

export default router