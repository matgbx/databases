import React from 'react';
import _ from 'underscore';
import $ from 'jquery';

import dummyData from './dummyData';
import RoomListView from './RoomListView';
import ChatListView from './ChatListView';

import API_KEYS from './config/config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: 'Salamander',
      currentRoom: 'lobby',
      friendList: [],
      messageList: dummyData,
      roomObj: {},
      selectedUsername: '',
      userInput: '',
      newRoomVal: '',
      setUserVal: '',
    };

    this.roomNameClick = this.roomNameClick.bind(this);
    this.userNameClick = this.userNameClick.bind(this);
    this.userInputSubmit = this.userInputSubmit.bind(this);
    this.userTextInput = this.userTextInput.bind(this);
    this.createRoomInput = this.createRoomInput.bind(this);
    this.roomInputSubmit = this.roomInputSubmit.bind(this);
    this.setUserInput = this.setUserInput.bind(this);
    this.setUserSubmit = this.setUserSubmit.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    
    this.fetchMessages();
  }

  componentDidMount() {
    // fetch the data
    this.fetchMessages();
    
    // populate the room names
    this.updateRoomList(this.state.messageList);
    
    setInterval(this.fetchMessages, 30000);
  }

  roomNameClick(room) {
    console.log('roomNameClick', room);
    this.setState({
      currentRoom: room
    });
  }

  userNameClick(username) {
    console.log('toggling friend', username);
    const fList = this.state.friendList.slice();
    if (fList.includes(username)) {
      fList.splice(fList.indexOf(username), 1);
    } else {
      fList.push(username);      
    }
    this.setState({
      friendList: fList,
    });
  }

  userInputSubmit(e) {
    console.log('submitted', this.state.userInput);
    //post to server
    this.postRequest();
    this.setState({
      userInput: ''
    });
    
    
    //fetch from server
    this.fetchMessages();
  }
  userTextInput(val) {
    this.setState({
      userInput: val,
    });
    console.log(this.state.userInput);
  }
  
  createRoomInput(val) {
    this.setState({
      newRoomVal: val,
    });
    console.log(this.state.newRoomVal);
  }
  
  roomInputSubmit(e) {
    console.log('submitted', this.state.newRoomVal);
    //post to server
    const curr = this.state.newRoomVal;
    if (curr.length > 0) {
      this.setState({
        currentRoom: curr,
        newRoomVal: '',
      });      
    }
    
    //fetch from server
  }
  
  fetchMessages() {
    const url = 'http://localhost:3000/classes/messages';

    $.ajax({
      url: url,
      type: 'GET',
      headers: API_KEYS,
      data: 'order=-createdAt&limit=200',
      success: (data) => {
        console.log('data fetched successfully', data);
        console.log(data[0]);
        var safeData = data.map(message => {
          let safeMessage = {};
          for (let key in message) {
            safeMessage[key] = _.escape(message[key]);
          }
          return safeMessage;
        })
        this.setState({
          messageList: safeData,
        });
        console.log('safeData', safeData);
        this.updateRoomList(safeData);
      },
      error: (err) => {
        console.log('fetchMessages() did not work!', err);
      },
    });
  }
  postRequest() {
    const url = 'http://localhost:3000/classes';

    $.ajax({
      url: url,
      type: 'POST',
      // headers: API_KEYS,
      data: JSON.stringify({
        username: this.state.currUser,
        message: this.state.userInput,
        roomname: this.state.currentRoom,
      }),
      contentType: 'application/json',
      crossDomain: true,
      success: (data) => {
        console.log('data sent successfully', data);
      },
      error: (err) => {
        console.log('this did not work!', err);
      },
    });
  }
  updateRoomList(messages) {
    var roomObj = messages.map(message => {
      return message.roomname;
    }).reduce((result, room) => {
      result[room] = true;
      return result;
    }, {});
    
    this.setState({roomObj: roomObj});
    console.log(roomObj);
     
  }

  setUserInput(val) {
    this.setState({
      setUserVal: val,
    });
    console.log(this.state.setUserVal);
  }

  setUserSubmit(e) {
    console.log('submitted', this.state.setUserVal);
    //post to server
    var setUserVal = this.state.setUserVal;
    if (setUserVal.length > 0) {
      this.setState({
        currUser: setUserVal,
        setUserVal: '',
      });      
    }
  }

  render() {
    return (
      <section>
        <div className="header">
          <h1 className="logo">Mark's Chat Hotline</h1>
        </div>
        <section className="mainBody">
          <div className="roomList">
            <RoomListView
              roomNameClick={this.roomNameClick}
              currentRoom={this.state.currentRoom}
              roomObj={this.state.roomObj}
              createRoomInput={this.createRoomInput}
              newRoomVal={this.state.newRoomVal}
              roomInputSubmit={this.roomInputSubmit}
              currUser={this.state.currUser}
              setUserInput={this.setUserInput}
              setUserVal={this.state.setUserVal}
              setUserSubmit={this.setUserSubmit}
            />
          </div>
          <div className="chatList">
            <ChatListView
              currUser={this.state.currUser}
              currentRoom={this.state.currentRoom}
              userInput={this.state.userInput}
              userTextInput={this.userTextInput}
              messageList={this.state.messageList}
              userInputSubmit={this.userInputSubmit}
              friendList={this.state.friendList}
              userNameClick={this.userNameClick}
            />
          </div>
        </section>
      </section>
    );
  }
}


export default App;
