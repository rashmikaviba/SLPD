import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteNotification() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [receiver, setReceiver] = useState("");
    const [notID, setNotID] = useState("");
    
    const {id} = useParams();

  useEffect(()=>{
    axios.get(`http://localhost:8070/notification/get/${id}`).then((res) =>{
        console.log(res.data);
        setNotID(res.data.notification.notID);
        setTitle(res.data.notification.title);
        setDescription(res.data.notification.description);
        setReceiver(res.data.notification.receiver);
        
    }).catch((err)=>{
        console.log(err)
    })
},[])

  function deleteData(e) {
    e.preventDefault();

    axios.delete(`http://localhost:8070/notification/delete/${id}`).then(() => {
      alert("Notification details deleted");
      window.location.replace("http://localhost:3000/");
           
    }).catch((err) => {
      alert(err)
    })
  }

  return (
    <div>
      <div className="container">
          <br></br>
        <form onSubmit={deleteData}>
            <h3>Delete Notification</h3>
          <div class="col-md-6">
            <label for="notificationID" class="form-label">Notification ID</label>
            <input type="text" class="form-control" id="notificationID" value={notID} readOnly required />
          </div>


          <div class="col-md-6">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" value={title} readOnly required />
          </div>


          <div class="col-md-6">
            <label for="description" class="form-label">Description</label>
            <input type="description" class="form-control" id="description" value={description} readOnly required />
          </div>



          <div class="col-md-6">
            <label for="receiver" class="form-label">Receiver</label>
            <input type="text" class="form-control" id="receiver" value={receiver} readOnly required />
          </div>


          <br></br>
          <button type="submit" class="btn btn-danger">Remove</button>


         <a href="/" type="button" class="btn btn-secondary" style={{ marginLeft: "40px" }}>back</a>
        </form>
      </div>
    </div>
  )
}
