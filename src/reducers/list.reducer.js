import { userConstants } from '../constants/user.constants';

export function list(state = {}, action) {
    switch (action.type) {
      case userConstants.LIST_REQUEST:
        return { listing: true };
      case userConstants.LIST_SUCCESS:
        return {
          listed: true,
          usernames : action.usernames
        };
      case userConstants.LIST_FAILURE:
        return {
          error : action.error
        };
      default:
        return state
    }
  }