import 'dotenv/config'
import app           from './app'
import { connectDB } from './config/db'

const PORT = process.env.PORT ?? 5000

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log('\n🚀 Backend → http://localhost:' + PORT)
    console.log('📧 Contact → POST /api/contact')
    console.log('🔍 Check   → GET  /api/contact/check\n')
  })
}

start()
