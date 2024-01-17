import axios from "axios";

import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_FAILURE,
  CREATE_TICKET_SUCCESS,
} from "../constants/ticketConstants";

export const createTicket =
  (topic,description,type,severity) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_TICKET_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "http://localhost:8000/api/support-tickets",
        {topic,description,type,severity },
        config
      );

     

      dispatch({
        type: CREATE_TICKET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_TICKET_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
