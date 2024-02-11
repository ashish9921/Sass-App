"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get all comments of a feedback
router.get('/:feedbackId', (req, res) => {
    const data = req.app.locals.data;
    const { feedbackId } = req.params;
    const feedbackIndex = data.findIndex(({ id }) => feedbackId === `${id}`);
    if (feedbackIndex === -1) {
        res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` });
        return;
    }
    res.json(data[feedbackIndex].comments);
});
// Add a comment to a feedback
router.post("/:feedbackId", (req, res) => {
    const data = req.app.locals.data;
    const { feedbackId } = req.params;
    const { content, user } = req.body;
    const feedbackIndex = data.findIndex(({ id }) => feedbackId === `${id}`);
    if (feedbackIndex === -1) {
        res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` });
        return;
    }
    res.status(201).json(data[feedbackIndex].comments);
});
// Reply to a comment
exports.default = router;
