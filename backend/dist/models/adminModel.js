"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_Verified: { type: Boolean, default: false }
});
exports.default = (0, mongoose_1.model)('Admins', adminSchema);
