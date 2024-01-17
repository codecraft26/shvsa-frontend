// actions/agentActions.js

import axios from 'axios';
import { CREATE_AGENT_REQUEST, CREATE_AGENT_SUCCESS, CREATE_AGENT_FAIL } from '../constants/agentConstants';

export const createAgent = (name,email,phone,description) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_AGENT_REQUEST });


        const config={headers:{'Content-Type':'application/json'}};


        // Add your API call logic here, e.g., using fetch or axios
        const {data}=await axios.post('http://localhost:8000/api/support-agents',
        {name,email,phone,description},
        config
        
        )

       

        

        dispatch({
            type: CREATE_AGENT_SUCCESS,

            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_AGENT_FAIL,
            payload: error.response.data.message,
        });
    }
};
