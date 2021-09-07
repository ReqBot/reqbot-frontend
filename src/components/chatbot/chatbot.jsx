import React, { Component } from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "./chatbot.css";
import axios from "axios";

class Chatbot extends Component {
  constructor(props) {
    console.log(new Date());
    super(props);
    this.user = {
      id: 1,
      avatarUrl: "https://image.flaticon.com/icons/png/512/64/64572.png",
    };
    this.bot = { id: 0 };
    this.state = {
      messages: [
        {
          author: this.bot,
          timestamp: new Date(),
          text: "Hola, soy reqbot. Puedo ayudarte con la elicitación de requisitos!",
        },
      ],
    };
  }

  addNewMessage = (event) => {
    console.log(event.message.text);
    let botResponce = Object.assign({}, event.message);
    this.setState((prevState) => ({
      messages: [...prevState.messages, event.message],
    }));

    const headers = {
      session_id: "526f7122-ace8-4eab-879a-4cdfa37fa7ff",
    };
    let jsonSent = {
      q: event.message.text.toString(),
    };

    axios
      .post("http://localhost:5000/api/watson/message", jsonSent, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        botResponce.text = response.data.message;
        botResponce.author = this.bot;
        this.setState((prevState) => ({
          messages: [...prevState.messages, botResponce],
        }));
      })
      .catch((error) => {
        console.log(error);
        botResponce.text = "Perdon, tuve un problema";
        botResponce.author = this.bot;
        this.setState((prevState) => ({
          messages: [...prevState.messages, botResponce],
        }));
      });
  };

  countReplayLength = (question) => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  };

  render() {
    return (
      <Chat
        user={this.user}
        messages={this.state.messages}
        onMessageSend={this.addNewMessage}
        placeholder={"Type a message..."}
      />
    );
  }
}

export default Chatbot;
