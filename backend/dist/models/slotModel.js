"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    doctorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    shifts: [
        {
            type: String,
            enum: ['9am-10am', '11am-12pm', '2pm-3pm', '5pm-6pm', '8pm-9pm'],
            required: true,
        },
    ],
});
const Slots = (0, mongoose_1.model)('Slot', slotSchema);
exports.default = Slots;
