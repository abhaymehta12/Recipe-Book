import { Types } from '../constants/actionTypes';

const initialState = {
  profile: {
    name: '',
    telephone: '',
    email: '',
    username: '',
    password: '',
    loggedin: false,
    recipeList: [],
    subscribenewsletter: false
  },
  formSubmitted: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false,
      }
    case Types.UPDATE_USER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false
      }
    case Types.FORM_SUBMITION_STATUS:
      return {
        ...state,
        formSubmitted: action.payload.status
      }
    default:
      return state;
  }
}
export default reducer;
