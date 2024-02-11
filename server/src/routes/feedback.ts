import express, { Response } from "express";
import { Data, Error } from "../main";

const router = express.Router()

interface Feedback {
	id: number;
	status: string;
	title: string;
	description: string;
	category: string;
	upvotes: number;
	commentCount: number;
}

export interface Comment {
	id: number;
	content: string;
	user: {
		image: string;
		name: string;
		username: string;
	};
}

interface DetailedFeedback extends Omit<Feedback, 'commentCount'> {
	comments: Comment[]
}

router.get('/info', (req, res) => {
	const data = req.app.locals.data as Data[];

	const statusCount = data.reduce((acc, { status }) => {
		if (acc[status]) acc[status] += 1;
		else acc[status] = 1;

		return acc;
	}, {} as any);

	res.json(statusCount)
})

// Get all Feedback
router.get('/', (req, res: Response<Array<Feedback>>) => {
	const data = req.app.locals.data as Data[];
	const { status: feedbackStatus } = req.query

	const result = data.map(({ id, status, title, description, category, upvotes, comments }) => ({
		id,
		status,
		title,
		description,
		category,
		upvotes,
		commentCount: comments?.length ?? 0,
	})).filter(({ status }) => feedbackStatus === undefined ? true : feedbackStatus === status)

	res.json(result)
})

// Get a Feedback
router.get('/:id', (req, res: Response<DetailedFeedback | Error>) => {
	const data = req.app.locals.data as Data[];
	const feedbackId = parseInt(req.params.id)

	const result = data.find(({ id }) => id === feedbackId)
	if (result === undefined) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	res.json({
		id: feedbackId,
		status: result?.status,
		title: result?.title,
		description: result?.description,
		category: result?.category,
		upvotes: result?.upvotes,
		comments: result.comments
	})
})

// Add a Feedback
router.post('/', (req, res: Response<Feedback>) => {
	const data = req.app.locals.data as Data[];
	const { title, description, category } = req.body

	const feedback: Omit<Feedback, 'commentCount'> = {
		id: data.length + 1,
		title,
		description,
		category,
		status: 'suggestion',
		upvotes: 0,
	}

	data.push({
		...feedback,
		comments: []
	})

	res.status(201).json({ ...feedback, commentCount: 0 })
})

// Update a Feedback
router.put('/:id', (req, res: Response<Feedback | Error>) => {
	const data = req.app.locals.data as Data[];

	const { id: feedbackId } = req.params
	const { title, description, status, category } = req.body as Omit<Feedback, 'id' | 'upvotes' | 'commentCount'>

	const result = data.find(({ id }) => feedbackId === `${id}`)
	if (result === undefined) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	// Find the feedback
	// Update the feedback
	// Return the updated Feedback
})

// Delete a Feedback
router.delete('/:id', (req, res: Response<{ message: string } | Error>) => {
	const data = req.app.locals.data as Data[];
	const { id: feedbackId } = req.params

	const result = data.find(({ id }) => feedbackId === `${id}`)
	if (result === undefined) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	data.splice(0, data.length, ...data.filter(({ id }) => feedbackId !== `${id}`))

	res.status(410).json({ message: 'Successfully Deleted' })
})

export default router