import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

  return (
    <div className="signup">
      <h2>Sign Up</h2>
        { error ? <p>{error}</p> : null }
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
          <button>Submit</button> 
        </form>
    </div>
  )
}