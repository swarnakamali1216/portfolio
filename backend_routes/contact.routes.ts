import { Router }                              from 'express'
import { body }                                from 'express-validator'
import rateLimit                               from 'express-rate-limit'
import { sendContact, checkConfig, getMessages } from '../controllers/contact.controller'

const router = Router()

const limit = rateLimit({ windowMs: 60000, max: 5, message: { error: 'Too many requests. Wait a minute.' } })

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').trim().isEmail().withMessage('Valid email required.').normalizeEmail(),
  body('message').trim().isLength({ min: 2, max: 2000 }).withMessage('Message must be 2-2000 characters.'),
]

router.get('/check',    checkConfig)
router.get('/messages', getMessages)
router.post('/',        limit, validate, sendContact)

export default router
