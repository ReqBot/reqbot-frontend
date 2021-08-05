import React, { Component } from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "./chatbot.css";
class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.user = {
      id: 1,
      avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
    };
    this.bot = { id: 0 };
    this.state = {
      messages: [
        {
          author: this.bot,
          timestamp: new Date(),
          text: "Hello, this is a demo bot. I don't do much, but I can count symbols!",
        },
      ],
    };
  }

  addNewMessage = (event) => {
    let botResponce = Object.assign({}, event.message);
    botResponce.text = this.countReplayLength(event.message.text);
    botResponce.author = this.bot;
    this.setState((prevState) => ({
      messages: [...prevState.messages, event.message],
    }));
    setTimeout(() => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, botResponce],
      }));
    }, 1000);
  };

  countReplayLength = (question) => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  };

  render() {
    return (
      <div class="centered">
        <Chat
          user={this.user}
          messages={this.state.messages}
          onMessageSend={this.addNewMessage}
          placeholder={"Type a message..."}
        />
      </div>
    );
  }
}

export default Chatbot;
