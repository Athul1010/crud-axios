import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { CiRead } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import '../Styles/Table.css'

const Table = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/getdata`);
            setUserdata(result.data); // Assuming result.data is the desired data structure
            console.log("get data", result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getdata();
    }, []); // Empty dependency array to run once when the component mounts


    // Function to handle user deletion
    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/deleteuser/${id}`);
            const deletedData = response.data;
            console.log(deletedData);

            if (response.status === 422 || !deletedData) {
                console.log(deletedData);
            } else {
                console.log("User deleted");
                getdata(); // Refresh the data after deletion
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    };

    // // Function to handle user deletion
    // const deleteUser = async (id) => {
    //     try {
    //         const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/deleteuser/${id}`);
    //         if (response.status === 200) {
    //             console.log("User deleted successfully");
    //             getdata(); // Refresh the data after deletion
    //         } else {
    //             console.log("Error deleting user:", response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //         alert('Failed to delete user');
    //     }
    // };

    return (

        <div className='mt-5'>
            <div className="container">
                <div className="add_btn mt-2 mb-2">
                    <Link to='/' className='btn btn-primary'>Add data</Link>
                </div>

                <table class="table">
                    <thead>
                        <tr class="table-dark">
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {getuserdata.map((element,id) => (
                            <tr>
                                <th scope="row">{id+1}</th>
                                <td>{element?.name}</td>
                                <td>{element?.email}</td>
                                <td>
                                    <Link to={`view/${element._id}`}><button><CiRead /></button></Link>
                                    <Link to={`edit/${element._id}`}><button className='btn btn-primary'><MdEdit /></button></Link>
                                    <button onClick={() => deleteUser(element._id)}><MdDelete /></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Table


