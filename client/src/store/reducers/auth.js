import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        // Check if there is a user in the object if Object.keys.length returns a 1 -> there is a user
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      }
    default: 
      return state;
  }
};