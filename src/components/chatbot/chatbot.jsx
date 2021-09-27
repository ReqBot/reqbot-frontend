import React, { Component } from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import "./chatbot.css";
import axios from "axios";

class Chatbot extends Component {
  constructor(props) {
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

  identificadorHU = 0;
  logMessage = "";
  newLine = "\n";

  componentDidMount() {
    this.getIdentificadorUH();
  }

  componentWillUnmount = () => {
    if (this.logMessage != "") {
      this.saveLog(this.logMessage);
    }
  };

  addNewMessage = (event) => {
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
  };

  saveLog = (message) => {
    var encodedString64 = btoa(message);

    const headers = {
      session_id: this.state.sesionIDIBM,
    };

    let jsonSent = {
      nombre:
        "Log " +
        new Date().getDate().toLocaleString() +
        "/" +
        new Date().getMonth().toLocaleString() +
        " " +
        +new Date().getHours().toLocaleString() +
        ":" +
        new Date().getMinutes().toLocaleString(),
      archivo: encodedString64,
      idProyecto: this.props.proyect.idProyecto,
      estado: "-",
      fecha: new Date().toLocaleString(),
      nombreProyecto: this.props.proyect.nombre,
    };

    axios
      .post("https://reqbot-backend.herokuapp.com/api/logs/", jsonSent, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        console.log("Se guardo el log con exito");
      })
      .catch((error) => {
        console.log(error);
        console.log("Hubo un error al guardar el log");
      });
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
      .post(
        "https://reqbot-backend.herokuapp.com/api/watson/message",
        jsonSent,
        {
          headers: headers,
        }
      )
      .then((response) => {
        botResponce.text = response.data.data.message;
        botResponce.author = this.bot;
        this.setState((prevState) => ({
          messages: [...prevState.messages, botResponce],
        }));

        this.logger("Chatbot", response.data.data.message.toString());

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

  getIdentificadorUH = () => {
    axios
      .get(
        "https://reqbot-backend.herokuapp.com/api/historiausuario/ultimoidentificador"
      )
      .then((resonse) => {
        console.log(resonse);
        this.identificadorHU = parseInt(resonse.data[0].identificador);
        console.log(this.identificadorHU);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveUserStory = () => {
    const headers = {};

    let identiMasUno = this.identificadorHU + 1;
    let jsonSent = {
      nombre: "Historia " + this.identificadorHU.toString(),
      rol: this.state.rol,
      funcionalidad: this.state.attribute,
      resultado: this.state.consequence,
      fechaModificacion: new Date().toLocaleString(),
      modificadoPor: sessionStorage.getItem("idUsuario"),
      idProyecto: this.props.proyect.idProyecto,
      estado: "Pendiente",
      identificador: identiMasUno.toString(),
      version: "1.0",
      prioridad: "Media",
      puntaje: "0",
    };

    axios
      .post(
        "https://reqbot-backend.herokuapp.com/api/historiausuario",
        jsonSent,
        {
          headers: headers,
        }
      )
      .then((response) => {
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
      .get("https://reqbot-backend.herokuapp.com/api/watson/session")
      .then((resonse) => {
        this.setState({
          sesionIDIBM: resonse.data.session_id,
          flagSesionIdIBM: true,
        });
        this.getMessage(event);
      })
      .catch((error) => {
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
