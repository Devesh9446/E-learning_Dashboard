import {Router} from 'express'

import {add_learners} from '../controllers/learners.controllers.js'
import {get_learners} from '../controllers/learners.controllers.js'
import {delete_learners} from '../controllers/learners.controllers.js'


import {get_income} from "../controllers/dashboard.controller.js"

const router =Router()

router.route('/learner').post(add_learners)
router.route('/learner').get(get_learners)
router.route('/learner').delete(delete_learners)
 
router.route('/income').get(get_income)

export default router