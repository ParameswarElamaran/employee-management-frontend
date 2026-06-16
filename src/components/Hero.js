import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Hero(props) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://employee-management-backend-oh7j.onrender.com/api/message")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Welcome to my portfolio!");
      });
  }, []);
return (
  <section
    id="hero"
    style={{ padding: "40px", textAlign: "center" }}
  >
    <h1>Hello, I'm {props.name} 👋</h1>

    <h2>{props.role}</h2>

    <p>{props.message}</p>

    <h3>{message}</h3>

    <Link to="/employees">
      <button
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        View Employees
      </button>
    </Link>
  </section>
);
}
export default Hero;
