import { useState } from "react";
import "./message.css";

function Message() {
  const [message, setMessage] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  const addMessage = () => {
    setMessage([...message, text]);
    setText("");
  };

  return (
    <article style={{ overflow: "auto", marginTop: "auto" }}>
      <div
        className="d-flex flex-row justify-content-start mb-4"
        style={{ wordWrap: "break-word" }}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"
          style={{ width: "30px", height: "100%" }}
        />
        <div
          className="p-3 ms-3"
          style={{
            borderRadius: "15px",
            backgroundColor: "#D8F6CE",
          }}
        >
          <p className="small mb-0 message">
            Hello and thank you for visiting MDBootstrap
          </p>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-end mb-4">
        <div
          className="p-3 border"
          style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
        >
          <p className="small mb-0 message">
            Thank you, I really like your product.
          </p>
        </div>
      </div>
    </article>
  );
}

export default Message;
