import mongoose, { Schema, Document } from 'mongoose';

export interface ProjectDocument extends Document {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  sourceUrl?: string;
  liveUrl?: string;
}

const ProjectSchema = new Schema<ProjectDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  sourceUrl: { type: String },
  liveUrl: { type: String },
});

export default mongoose.model<ProjectDocument>('Project', ProjectSchema); 