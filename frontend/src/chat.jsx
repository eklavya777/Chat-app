import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios";
import './App.css';
import MessageSender from "./sendbox";
// import MessageList from "./messageList";

function Chat({sharedData, sharedDataSetter}){

const [data, setData] = useState();
const [selectedId, setSelectedId] = useState();

useEffect(() => {
  console.log("Shared data is here --- ");
  console.log(sharedData);

  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        console.log(data);
        setData(data);
        setSelectedId(data[0].id);
      }, 2000);
    })
    .catch(err => console.log(err));
}, []);

const changeIndex = (id) => {
  console.log("here3");
  console.log(sharedData);
  setSelectedId(id);

  axios.post('http://localhost:3000/receiverId', { selectedId : id})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


return data !== undefined ? (
  <div className="UserList">
    <InfiniteScroll dataLength={data.length} height={720}>
      {data.map((d) => (
        <div className="list" key={d.id} onClick={() => changeIndex(d.id)}>
          <span style={{ fontWeight: 'bold', color: selectedId === d.id ? 'red' : 'green' }}>
            {d.username}
          </span>
        </div>
      ))}
    </InfiniteScroll>
    {/* {selectedId !== undefined ? (
      <div>
        <MessageList selectedId={selectedId}/>
        <MessageSender />
      </div>
    ) : null} */}
  </div>
) : (
  <h3>Loading</h3>
);
}

export default Chat;