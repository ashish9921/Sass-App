import express, { Response } from "express";
import { Data, Error } from "../main";

const router = express.Router()

interface Comment {
	id: number;
	content: string;
	user: {
		image: string;
		name: string;
		username: string;
	};
}

// Get all comments of a feedback
router.get('/:feedbackId', (req, res: Response<Comment[] | Error>) => {
	const data = req.app.locals.data as Data[];

	const { feedbackId } = req.params

	const feedbackIndex = data.findIndex(({ id }) => feedbackId === `${id}`)
	if (feedbackIndex === -1) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	res.json(data[feedbackIndex].comments)
})

// Add a comment to a feedback
router.post("/:feedbackId", (req, res: Response<Comment[] | Error>) => {
	const data = req.app.locals.data as Data[];

	const { feedbackId } = req.params
	const { content, user } = req.body as Omit<Comment, 'id'>

	const feedbackIndex = data.findIndex(({ id }) => feedbackId === `${id}`)
	if (feedbackIndex === -1) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	res.status(201).json(data[feedbackIndex].comments as Comment[])
})

// Reply to a comment

export default router
