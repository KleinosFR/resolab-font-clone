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
    const {
      oldMessages,
      newMessages,
      user,
      typingUsers,
      isOnline
    } = this.props;
    return (
      <div ref="container" className="thread-container">
        <div className="thread">
          {oldMessages &&
            oldMessages.map(mes => {
              return (
                <div
                  key={mes && mes.id}
                  className={
                    mes &&
                    `message-container ${mes.sender === user.name && "right"}`
                  }
                >
                  <div className="time">{mes && mes.time}</div>
                  <div className="data">
                    <div className="message">{mes && mes.message}</div>
                    <div className="name">{mes && mes.sender}</div>
                  </div>
                </div>
              );
            })}
          {isOnline &&
            newMessages &&
            newMessages.map(mes => {
              return (
                <div
                  key={mes && mes.id}
                  className={
                    mes &&
                    `message-container ${mes.sender === user.name && "right"}`
                  }
                >
                  <div className="time">{mes && mes.time}</div>
                  <div className="data">
                    <div className="message">{mes && mes.message}</div>
                    <div className="name">{mes && mes.sender}</div>
                  </div>
                </div>
              );
            })}
          {isOnline &&
            typingUsers &&
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
