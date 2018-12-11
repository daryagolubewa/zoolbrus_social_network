import React, { Component } from 'react';
import './chat.css';

export default class Chat extends Component {
  render() {
    return (
            <div className='chatContainer'>
                <div className='chatParticipants'>
                    {/* list of opened chats */}
                </div>
                <div className='chatDialog'>
                    {/* list of messages */}
                </div>
            </div>
    );
  }
}
