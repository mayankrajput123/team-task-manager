import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async () => {

try {

await API.post("/auth/register", {

name,
email,
password,
role: "admin"

});

navigate("/");

}
catch {

alert("Register Failed");

}

};

return (

<div>

<h2>Register</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button onClick={handleRegister}>
Register
</button>

</div>

);

}

export default Register;