import { userConstants } from '../constants/user.constants';

export function get(state = {}, action) {
    switch (action.type) {
      case userConstants.GET_REQUEST:
        return { geting: true ,
                user: action.user
                };
      case userConstants.GET_SUCCESS:
        return {gotuser: true,
          user: action.user};
      case userConstants.GET_FAILURE:
        return {error: action.error};
      default:
        return state
    }
  }