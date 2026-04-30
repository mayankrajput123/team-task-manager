import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import Navbar from "./components/Navbar";

function App() {

return (

<div>

<Navbar />

<Routes>

<Route path="/" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/dashboard" element={<Dashboard />} />

<Route path="/projects" element={<Projects />} />

<Route path="/tasks" element={<Tasks />} />

</Routes>

</div>

);

}

export default App;