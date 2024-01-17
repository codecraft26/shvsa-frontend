// reducers/agentReducer.js

import {
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENT_FAIL,
  
} from "../constants/agentConstants";

export const agentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_AGENT_REQUEST:
      return { loading: true };
    case CREATE_AGENT_SUCCESS:
      return { loading: false, agentInfo: action.payload };

    case CREATE_AGENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
