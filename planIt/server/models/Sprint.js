import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const SprintSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 20 },
        projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
        creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

SprintSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})