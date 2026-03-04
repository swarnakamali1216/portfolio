import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.warn('[DB] MONGO_URI not set — skipping DB connection')
    return
  }
  try {
    await mongoose.connect(uri, { dbName: 'portfolio' })
    console.log('[DB] ✅ MongoDB connected')
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[DB] ❌ Connection failed:', msg)
    console.warn('[DB] Continuing without database...')
  }
}
