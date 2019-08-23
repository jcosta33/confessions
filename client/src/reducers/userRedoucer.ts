import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from "../actions/types";

const initialState: any = {
  users: [],
  loading: false
}

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user: any) =>
          user._id !== action.payload
        )
      }
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      }
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
};