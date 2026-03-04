// src/routes/contact.routes.ts
import { Router }                              from 'express'
import { body }                                from 'express-validator'
import rateLimit                               from 'express-rate-limit'
import { sendContact, checkConfig, getMessages } from '../controllers/contact.controller'

const router = Router()

const contactLimit = rateLimit({
  windowMs: 60 * 1000, max: 5,
  message: { error: 'Too many messages. Please wait a minute.' },
})

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required.').isEmail().normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 2, max: 2000 }),
]

router.get('/check',    checkConfig)   // debug: check env + db status
router.get('/messages', getMessages)   // view saved messages from MongoDB
router.post('/', contactLimit, validate, sendContact)

export default router