"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/info', (req, res) => {
    const data = req.app.locals.data;
    const statusCount = data.reduce((acc, { status }) => {
        if (acc[status])
            acc[status] += 1;
        else
            acc[status] = 1;
        return acc;
    }, {});
    res.json(statusCount);
});
// Get all Feedback
router.get('/', (req, res) => {
    const data = req.app.locals.data;
    const { status: feedbackStatus } = req.query;
    const result = data.map(({ id, status, title, description, category, upvotes, comments }) => {
        var _a;
        return ({
            id,
            status,
            title,
            description,
            category,
            upvotes,
            commentCount: (_a = comments === null || comments === void 0 ? void 0 : comments.length) !== null && _a !== void 0 ? _a : 0,
        });
    }).filter(({ status }) => feedbackStatus === undefined ? true : feedbackStatus === status);
    res.json(result);
});
// Get a Feedback
router.get('/:id', (req, res) => {
    const data = req.app.locals.data;
    const feedbackId = parseInt(req.params.id);
    const result = data.find(({ id }) => id === feedbackId);
    if (result === undefined) {
        res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` });
        return;
    }
    res.json({
        id: feedbackId,
        status: result === null || result === void 0 ? void 0 : result.status,
        title: result === null || result === void 0 ? void 0 : result.title,
        description: result === null || result === void 0 ? void 0 : result.description,
        category: result === null || result === void 0 ? void 0 : result.category,
        upvotes: result === null || result === void 0 ? void 0 : result.upvotes,
        comments: result.comments
    });
});
// Add a Feedback
router.post('/', (req, res) => {
    const data = req.app.locals.data;
    const { title, description, category } = req.body;
    const feedback = {
        id: data.length + 1,
        title,
        description,
        category,
        status: 'suggestion',
        upvotes: 0,
    };
    data.push(Object.assign(Object.assign({}, feedback), { comments: [] }));
    res.status(201).json(Object.assign(Object.assign({}, feedback), { commentCount: 0 }));
});
// Update a Feedback
router.put('/:id', (req, res) => {
    const data = req.app.locals.data;
    const { id: feedbackId } = req.params;
    const { title, description, status, category } = req.body;
    const result = data.find(({ id }) => feedbackId === `${id}`);
    if (result === undefined) {
        res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` });
        return;
    }
    // Find the feedback
    // Update the feedback
    // Return the updated Feedback
});
// Delete a Feedback
router.delete('/:id', (req, res) => {
    const data = req.app.locals.data;
    const { id: feedbackId } = req.params;
    const result = data.find(({ id }) => feedbackId === `${id}`);
    if (result === undefined) {
        res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` });
        return;
    }
    data.splice(0, data.length, ...data.filter(({ id }) => feedbackId !== `${id}`));
    res.status(410).json({ message: 'Successfully Deleted' });
});
exports.default = router;
