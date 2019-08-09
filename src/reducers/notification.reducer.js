import { userConstants } from "../constants/user.constants";
const initialState = {
    notifications:[]
}
export function notification(state = initialState, action) {
  switch (action.type) {
    case userConstants.NOTIFICATION_REQUEST:
      return {};
    case userConstants.NOTIFICATION_SUCCESS:
      return {
          ...state,
        notifications: [...state.notifications,(action.data)]
      };
    case userConstants.NOTIFICATION_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
