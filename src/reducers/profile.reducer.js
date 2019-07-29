import { userConstants } from '../constants/user.constants';

export function profile(state = {}, action) {
    switch (action.type) {
      case userConstants.PROFILE_REQUEST:
        return {
          };
      case userConstants.PROFILE_SUCCESS:
        return {
          fetched_profile: true,
          profile_id : action.id
        };
      case userConstants.PROFILE_FAILURE:
        return {error: action.error
      };
      default:
        return state
    }
  }