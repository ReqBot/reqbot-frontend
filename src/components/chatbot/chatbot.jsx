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
          text: "Hi, I'm reqbot. I can help you with the elicitation of requirements!",
        },
      ],
      sesionIDIBM: false,
      flagSesionIdIBM: false,

      interviewStarted: false,
      rol: undefined,
      attribute: undefined,
      consequence: undefined,
    };
  }

  logMessage = "";
  newLine = "\n";

  componentDidMount() {}

  componentWillUnmount = () => {
    this.saveLog();
  };

  addNewMessage = (event) => {
    console.log(event.message.text);

    if (this.state.flagSesionIdIBM) {
      this.getMessage(event);
    } else {
      this.getSesionIdIBM(event);
    }
  };

  logger = (user, message) => {
    this.logMessage =
      this.logMessage + new Date().toLocaleString() + this.newLine;
    this.logMessage =
      this.logMessage +
      " " +
      user +
      ": " +
      message +
      this.newLine +
      this.newLine;

    console.log(this.logMessage);
    this.saveLog(this.logMessage);
  };

  saveLog = (message) => {
    var encodedString64 = btoa(message);

    console.log(encodedString64);
  };

  getMessage = (event) => {
    let botResponce = Object.assign({}, event.message);

    this.setState((prevState) => ({
      messages: [...prevState.messages, event.message],
    }));

    const headers = {
      session_id: this.state.sesionIDIBM,
    };

    let jsonSent = {
      q: event.message.text.toString(),
    };

    this.logger("User", jsonSent.q);

    axios
      .post("http://localhost:5000/api/watson/message", jsonSent, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        botResponce.text = response.data.data.message;
        botResponce.author = this.bot;
        this.setState((prevState) => ({
          messages: [...prevState.messages, botResponce],
        }));

        this.logger("Chatbot", event.message.text.toString());

        if (this.state.interviewStarted) {
          if (response.data.data.entity != "") {
            if (response.data.data.entity == "atributo") {
              this.setState({
                attribute: event.message.text.toString(),
              });
            }
            if (response.data.data.entity == "consecuencia") {
              this.setState({
                consequence: event.message.text.toString(),
              });
            }
            if (response.data.data.entity == "rol") {
              this.setState({
                rol: event.message.text.toString(),
              });
            }
          }

          if (
            this.state.attribute != undefined &&
            this.state.consequence != undefined &&
            this.state.rol != undefined
          ) {
            this.saveUserStory();
          }
        } else {
          if (response.data.data.intent == "startInterview") {
            this.setState({
              interviewStarted: true,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        botResponce.text = "Perdon, tuve un problema";
        botResponce.author = this.bot;
        this.setState((prevState) => ({
          messages: [...prevState.messages, botResponce],
        }));

        this.logger("Chatbot", botResponce.text);
      });
  };

  saveUserStory = () => {
    const headers = {};
    console.log(this.state.rol);
    let jsonSent = {
      nombre: "Historia X",
      rol: this.state.rol,
      funcionalidad: this.state.attribute,
      resultado: this.state.consequence,
      fechaModificacion: "07-09-2021",
      modificadoPor: "1",
      idProyecto: this.props.proyect.idProyecto,
      estado: "Pendiente",
    };
    console.log(jsonSent);
    axios
      .post("http://localhost:5000/api/historiausuario", jsonSent, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          interviewStarted: false,
          rol: undefined,
          attribute: undefined,
          consequence: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getSesionIdIBM = (event) => {
    axios
      .get("http://localhost:5000/api/watson/session")
      .then((resonse) => {
        this.setState({
          sesionIDIBM: resonse.data.session_id,
          flagSesionIdIBM: true,
        });
        console.log(this.state.sesionIDIBM);
        this.getMessage(event);
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo conectar con el servidor.");
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
