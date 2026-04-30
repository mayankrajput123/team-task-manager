const router = require("express").Router();

const Task =
 require("../models/Task");

const auth =
 require("../middleware/authMiddleware");


// Create Task

router.post("/",
auth,
async (req, res) => {

  const task =
   new Task(req.body);

  await task.save();

  res.json(task);

});


// Get Tasks

router.get("/",
auth,
async (req, res) => {

  const tasks =
   await Task.find();

  res.json(tasks);

});


// Update Status

router.put("/:id",
auth,
async (req, res) => {

  const task =
   await Task.findByIdAndUpdate(

    req.params.id,

    { status: req.body.status },

    { new: true }

   );

  res.json(task);

});

module.exports = router;