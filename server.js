const express = require('express')
const app = express()
const cors = require('cors');
const dotenv = require('dotenv')
const { Pool } = require('pg')
const client = require('./db')
const morgan = require('morgan')
const PORT = process.env.PORT || 3002

dotenv.config();

app.use(cors())
app.use(morgan("tiny"))
app.use(express.static("public"))
app.use(express.json())


app.route('/todo')
    .get(async (req, res)  => {
        try {
            const result = await client.query('SELECT * FROM todos')
            res.json(result.rows)
        } catch (err) {
            res.status(500).json({ error: err, msg: "what is this error"})
        }
    })

    .post(async (req, res) => {
        try {
                const { name } = req.body;
                const insert = await client.query('INSERT INTO todos (name) VALUES ($1);', [name])
                const data = await client.query('SELECT * FROM todos')
                res.json({ validation: true, data: data.rows}).status(201)
        } catch (err) {
            res.status(500).json({ error: err})
        }
    })

app.route('/todo/:id')
    .get(async (req, res) => {
        try {
                const id = req.params.id
                const results = await client.query('SELECT * FROM todos WHERE id =$1;', [id])
                res.json(results.rows[0])
        } catch (err) {
            res.status(500).json({error: err})
        }
    })
    .put(async (req, res) => {
        try {
                const { name, description, completed } = req.body
                const { id } = req.params
                await client.query('UPDATE todos SET name = $1 WHERE id = $2', [name, id])
                // res.json({ message: `Updated id: ${id} Todo name: ${name}`}).status(204)
                //const data = await client.query('SELECT * FROM todos')
                res.json({ validation: true, data: data.rows}).status(204)
        } catch (err) {
            res.status(500).json({err})
        }
    })
    .delete(async (req, res) => {
        try {
            const {id} = req.params
            await client.query('DELETE FROM todos WHERE id = $1', [id])
            res.json({message: `Deleted ID: ${id}`}).status(204)
            const data = await client.query('SELECT * FROM todos')
            //res.json({ data: data.rows}).status(204)
        } catch (err) {
            res.status(500).json({err})
        }
    })
    .patch(async (req, res) => {
        try {
            let {id} =req.params
            let {body} = req
            const data = await client.query(`UPDATE todos SET name ='${body.name}' WHERE id = ${id}`)
            //res.status(204).send('Working')
            const datas = await client.query('SELECT * FROM todos')
            res.json({ validation: true, data: datas.rows}).status(201)

        } catch (err) {
            res.status(500).json({err})
        }
    })
        

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

