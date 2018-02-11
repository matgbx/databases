import React from 'react';

const RoomListView = (props) => {
  return (
    <section className="roomBox">
      <div className="roomHead">
        <p className="currRoom">
          {props.currentRoom}
        </p>
        <div className="currUserBox">
          <span className="greeting">
            Hi:
          </span>
          <span className="currUser">
            {props.currUser}
          </span>
        </div>
      </div>
      <div className="setUser">
        <input
          className="setUserInput"
          type="text"
          value={props.setUserVal}
          placeholder="set username"
          onChange={(evt) => { props.setUserInput(evt.target.value); }}
        />
        <span 
          className="submitBtn"
          onClick={() => { props.setUserSubmit(); }}
        >Submit
        </span>
      </div>
      <div className="createRoom">
        <input
          className="roomInput"
          type="text"
          value={props.newRoomVal}
          placeholder="create room"
          onChange={(evt) => { props.createRoomInput(evt.target.value); }}
        />
        <span 
          className="submitBtn"
          onClick={() => { props.roomInputSubmit(); }}
        >Submit
        </span>
      </div>
      {Object.keys(props.roomObj).map(roomName => (
        <div className="roomname" onClick={(e) => { props.roomNameClick(e.target.textContent)} }>
         {roomName} 
        </div>
        ))}
    </section>
  );
};

export default RoomListView;
