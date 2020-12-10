const express = require('express')

const app = express()
const pool = require('./db')
const port = 3001

app.use(express.json())


app.get('/todos', async (req, res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/todo/:id', async (req,res)=>{
    const {id} = req.params
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(console.error)
    }
})

app.post('/todos', async (req,res)=>{
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description])

        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }

})

// app.put('/',(req,res)=>{
    
// })

// app.delete('/',(req,res)=>{
    
// })


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})