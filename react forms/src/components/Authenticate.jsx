import { useState } from "react";

export default function Authencticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [data, setData] = useState({});


async function handleClick() {
  try {
    const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    const result = await response.json();

    setSuccessMessage(result.message);
    setData(result.data);

  } catch(error) {
    setError(error.message);
  }
}

  return (
    <div className="auth">
      <h2>Authenticate</h2>
      { error ? <p>error</p> : null}
      {successMessage ? <p>{successMessage}</p> : null}
      {data ? <h4>data: {data.iat}</h4> : null} 
      <button onClick={handleClick}>Authentication Token</button>
    </div>
  )
}