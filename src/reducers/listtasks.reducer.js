import { userConstants } from '../constants/user.constants';

export function listtasks(state = {}, action) {
    switch (action.type) {
      case userConstants.TASK_LIST_REQUEST:
        return { tasklisting: true
          };
      case userConstants.TASK_LIST_SUCCESS:
        return {
          tasklisted: true,
          tasks : action.tasks
        };
      case userConstants.TASK_LIST_FAILURE:
        return {error: action.error
      };
      default:
        return state
    }
  }