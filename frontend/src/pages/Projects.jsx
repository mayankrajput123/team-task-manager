import { useState, useEffect } from "react";
import API from "../services/api";

function Projects() {

const [projects, setProjects] = useState([]);
const [name, setName] = useState("");

const fetchProjects = async () => {

try {

const res = await API.get("/projects");

setProjects(res.data);

} catch (err) {

console.log(err);

}

};

useEffect(() => {

fetchProjects();

}, []);

const createProject = async () => {

try {

await API.post("/projects", { name });

setName("");

fetchProjects();

} catch (err) {

console.log(err);

}

};

return (

<div>

<h2>Projects</h2>

<input
placeholder="Project Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<button onClick={createProject}>
Create Project
</button>

<ul>

{projects.map((p) => (

<li key={p._id}>
{p.name}
</li>

))}

</ul>

</div>

);

}

export default Projects;