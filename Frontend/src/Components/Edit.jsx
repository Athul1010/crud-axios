import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    // this code is from Details.jsx file
    const getdata = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/getuser/${id}`);
            // setUserdata(res.data);
            setName(res.data.name);
            setEmail(res.data.email);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getdata();
    }, [id]);

    // this code is from Details.jsx file



    // The axios method for editing

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { name, email };
            await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/updateuser/${id}`, updatedUser);
            alert('User details updated successfully');
            navigate(`/table/view/${id}`); // Redirect to the details page
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user details');
        }
    };

    return (
        <div className='container'>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default Edit