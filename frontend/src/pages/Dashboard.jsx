import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Get token
  const token = localStorage.getItem("token");

  // Decode role
  const role = token
    ? JSON.parse(atob(token.split(".")[1])).role
    : null;

  // Load data
  const loadData = async () => {

    try {

      const p = await API.get("/projects");
      const t = await API.get("/tasks");

      setProjects(p.data);
      setTasks(t.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  // Completed count
  const completed =
    tasks.filter((t) =>
      t.status === "completed"
    ).length;

  // Overdue count
  const overdue =
    tasks.filter((t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "completed"
    ).length;

  return (

    <div className="container mt-4">

      <h2>Dashboard</h2>

      <p>
        <strong>User Role:</strong> {role}
      </p>

      <div className="row">

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h5>Total Projects</h5>
            <h2>{projects.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h5>Total Tasks</h5>
            <h2>{tasks.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            <h5>Completed</h5>
            <h2>{completed}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center bg-danger text-white">
            <h5>Overdue</h5>
            <h2>{overdue}</h2>
          </div>
        </div>

      </div>

    </div>

  );

}

export default Dashboard;