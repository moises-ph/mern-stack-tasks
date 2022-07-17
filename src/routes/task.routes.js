const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res)=>{

    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res)=>{
    const tarea = await Task.findById(req.params.id);
    res.json(tarea);
})

router.post('/', async (req, res)=>{
    const { tittle, description } = req.body;
    const task = new Task({ tittle, description });
    await task.save();
    console.log(task);
    res.json({status: 'Task saved'});
})

router.put('/:id', async (req, res)=>{
    const { tittle, description } = req.body;
    const newTask = { tittle, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    console.log(req.params.id);
    res.json({status: 'Task updated'});
})

router.delete('/:id', async (req, res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task deleted'});
})

module.exports = router;