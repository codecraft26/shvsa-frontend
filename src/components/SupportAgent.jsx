import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAgent } from '../redux/action/agentActions';

import 'react-toastify/dist/ReactToastify.css';

const AgentForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const agent = useSelector(state => state.agent);
    const { loading, success, error } = agent;

    useEffect(() => {
        if (error && !success) {
           console.log(error);
        }
    }, [error, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createAgent( name, email, phone, description ));
    };

    return (

        <div>
        <form onSubmit={submitHandler}>
         
            {loading && <p>Loading...</p>}




            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {/* Add other input fields here */}
            <div>
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>

          {/* Error message display */}
          {error && !success && (
            <h1>Error: {error}</h1>
        )}
        </div>
    );
};

export default AgentForm;
