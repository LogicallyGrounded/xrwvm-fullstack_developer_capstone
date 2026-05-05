import React, { useState } from 'react';
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    const res = await fetch(register_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "email": email
        }),
    });
    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
        alert("The user with same username is already registered");
        window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_container">
      <div className="header">
        <span className="text">SignUp</span>
        <span style={{cursor: "pointer", float:"right"}} onClick={gohome}>✖</span>
      </div>
      <form onSubmit={register}>
        <div className="inputs">
          <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} required/>
          <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} required/>
          <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)} required/>
          <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" name="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="submit_panel">
          <input className="submit" type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
};
export default Register;
