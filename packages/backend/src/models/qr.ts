import { Schema } from 'mongoose'
import db from '../config/db'
import { Document } from './document'

export interface QrInterface extends Document {
  name: string
}

const qrSchema = new Schema<QrInterface>({
  name: String
  // linkId: [Schema.Types.ObjectId],
})

export const QrModel = db.model<QrInterface>('Qr', qrSchema)
