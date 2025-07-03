import mongoose, { Schema, Document } from 'mongoose';

interface Role {
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  website?: string;
}

export interface ExperienceDocument extends Document {
  organization: string;
  logo: string;
  website?: string;
  roles: Role[];
  tags?: string[];
}

const RoleSchema = new Schema<Role>({
  role: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  website: { type: String },
});

const ExperienceSchema = new Schema<ExperienceDocument>({
  organization: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  roles: { type: [RoleSchema], required: true },
  tags: { type: [String], default: [] },
});

export default mongoose.model<ExperienceDocument>('Experience', ExperienceSchema); 