import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  name:      string
  email:     string
  message:   string
  ip?:       string
  read:      boolean
  createdAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    ip:      { type: String },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Contact = mongoose.model<IContact>('Contact', ContactSchema)