import mongoose, { Document, Schema } from 'mongoose'

export interface IVisitor extends Document {
  page:      string
  country?:  string
  city?:     string
  device:    string
  browser:   string
  referrer?: string
  ip?:       string
  createdAt: Date
}

const VisitorSchema = new Schema<IVisitor>(
  {
    page:     { type: String, default: 'home' },
    country:  { type: String },
    city:     { type: String },
    device:   { type: String, default: 'unknown' },
    browser:  { type: String, default: 'unknown' },
    referrer: { type: String },
    ip:       { type: String },
  },
  { timestamps: true }
)

export const Visitor = mongoose.model<IVisitor>('Visitor', VisitorSchema)
