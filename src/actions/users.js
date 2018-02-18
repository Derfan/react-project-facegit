import { createActions } from "redux-actions";

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} = createActions(
  "FETCH_USER_REQUEST",
  "FETCH_USER_SUCCESS",
  "FETCH_USER_FAILURE"
);

export const { fetchTokenOwnerRequest } = createActions(
  "FETCH_TOKEN_OWNER_REQUEST"
);
