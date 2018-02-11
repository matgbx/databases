import React from 'react';
import FontAwesome from 'react-fontawesome'


const ChatListItem = (props) => {
  return (
    <div className="chat">
      <span className="userNameSpan">
        <a href='#' className={props.isFriend ? "username isFriend" : "username notFriend"} onClick={() => { props.userNameClick(props.message.username)}}>
        {props.message.username}
        </a> 
      </span>
        {props.isFriend ? <span className="airplane">✈️ &nbsp;&nbsp;&nbsp;friend</span> : ''}
      <div className="chatText">{props.message.text}</div>
    </div>
  );
};

export default ChatListItem;
// {props.isFriend ? "✈️" : ""}