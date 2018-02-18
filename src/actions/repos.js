import { createActions } from "redux-actions";

export const {
  fetchUserReposRequest,
  fetchUserReposSuccess,
  fetchUserReposFailure
} = createActions(
  "FETCH_USER_REPOS_REQUEST",
  "FETCH_USER_REPOS_SUCCESS",
  "FETCH_USER_REPOS_FAILURE"
);
