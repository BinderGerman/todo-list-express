const express = require('express')
const app = express()
const port = 3000

let tasks = [
    { id: 1, title: "Aprender Express", completed: false},
    { id: 2, title: "Hacer ejercicios prácticos", completed: true}
]

// Middleware para procesar JSON
app.use(express.json())

// Ruta de prueba
app.get('/api/v1', (req, res) => {
    res.json({ message: 'API funcionando', version: '1.0.0' })
})

// Ruta para consultar todas las tareas (GET)
app.get('/api/v1/tasks', (req, res) => {
    res.status(200).json(tasks)
})

// Ruta para consultar por ID (GET)
app.get('/api/v1/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id))

    if (!task) return res.status(404).json({ error: "tarea no encontrada"});
    res.json(task)
})

// Crear nueva tarea (POST)
app.post('/api/v1/tasks', (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: "El campo title es requerido" })
    }

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title, 
        completed: false
    }

    tasks.push(newTask)
    res.status(201).json(newTask)
})

// Actualizar tarea (PUT)
app.put('/api/v1/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id))
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' })
    
    task.title = req.body.title || task.title; 
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed

    res.json(task)
})


// Eliminar tarea (DELETE)
app.delete('/api/v1/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id))
    if (taskIndex === -1) return res.status(404).json({ error: "Tarea no encontrada" })

    const deletedTask = tasks.splice(taskIndex, 1)
    res.json(deletedTask[0])
})



app.listen(port, () => {
    console.log(`>>> Servidor escuchando en http://localhost:${port}`);
    
})