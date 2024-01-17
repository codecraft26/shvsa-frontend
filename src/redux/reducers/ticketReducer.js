//redcures for ticket

import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_FAILURE,
  CREATE_TICKET_SUCCESS,
} from "../constants/ticketConstants";

export const ticketReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TICKET_REQUEST:
      return { loading: true };
    case CREATE_TICKET_SUCCESS:
      return { loading: false, ticketInfo: action.payload };
    case CREATE_TICKET_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
