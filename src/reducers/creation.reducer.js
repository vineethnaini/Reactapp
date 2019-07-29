import { userConstants } from '../constants/user.constants';

export function creation(state = {}, action) {
    switch (action.type) {
      case userConstants.CREATE_REQUEST:
        return { creating: true };
      case userConstants.CREATE_SUCCESS:
        return {};
      case userConstants.CREATE_FAILURE:
        return {};
      default:
        return state
    }
  }