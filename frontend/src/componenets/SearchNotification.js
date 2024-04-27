import React, { useState, useEffect } from "react";
import axios from "axios"; //to take data from db
import { useParams } from "react-router-dom";

export default function SingleNotification() {

    const {notID} = useParams();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        function getSingleNotification() {
            // console.log(notID)
            axios.get(`http://localhost:8070/notification/find/${notID}`).then((res) => {
                setNotifications(res.data.notification);
                console.log("data:",notifications);
            }).catch((err) => {
                alert(err.message)
            })
        }
        getSingleNotification();   
    }, [])

    return (
        <div>
            <br></br>
            <div style={{margin:"auto"}}>
                <h2>Notification Details</h2>
                <div>
                    <table className="table table-borderless">
                        <tr>
                            <th>Notification ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Receiver</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>

                        <tbody>
                            {
                                notifications.map((notification) => (
                                    <tr>
                                        <td>{notification.notID}</td>
                                        <td>{notification.title}</td>
                                        <td>{notification.description}</td>
                                        <td>{notification.receiver}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={()=>{
                                                window.location.replace(`http://localhost:3000/notification/update/${notification._id}`)
                                            }}>Update</button>
                                        </td>

                                        <td>
                                            <button className="btn btn-danger" onClick={()=>{
                                                window.location.replace(`http://localhost:3000/notification/delete/${notification._id}`)
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                    <a href="/health" type="button" class="btn btn-secondary float-right" style={{marginRight:"40px", width:"8%"}}>back</a>
                </div>
            </div>



        </div>
    ) 
}