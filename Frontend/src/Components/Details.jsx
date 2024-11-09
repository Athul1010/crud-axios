import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { MdMailOutline } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



//Note:- Steps for to get details of the individual datas

//Table.jsx:- 
// User clicks on the "view" button, which navigates to /table/view/{_id}.

// Details.jsx:-
// Extracts id from the URL using useParams.
// Fetches user data using axios.get with the id.
// Displays the fetched data in the component.



const Details = () => {
    const { id } = useParams("")// Extract the id from the URL
    console.log(id);

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const getdata = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/getuser/${id}`);
            // const res = await axios.get(`http://localhost:8009/getuser/${id}`);
            setUserdata(res.data);
            console.log("get data");
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getdata();
    }, [id]); // Dependency array includes id, so it fetches data when id changes // Adding id as a dependency to avoid infinite loop


    return (
        <div>

            <h1>Success</h1>
            <h3 className=''>Name: <span>{getuserdata.name}</span></h3>
            <h3 className='mt-3'>email: <span>{getuserdata.email}</span></h3>

            {/* <div className='container'>
                <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

                <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <div className="add_btn">

                            
                            <Link to={''}><button className='btn btn-primary mx-2'><MdEdit /></button></Link>

                            <button className='btn btn-danger'><MdDelete /></button>
                        </div>

                        <div className='row'>
                            <div className="left_view col-lg-6 col-md-6 col-sm-12">
                                <img src={''} style={{ width: 50 }} alt="" />
                                <h3 className='mt-3'>Name: <span>{getuserdata.name}</span></h3>
                                <h3 className='mt-3'>Age: <span>21</span></h3>
                                <p className='mt-3'><MdMailOutline />Email: <span></span></p>
                                <p className='mt-3'><MdWork />Occupation: <span></span></p>
                            </div>

                            <div className="right_view col-lg-6 col-md-6 col-sm-12">

                                <p className='mt-5'><FaMobileAlt />Mobile: <span></span></p>
                                <p className='mt-3'><FaLocationDot />Location: <span></span></p>
                                <p className='mt-3'>Description: <span></span></p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div> */}
        </div>
    )
}

export default Details