import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [formValidUser, setFormValidUser] = useState("");
  const [formValidPass, setFormValidPass] = useState("");

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

  async function formValidationUser() {
    if (username.length === 0) { 
      setFormValidUser("Please provide an username") 
    } else if(username.length < 3){
      setFormValidUser("Username needs to be longer than 3 characters");
    } else {
      setFormValidUser("")
    } 
  }

  async function formValidationPass() {
    if(password.length < 3) {
      setFormValidPass("Password needs to be longer than 3 characters")
    } else {
      setFormValidPass("")
    } 
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
        { error ? <p>{error}</p> : null }
        <form onSubmit={handleSubmit}>
        <h4>{formValidUser}</h4>
          <label>
            Username: 
            <input 
              value ={username} 
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
          <h4>{formValidPass}</h4>
            Password: 
            <input 
              value ={password} 
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button onClick={() => {formValidationUser(), formValidationPass()}}>Submit</button> 
        </form>
    </div>
  )
}