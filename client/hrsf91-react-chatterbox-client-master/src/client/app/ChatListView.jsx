import React from 'react';
import ChatListItem from './ChatListItem';
import jquery from 'jquery';

const ChatListView = props => (
  <div>
    <div className="inputBox">
      <input className="userInput" type="text" value={props.userInput} placeholder="your thoughts here" onChange={(evt) => {props.userTextInput(evt.target.value)}}/>
      <span className="submitBtn" onClick={() => {props.userInputSubmit()}}>Submit</span>
    </div>
    <div className="chatBox">
      {props.messageList.map(message => {
        if (message.roomname === props.currentRoom) {
          return (
            <ChatListItem
              userNameClick={props.userNameClick}
              message={message}
              isFriend={props.friendList.includes(message.username)}
              currUser={message.username === props.currUser}
            />);
          }
        })
      }
    </div>
    <div className="signature">brought to you by Mark &amp; Mat</div>
  </div>
);

export default ChatListView;
