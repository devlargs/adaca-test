import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  country: string;
}

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
