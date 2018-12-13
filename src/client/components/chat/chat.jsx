import React, { Component } from 'react';
import './chat.css';
import socketIOClient from 'socket.io-client';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SenderMsg from './sendMsg';
import ReceiveMsg from './receive';
import {
  postLoginStartAC,
  postLoginSuccessAC,
  postLoginErrorAC
} from '../../redux/actions/login-actions';
import { selectLoginUser } from '../../redux/selectors/login-selectors';

const socket = socketIOClient('http://192.168.1.86:3000/');


const mapStateToProps = state => ({
  login: selectLoginUser(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push,
  postLoginStart: postLoginStartAC,
  postLoginSuccess: postLoginSuccessAC,
  postLoginError: postLoginErrorAC
}, dispatch);

class Chat extends Component {
    state = {
      msgs: [],
      users: [],
      show: false
    }

    componentDidMount() {
      this.getUsers();
    }

    // fetchUser = async() => {
    //     let response = await fetch('/api/test', {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //           sender: this.props.login.loginUser._id
    //         })
    //     })
    //     response = await response.json()
    //     this.setState({user: response.user})
    // }

    getUsers = async () => {
      let response = await fetch('/api/users');
      response = await response.json();
      console.log(response);
      for (let i = 0; i < response.users.length; i++) {
        if (response.users[i]._id == this.props.login._id) {
          response.users.splice(i, 1);
          break;
        }
      }
      this.setState({ users: response.users });
    }

    setMessage = (e) => {
      const msg = e.target.value;
      this.setState({ msg: { text: msg, sender: this.props.login._id, receiver: this.state.receiver } });
      console.log(this.state);
    }

    sendMessage = () => {
      socket.emit('send message', this.state.msg);
      this.setState({ show: true });
    }

    getMsgs = () => {
      if (this.state.show) {
        socket.emit('refresh', { sender: this.props.login._id, receiver: this.state.receiver });
        socket.once('msgs', (col) => {
          // this.state.msgs.push({text: col.text, sender: col.sender, receiver: col.receiver})
          this.setState({ msgs: col });
        });
      }
    }

    render() {
      this.getMsgs();
      return (
        <div className='chatContainer'>
            <div className='chatParticipants'>
                {/* list of opened chats */}
                <input onKeyDown={ async (e) => { if (e.key == 'Enter') { await this.setState({ user: e.target.value }); } this.fetchUser(); } } type="text"/>
                { this.state.users.map(item => (<div onClick={ async () => { await this.setState({ receiver: item._id, show: true }); } }>{ item.name }</div>)) }
            </div>
            <div className='chatDialog'>
                {/* list of messages */}
                <div >
                    { this.state.msgs.map((item, i) => {
                      if (item.sender == this.props.login._id) {
                        return (<SenderMsg text={ this.state.msgs[i].text }/>);
                      }

                      return (<ReceiveMsg text={ this.state.msgs[i].text }/>);
                    }) }
                    <input onChange={ this.setMessage } onKeyDown={ (e) => { if (e.key == 'Enter') { this.sendMessage(); } } } type="text"/>
                    <button onClick={ this.sendMessage } >SEND</button>
                </div>
            </div>
        </div>
      );
    }
}


const ChatPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
export default ChatPage;
