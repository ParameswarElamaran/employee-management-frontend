import { useState, useEffect } from "react";

function Hero(props) {
  const [count, setCount] = useState(() => {
  return Number(localStorage.getItem("portfolioLikes")) || 0;
});
  const [message, setMessage] = useState("");

useEffect(() => {
  fetch("https://employee-management-backend-oh7j.onrender.com/api/message")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      setMessage(data);
    })
    .catch((error) => {
      console.log(error);
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


    </section>
  );
}

export default Hero;