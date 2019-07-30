import { userConstants } from "../constants/user.constants";

export function createtask(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATE_TASK_REQUEST:
      return { creatingtask: true };
    case userConstants.CREATE_TASK_SUCCESS:
      return {};
    case userConstants.CREATE_TASK_FAILURE:
      return {};
    default:
      return state;
  }
}
