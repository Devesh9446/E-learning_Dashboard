import {Router} from 'express'

import {add_learners} from '../controllers/learners.controllers.js'
import {get_learners} from '../controllers/learners.controllers.js'
import {delete_learners} from '../controllers/learners.controllers.js'

import {get_course} from '../controllers/learners.controllers.js'

import {add_income} from "../controllers/income.controller.js"
import {get_income} from "../controllers/income.controller.js"

const router =Router()

router.route('/learner').post(add_learners)
router.route('/learner').get(get_learners)
router.route('/learner').delete(delete_learners)

router.route('/income').post(add_income)
router.route('/income').get(get_income)

router.route('/course').get(get_course)

export default router