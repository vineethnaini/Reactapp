import { userConstants } from '../constants/user.constants';

export function filter(state = {}, action) {
    switch (action.type) {
      case userConstants.FILTER_REQUEST:
        return { filtering: true ,
          users: action.users,
          user : action.user
          };
      case userConstants.FILTER_SUCCESS:
        return {
          filtered: true,
          users : action.users,
          user : action.user
        };
      case userConstants.FILTER_FAILURE:
        return {error: action.error,
        user : action.user
      };
      default:
        return state
    }
  }