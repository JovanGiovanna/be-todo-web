var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// eslint-disable-next-line
const bcrypt = require('bcrypt');
// eslint-disable-next-line
const { stringify } = require('jade/lib/utils');

//get all task
router.get('/get-all', async function (req, res) {
  const task = await prisma.task.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });
  res.json(task);
});

//create task
router.post('/create', async function (req, res) {
  const { title, desc, priority, deadline, is_done, created_by } = req.body;
  const task = await prisma.task.create({
    data: {
      title: title,
      desc: desc,
      priority: priority,
      deadline: deadline,
      is_done: is_done,
      created_by: created_by,
    },
  });
  res.send(task);
});

//edit task

router.put('/update/:id', async function (req, res) {
  const { id } = req.params;
  const { title, desc, priority, deadline, is_done, created_by } = req.body;
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      desc: desc,
      priority: priority,
      deadline: deadline,
      is_done: is_done,
      created_by: created_by,
    },
  });
  res.send(task);
});

//delete task
router.delete('/delete/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});

module.exports = router;
