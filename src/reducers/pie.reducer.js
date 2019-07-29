import { userConstants } from '../constants/user.constants';

export function pie(state = {}, action) {
    switch (action.type) {
      case userConstants.PIE_TASK_REQUEST:
        return {
          };
      case userConstants.PIE_TASK_SUCCESS:
        return {
          gotdata: true,
          data : action.data
        };
      case userConstants.PIE_TASK_FAILURE:
        return {error: action.error
      };
      default:
        return state
    }
  }