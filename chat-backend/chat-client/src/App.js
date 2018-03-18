import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Chat from './components/Chat';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      socketId: null,
      messages: [],
      message: '',
      timeStamp: null
    }

    this.socket = io('localhost:8080');
    this.socket.on('CONNECTION', function(socketId) {
      connected(socketId);
    })
    this.socket.on('RECIEVE_MESSAGE', function(data) {
      addMessage(data);
    })

    this.sendMessage = e => {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        message: this.state.message,
        timeStamp: this.state.timeStamp
      });
      this.setState({
        message: ''
      })
      console.log(this.state.message);
    }

    const connected = socketId => {
      this.setState({socketId: socketId});
    }

    const addMessage = data => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
    };


    this.handleChange = e => {
      this.setState({
        message: e.target.value,
        timeStamp: moment().format('MMMM Do YYYY, h:mm a')
      });
      console.log(this.state.message);
    }

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <h1>Socket Connected. Id: {this.state.socketId}</h1>
          <Chat
            handleChange={this.handleChange}
            sendMessage={this.sendMessage}
            message={this.state.message}
            messages={this.state.messages}
          />
        </div>
      </div>
    );
  }
}

export default App;
