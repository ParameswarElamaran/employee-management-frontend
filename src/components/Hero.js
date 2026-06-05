import { useState, useEffect } from "react";

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

      <h3>{message} </h3>


    </section>
  );
}

export default Hero;
