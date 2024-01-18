//redcures for ticket

import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_FAILURE,
  CREATE_TICKET_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAIL,
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


export const ticketListReducer = (state = { tickets: [], pagination: {} }, action) => {
  switch (action.type) {
    case GET_TICKETS_REQUEST:
      return { ...state, loading: true };
    case GET_TICKETS_SUCCESS:
      return {
        loading: false,
        tickets: action.payload.tickets,
        pagination: {
          filteredCount: action.payload.filteredcount,
          resultPerPage: action.payload.resultPerPage,
          page: action.payload.page,
          totalCount: action.payload.TotalCount
        }
      };
    case GET_TICKETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};