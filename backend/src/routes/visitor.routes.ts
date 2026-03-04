import { Router, Request, Response } from 'express'
import { Visitor } from '../models/Visitor'

const router = Router()

// POST /api/visitors — log a visit
router.post('/', async (req: Request, res: Response) => {
  try {
    const ua = req.headers['user-agent'] ?? ''
    const device = /mobile|android|iphone|ipad/i.test(ua) ? 'mobile' : 'desktop'
    const browser =
      /chrome/i.test(ua)  ? 'Chrome'  :
      /firefox/i.test(ua) ? 'Firefox' :
      /safari/i.test(ua)  ? 'Safari'  :
      /edge/i.test(ua)    ? 'Edge'    : 'Other'

    await Visitor.create({
      page:     req.body.page     ?? 'home',
      referrer: req.body.referrer ?? req.headers['referer'] ?? '',
      ip:       req.headers['x-forwarded-for']?.toString() ?? req.ip,
      device,
      browser,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Could not log visit' })
  }
})

// GET /api/visitors/stats — get visitor statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const total   = await Visitor.countDocuments()
    const today   = await Visitor.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) }
    })
    const week    = await Visitor.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    const mobile  = await Visitor.countDocuments({ device: 'mobile' })
    const desktop = await Visitor.countDocuments({ device: 'desktop' })

    const byPage = await Visitor.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort:  { count: -1 } }
    ])

    const byBrowser = await Visitor.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort:  { count: -1 } }
    ])

    const recent = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(10)

    res.json({ total, today, week, mobile, desktop, byPage, byBrowser, recent })
  } catch (err) {
    res.status(500).json({ error: 'Database not connected' })
  }
})

export default router
