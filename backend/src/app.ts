// src/app.ts
import express       from 'express'
import cors          from 'cors'
import helmet        from 'helmet'
import morgan        from 'morgan'
import rateLimit     from 'express-rate-limit'
import router        from './routes/index'

const app = express()

// ── Security headers ──────────────────────────────────────
app.use(helmet())

// ── CORS — allow Next.js frontend ────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL ?? 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
]

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error(`CORS blocked: ${origin}`))
  },
  methods:     ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}))

// ── Body parser ───────────────────────────────────────────
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Logging ───────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

// ── Global rate limit (100 req / 15 min per IP) ───────────
app.use(rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
  message:         { error: 'Too many requests. Try again later.' },
}))

// ── Routes ────────────────────────────────────────────────
app.use('/api', router)

// ── Health check ──────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }))

// ── 404 handler ───────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// ── Global error handler ──────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server Error]', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
