const express = require("express")

const app = express()
const pool = require("./db")
const port = 3001

app.use(express.json())

app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo")
		res.json(allTodos.rows)
	} catch (error) {
		console.error(error.message)
	}
})

app.get("/todo/:id", async (req, res) => {
	const { id } = req.params
	try {
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
		res.json(todo.rows[0])
	} catch (error) {
		console.error(console.error)
	}
})

app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body
		const newTodo = await pool.query(
			"INSERT INTO todo (description) VALUES ($1) RETURNING *",
			[description]
		)

		res.json(newTodo.rows[0])
	} catch (error) {
		console.error(error.message)
	}
})

app.put("/todo/:id", async (req, res) => {
	try {
		const { id } = req.params

		const { description } = req.body

		const updateTodo = await pool.query(
			"UPDATE todo SET description =$1 WHERE todo_id = $2",
			[description, id]
		)
		res.json(`Todo was updated`)
	} catch (error) {
		console.error(error)
	}
})

app.delete("/todo/:id", async (req, res) => {
	try {
		const { id } = req.params
		const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
			id,
		])
		res.json(`Todo was deleted as requested`)
	} catch (error) {
		console.error(error)
	}
})

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})
