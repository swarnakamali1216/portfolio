# 📧 Email Setup Guide — Swarna Portfolio Contact Form

Follow these steps **once** to make the contact form send real emails to your Gmail.

---

## How It Works

```
Visitor fills form
      ↓
Next.js API route (/api/contact)
      ↓
Nodemailer sends via Gmail SMTP
      ↓
  ┌───┴───┐
  ↓       ↓
You     Sender
(swarnakamali12@gmail.com)  (auto-reply)
```

---

## Step 1 — Enable 2-Factor Authentication on Gmail

1. Go to → https://myaccount.google.com/security
2. Click **"2-Step Verification"**
3. Follow the steps to turn it **ON**
4. (Required before you can create an App Password)

---

## Step 2 — Generate a Gmail App Password

1. Go to → https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. In **"Select app"** dropdown → choose **"Mail"**
4. In **"Select device"** → choose **"Other"** → type `"Portfolio"`
5. Click **Generate**
6. Copy the **16-character password** shown (e.g. `abcd efgh ijkl mnop`)
   ⚠️ **Remove the spaces** → use it as `abcdefghijklmnop`
7. Save it — Google won't show it again!

---

## Step 3 — Create Your .env.local File

In your `frontend/` folder, create a file called **`.env.local`**:

```bash
# Inside: frontend/.env.local

GMAIL_USER=swarnakamali12@gmail.com
GMAIL_PASS=abcdefghijklmnop
RECEIVER_EMAIL=swarnakamali12@gmail.com
```

Replace `abcdefghijklmnop` with your real App Password (no spaces).

---

## Step 4 — Install Dependencies & Run

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 → scroll to Contact → fill the form → click Send.

---

## Step 5 — Test It

1. Fill the contact form with **your own email** as the sender
2. Click **"Send Message →"**
3. Check **swarnakamali12@gmail.com** → you should receive a beautiful HTML email
4. Check the **sender's inbox** → they'll receive an auto-reply from you

---

## What Each Email Looks Like

### ✉ Email YOU receive (at swarnakamali12@gmail.com):
- Blue header with "New message from your portfolio ✉️"
- Sender name, email, timestamp (IST)
- Full message in a styled box
- **"Reply to [Name] →"** button that opens email compose directly

### 📬 Auto-reply sender receives:
- Your branded header (Swarna.T)
- Thanks message with 24–48 hour response time
- LinkedIn + direct email buttons
- Your quick facts (3 internships, CGPA 8.2, open to jobs + internships)

---

## Deploying to Vercel

When you deploy to Vercel, add the env variables in the dashboard:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `GMAIL_USER` = `swarnakamali12@gmail.com`
   - `GMAIL_PASS` = your 16-char app password
   - `RECEIVER_EMAIL` = `swarnakamali12@gmail.com`
3. Redeploy → contact form works live 🚀

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `Invalid login` error | Make sure 2FA is ON and you used App Password (not your Gmail password) |
| `Connection timeout` | Check firewall; try on a different network |
| Email goes to spam | Ask a friend to test; mark as "Not spam" once |
| `GMAIL_USER is undefined` | Make sure `.env.local` is in `frontend/` folder (not root) |
| Form shows error in UI | Open browser DevTools → Network tab → check `/api/contact` response |

---

## Security Notes

✅ App Password is safer than your real password  
✅ `.env.local` is in `.gitignore` — never pushed to GitHub  
✅ Rate limiting built-in (max 3 emails/minute per IP)  
✅ Input sanitisation removes HTML tags  
✅ Email length capped at 2000 characters  

---

*Setup takes about 5 minutes. Once done, every contact form submission goes straight to your Gmail!*
