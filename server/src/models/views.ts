import mongoose, { Schema, Document } from 'mongoose';

export interface ViewDocument extends Document {
  count: number;
}

const ViewSchema = new Schema<ViewDocument>({
  count: { type: Number, default: 0 },
});

export default mongoose.model<ViewDocument>('View', ViewSchema);
