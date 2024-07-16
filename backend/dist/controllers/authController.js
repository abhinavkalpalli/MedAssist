"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class authController {
    patientAuth(req, res, next) {
        try {
            const user = req.user;
            res.status(200).json({
                status: 200, message: 'User is authenticated', valid: true, user
            });
        }
        catch (err) {
            res
                .status(200)
                .json({
                status: 500,
                message: "Somethings is wrong",
                error_code: "INTERNAL_SERVER_ERROR",
            });
        }
    }
    adminAuth(req, res, next) {
        try {
            const user = req.user;
            res.status(200).json({
                status: 200, message: 'User is authenticated', valid: true, user
            });
        }
        catch (err) {
            res
                .status(200)
                .json({
                status: 500,
                message: "Somethings is wrong",
                error_code: "INTERNAL_SERVER_ERROR",
            });
        }
    }
    doctorAuth(req, res, next) {
        try {
            const user = req.user;
            res.status(200).json({
                status: 200, message: 'User is authenticated', valid: true, user
            });
        }
        catch (err) {
            res
                .status(200)
                .json({
                status: 500,
                message: "Somethings is wrong",
                error_code: "INTERNAL_SERVER_ERROR",
            });
        }
    }
}
exports.default = authController;
