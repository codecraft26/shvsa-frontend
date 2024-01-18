// actions/agentActions.js

import axios from 'axios';
import { CREATE_AGENT_REQUEST,
     CREATE_AGENT_SUCCESS,
      CREATE_AGENT_FAIL,
      GET_AGENT_FAIL,
      GET_AGENT_REQUEST,
      GET_AGENT_SUCCESS } from '../constants/agentConstants';

export const createAgent = (name,email,phone,description) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_AGENT_REQUEST });


        const config={headers:{'Content-Type':'application/json'}};


        // Add your API call logic here, e.g., using fetch or axios
        const {data}=await axios.post('https://shvsa-backend-assigment.onrender.com/api/support-agents',
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


export const getAgents =()=>{
    return async (dispatch)=>{
        try {
            dispatch({type:GET_AGENT_REQUEST});
            const {data}=await axios.get('https://shvsa-backend-assigment.onrender.com/api/support-agents');
            dispatch({
                type:GET_AGENT_SUCCESS,
                payload:data
            })
        } catch (error) {
            dispatch({
                type:GET_AGENT_FAIL,
                payload:error.response.data.message
            })
        }
    }
}
