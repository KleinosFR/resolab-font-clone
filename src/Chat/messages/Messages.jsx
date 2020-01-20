import React, { Component } from "react";
import "./messages.css";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <div
        ref="container"
        className="thread-container"
        style={{ height: "250px" }}
      >
        <div className="thread">
          {messages !== undefined &&
            messages.map(mes => {
              return (
                <div
                  key={mes.id}
                  className={`message-container ${mes.sender === user.name &&
                    "right"}`}
                >
                  <div className="time">{mes.time}</div>
                  <div className="data">
                    <div className="message">{mes.message}</div>
                    <div className="name">{mes.sender}</div>
                  </div>
                </div>
              );
            })}
          {typingUsers !== undefined &&
            typingUsers.map(name => {
              return (
                <div key={name} className="typing-user">
                  {`${name} est en train d'écrire . . .`}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
