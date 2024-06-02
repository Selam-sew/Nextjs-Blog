import mongoose, { Schema } from "mongoose";
import {z} from 'zod'

const BlogSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        owner: { type: String, required: true }
    },
    {
        timestamps: true
    }
);


export const blogValidation =z.object({
    title:z.string().min(3),
    description:z.string().min(5),
    owner:z.string().min(2)
})

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
