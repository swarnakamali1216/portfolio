// src/routes/index.ts
import { Router } from 'express'
import contactRouter from './contact.routes'

const router = Router()

router.use('/contact', contactRouter)

// Future routes:
// router.use('/projects', projectRouter)
// router.use('/skills',   skillRouter)

import visitorRoutes from './visitor.routes'
router.use('/visitors', visitorRoutes)
export default router
