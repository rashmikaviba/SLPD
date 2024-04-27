import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllNotifications() {

    const [notID, setNotid] = useState("");
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        function getNotifications() {
            console.log(notID)
            axios.get("http://localhost:8070/notification/").then((res) => {
                setNotifications(res.data);
                console.log(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }

        getNotifications();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (notID) {
            window.location.replace(`http://localhost:3000/notification/search/${notID}`);
        }
    };

    return (
        <div>
            <br></br>
            <div style={{ margin: "auto" }}>
                <h2 className="text-center mt-4">All Notifications</h2>
                <div>

                    <div style={{ marginRight: "40px", marginLeft: "auto", width: "30%" }}>
                        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setNotid(e.target.value) }} />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="container my-4" style={{ border: "1px solid #ccc", padding: "20px" }}>
                        <table className="table table-borderless mt-4">
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
                                                <button className="btn btn-success" onClick={() => {
                                                    window.location.replace(`http://localhost:3000/notification/update/${notification._id}`)
                                                }}>Update</button>
                                            </td>

                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    window.location.replace(`http://localhost:3000/notification/delete/${notification._id}`)
                                                }}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>

                    <a href="/health" type="button" class="btn btn-secondary float-right" style={{ marginRight: "40px", width: "8%" }}>back</a>
                </div>
            </div>



        </div>
    )
}