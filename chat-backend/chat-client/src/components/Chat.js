import React, { Component } from 'react';


class Chat extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="Chat">
        <h1>Chat</h1>
        <div className='messageList'>
          <ul>
            {this.props.messages.map(function(message) {
              return(<li>{message.message}</li>)
            })}
          </ul>
        </div>
        <input type='text' value={this.props.message}
         onChange={this.props.handleChange}></input>
         <button onClick={this.props.sendMessage}>send</button>
      </div>
    );
  }
}

export default Chat;
