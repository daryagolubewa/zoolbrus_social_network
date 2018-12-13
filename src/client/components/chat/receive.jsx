import React, { Component } from 'react';


export default class ReceiverMsg extends Component {
  render() {
    return (
        <div style={{
          borderRadius: '0px 14px 14px 14px',
          margin: '5px 5px 5px 5px',
          width: 150,
          border: '1px solid #777',
          textAlign: 'center',
          boxShadow: '0px 0 30px 2px #1A3457',
          background: '#8be2bf',
          alignItems: 'row'
        }}>
          {this.props.text}
        </div>
    );
  }
}
