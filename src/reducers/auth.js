import { Record } from "immutable";
import { handleActions } from "redux-actions";
import { authorize, logout } from "../actions/auth";

const AuthRecord = Record({
  isAuthorized: false
});

const initialState = new AuthRecord();

export default handleActions(
  {
    [authorize]: state => state.set("isAuthorized", true),
    [logout]: state => state.set("isAuthorized", false)
  },
  initialState
);

export const getIsAuthorized = state => state.auth.get("isAuthorized");
