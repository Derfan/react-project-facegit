import { handleActions } from "redux-actions";
import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../actions/followers";
import { logout } from "../actions/auth";

const initialState = {
  ids: [],
  error: null,
  isFetched: false,
  isFetching: false
};

export default handleActions(
  {
    [fetchFollowersRequest]: (state, action) => ({
      ...state,
      isFetching: true,
      isFetched: false,
      ids: [],
      error: null
    }),

    [fetchFollowersSuccess]: (state, action) => ({
      ...state,
      ids: action.payload,
      isFetched: true,
      isFetching: false,
      error: null
    }),

    [fetchFollowersFailure]: (state, action) => ({
      ...state,
      error: action.payload,
      isFetched: true,
      isFetching: false
    }),

    [logout]: state => ({
      ...state,
      ...initialState
    })
  },
  initialState
);

export const getIds = state => state.followers.ids;
export const getIsFetched = state => state.followers.isFetched;
export const getIsFetching = state => state.followers.isFetching;
export const getError = state => state.followers.error;
