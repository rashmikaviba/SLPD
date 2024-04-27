import React, {useState} from "react";
import axios from 'axios';

export default function AddNotification() {

    const [notID, setNotid] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [receiver, setReceiver] = useState("");
    
    function sendData(e){
        e.preventDefault();
        
        const notIDRegex = /^[nN]\d{3}$/;

        if (!notIDRegex.test(notID)) {
            alert("Notification ID should start with 'n' and be followed by three digits.");
            return;
        }

        const newNotification = {

            notID,
            title,
            description,
            receiver
        }

        axios.post("http://localhost:8070/notification/add", newNotification).then(() => {
            alert("Notification Added")
            window.location.replace("http://localhost:3000/add");


        }).catch((err) => {
            alert(err)
        })
    }

    return(
        <div> 
            <h3 className="text-center mt-4" style={{ fontSize: "24px" }}>Create New Notification</h3>

        <div className="container mt-5">

        <form onSubmit={sendData} style={{ border: "1px solid #ccc", padding: "20px" }} >
            <div class="form-group">
            <label for="notid">Notification ID</label>
            <input type="text" class="form-control" id="notid" placeholder="Enter notification id" 
            onChange={(e) => {
                setNotid(e.target.value);
            }} required/>

            </div>

            <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" placeholder="Enter notification title"
            onChange={(e) => {
                setTitle(e.target.value);
            }} required/>
            
            </div>
        
            <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" placeholder="Enter notification description"
            onChange={(e) => {
                setDescription(e.target.value);
            }} required/>
        
            </div>

            <div class="form-group">
            <label for="receiver">Receiver</label>
            <input type="text" class="form-control" id="receiver" placeholder="Enter receiver"
            onChange={(e) => {
                setReceiver(e.target.value);
            }} required/>
        
            </div>
        
            <button type="submit" class="btn btn-primary" style={{ backgroundColor: "#6E1C5E" }}>Create</button>
        </form>
        </div>
        </div>
    )
}
