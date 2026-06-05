import { useState, useEffect } from "react";

function Hero(props) {
  const [count, setCount] = useState(() => {
  return Number(localStorage.getItem("portfolioLikes")) || 0;
});
  const [message, setMessage] = useState("");

useEffect(() => {
  fetch("http://localhost:8080/api/message")
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

      <h3>Likes: {count}</h3>
<button
  onClick={() => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("portfolioLikes", newCount);
  }}
  style={{
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#222",
    color: "white",
  }}
>
  Like 👍
</button>
    </section>
  );
}

export default Hero;