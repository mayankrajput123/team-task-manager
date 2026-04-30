import { useState, useEffect } from "react";
import API from "../services/api";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Get role
  const token = localStorage.getItem("token");

  const role = token
    ? JSON.parse(atob(token.split(".")[1])).role
    : null;

  // Fetch tasks
  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchTasks();

  }, []);

  // Create task
  const createTask = async () => {

    try {

      await API.post("/tasks", {

        title,
        description: "Task from UI",
        status: "pending",
        dueDate

      });

      setTitle("");
      setDueDate("");

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  // Update status
  const updateStatus = async (id) => {

    try {

      await API.put(`/tasks/${id}`, {

        status: "completed"

      });

      fetchTasks();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="container mt-4">

      <h2>Tasks</h2>

      {/* Only Admin Can Create */}
      {role === "admin" && (

        <div className="mb-3">

          <input
            className="form-control mb-2"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="date"
            className="form-control mb-2"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={createTask}
          >
            Create Task
          </button>

        </div>

      )}

      <ul className="list-group">

        {tasks.map((t) => {

          const isOverdue =
            t.dueDate &&
            new Date(t.dueDate) < new Date() &&
            t.status !== "completed";

          return (

            <li
              key={t._id}
              className="list-group-item"
            >

              {t.title} — {t.status}

              {t.dueDate && (
                <span>
                  {" "}|
                  Due:
                  {" "}
                  {new Date(
                    t.dueDate
                  ).toLocaleDateString()}
                </span>
              )}

              {isOverdue && (
                <span style={{color:"red"}}>
                  {" "} (Overdue)
                </span>
              )}

              <button
                className="btn btn-success btn-sm ms-2"
                onClick={() =>
                  updateStatus(t._id)
                }
              >
                Mark Done
              </button>

            </li>

          );

        })}

      </ul>

    </div>

  );

}

export default Tasks;