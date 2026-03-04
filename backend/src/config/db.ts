// src/config/db.ts
// MongoDB Atlas connection using Mongoose

import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

export async function connectDB(): Promise<void> {
  if (!MONGO_URI) {
    console.warn('[DB] ⚠️  MONGO_URI not set — skipping DB connection')
    return
  }

  if (mongoose.connection.readyState === 1) {
    console.log('[DB] ✅ Already connected')
    return
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'portfolio',
    })
    console.log('[DB] ✅ MongoDB Atlas connected →', mongoose.connection.host)
  } catch (err) {
    console.error('[DB] ❌ Connection failed:', err)
    // Don't crash the server — email still works without DB
  }
}