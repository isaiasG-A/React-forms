import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [formValid, setFormValid] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const requestBody = {
        userName: username,
        passWord: password
      }

      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      setToken(data.token);
    } catch(error) {
      setError(error.mesage);
    }
  }

  async function formValidation() {
    username.length === 0 ? setFormValid("block") : setFormValid("none");
    console.log(formValid)
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
        { error ? <p>{error}</p> : null }
        <h4 style={{display: `${formValid}`}}>please provide an username</h4>
        <form onSubmit={handleSubmit}>
          <label>
            Username: 
            <input 
              value ={username} 
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password: 
            <input 
              value ={password} 
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button onClick={formValidation}>Submit</button> 
        </form>
    </div>
  )
}