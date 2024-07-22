import {Router} from 'express'
import {add_learners} from '../controllers/learners.controllers.js'

const router =Router()

router.route('/learner').post(add_learners)

export default router