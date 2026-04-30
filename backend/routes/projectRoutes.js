const router = require("express").Router();

const Project =
 require("../models/Project");

const auth =
 require("../middleware/authMiddleware");


// Create Project

router.post("/",
auth,
async (req, res) => {

  const project =
   new Project({

    name: req.body.name,

    createdBy: req.user.id

   });

  await project.save();

  res.json(project);

});


// Get Projects

router.get("/",
auth,
async (req, res) => {

  const projects =
   await Project.find();

  res.json(projects);

});

module.exports = router;