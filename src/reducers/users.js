import { handleActions } from "redux-actions";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from "../actions/users";
import { logout } from "../actions/auth";

const initialState = {
  data: null,
  error: null,
  isFetched: false,
  isFetching: false
};

export default handleActions(
  {
    [fetchUserRequest]: (state, action) => ({
      ...state,
      isFetching: true,
      isFetched: false,
      data: null,
      error: null
    }),

    [fetchUserSuccess]: (state, action) => ({
      ...state,
      isFetched: true,
      isFetching: false,
      data: action.payload,
      error: null
    }),

    [fetchUserFailure]: (state, action) => ({
      ...state,
      error: action.payload,
      isFetching: false,
      isFetched: true
    }),

    [logout]: state => ({
      ...state,
      ...initialState
    })
  },
  initialState
);

export const getData = state => state.users.data;
export const getIsFetched = state => state.users.isFetched;
export const getIsFetching = state => state.users.isFetching;
export const getError = state => state.users.error;
