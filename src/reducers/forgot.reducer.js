import { userConstants } from '../constants/user.constants';

export function forgot(state = {}, action) {
    switch (action.type) {
      case userConstants.FORGOT_PASSWORD_REQUEST:
        return { forget: true };
      case userConstants.FORGOT_PASSWORD_SUCCESS:
        return {forgotsent : true};
      case userConstants.FORGOT_PASSWORD_FAILURE:
        return {};
      default:
        return state
    }
  }