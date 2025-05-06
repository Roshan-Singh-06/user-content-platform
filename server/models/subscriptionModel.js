import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    plan: {
        type: String,
        required: true,
        enum: ["BASIC", "STANDARD", "PREMIUM"]
    },
    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "INACTIVE", "CANCELLED", "EXPIRED"],
        default: "INACTIVE"
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    paymentId: {
        type: String
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING"
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
subscriptionSchema.index({ subscriber: 1, status: 1 });
subscriptionSchema.index({ endDate: 1 }, { expireAfterSeconds: 0 }); // For automatic expiry handling

export const Subscription = mongoose.model("Subscription", subscriptionSchema);