import { Schema } from 'mongoose'
import db from '../config/db'
import { Document } from './document'

export interface LinkInterface extends Document {
  name: string
  shortId: string
  url: string
  timestamps: number[]
}

const linkSchema = new Schema<LinkInterface>({
  name: String,
  shortId: String,
  url: String,
  timestamps: [Number]
})

export const LinkModel = db.model<LinkInterface>('Link', linkSchema)
