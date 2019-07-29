import { userConstants } from '../constants/user.constants';

export function dashboardtask(state = {}, action) {
    switch (action.type) {
      case userConstants.DASHBOARD_TASK_REQUEST:
        return {
          };
      case userConstants.DASHBOARD_TASK_SUCCESS:
        return {
          gottask: true,
          tasks : action.tasks
        };
      case userConstants.DASHBOARD_TASK_FAILURE:
        return {error: action.error
      };
      default:
        return state
    }
  }