import { Types } from '../constants/actionTypes';

export const ActionCreators = {

  login: (user) => ({ type: Types.LOGIN, payload: { user } }),

  updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user } }),

  formSubmittionStatus: (status) => ({ type: Types.FORM_SUBMITION_STATUS, payload: { status }}),
}
