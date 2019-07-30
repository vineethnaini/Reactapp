import { userConstants } from "../constants/user.constants";

export function profiletasks(state = {}, action) {
  switch (action.type) {
    case userConstants.PROFILE_TASK_REQUEST:
      return {};
    case userConstants.PROFILE_TASK_SUCCESS:
      return {
        gotprofiletask: true,
        tasks: action.tasks
      };
    case userConstants.PROFILE_TASK_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
