import { Schema, model } from "mongoose";

const auditLogSchema = new Schema(
    {
        actorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        actorEmail: String,
        action: { type: String, required: true },
        entityType: { type: String, required: true },
        entityId: String,
        meta: { type: Schema.Types.Mixed, default: {} },
        ip: String,
        userAgent: String,
    },
    { timestamps: true }
);

export default model("AuditLog", auditLogSchema);
