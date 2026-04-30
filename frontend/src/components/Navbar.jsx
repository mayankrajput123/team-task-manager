import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="bg-dark p-3">

      <Link
        className="text-white me-3"
        to="/dashboard"
      >
        Dashboard
      </Link>

      <Link
        className="text-white me-3"
        to="/projects"
      >
        Projects
      </Link>

      <Link
        className="text-white me-3"
        to="/tasks"
      >
        Tasks
      </Link>

      {!token && (
        <>
          <Link
            className="text-white me-3"
            to="/register"
          >
            Register
          </Link>

          <Link
            className="text-white me-3"
            to="/"
          >
            Login
          </Link>
        </>
      )}

      {token && (

        <button
          className="btn btn-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      )}

    </div>

  );

}

export default Navbar;