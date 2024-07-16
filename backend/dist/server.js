"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = require("path");
const patientRoutes_1 = require("./routes/patientRoutes");
const doctorRoutes_1 = require("./routes/doctorRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
const authRouter_1 = require("./routes/authRouter");
dotenv_1.default.config({ path: (0, path_1.join)('./src', '.env') });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const dbUrl = process.env.DB_URL || " ";
const port = parseInt(process.env.PORT || "3200");
app.use('/api/patient', patientRoutes_1.patientRoutes);
app.use('/api/doctor', doctorRoutes_1.doctorRoutes);
app.use('/api/admin', adminRoutes_1.adminRoutes);
app.use('/api/auth', authRouter_1.authRoutes);
mongoose_1.default.connect(dbUrl)
    .then(() => {
    console.log('Database connected..');
})
    .catch((err) => {
    console.error('Database connection error:', err);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
