import { userConstants } from "../constants/user.constants";

export function profilepie(state = {}, action) {
  switch (action.type) {
    case userConstants.PROFILE_PIE_TASK_REQUEST:
      return {};
    case userConstants.PROFILE_PIE_TASK_SUCCESS:
      return {
        gotprofilepiedata: true,
        profilepiedata: action.data
      };
    case userConstants.PROFILE_PIE_TASK_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
