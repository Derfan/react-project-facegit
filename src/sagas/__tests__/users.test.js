import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchTokenOwnerRequest
} from "../../actions/users";
import { call, put } from "redux-saga/effects";
import { fetchUserSaga } from "../users";
import { getUserInformation, getTokenOwner } from "../../api";
import requestFlow from "../request";

describe("Saga users:", () => {
  it("call getTokenOwner", () => {
    const action = fetchTokenOwnerRequest();
    const saga = fetchUserSaga(action);
    expect(saga.next().value).toEqual(
      call(requestFlow, getTokenOwner, undefined)
    );
  });

  it("call getUserInformation", () => {
    const action = { payload: "test_login" };
    const saga = fetchUserSaga(action);
    expect(saga.next().value).toEqual(
      call(requestFlow, getUserInformation, "test_login")
    );
  });

  it("dispatch action fetchUserSuccess with user from call on success call", () => {
    const action = { payload: "test_login" };
    const user = { login: "test", id: "1" };
    const result = { data: user };
    const saga = fetchUserSaga(action);
    saga.next();
    expect(saga.next(result).value).toEqual(put(fetchUserSuccess(result.data)));
  });

  it("dispatch action fetchUserFailure with error from call on failure", () => {
    const action = { payload: "test_login" };
    const error = new Error("test error");
    const saga = fetchUserSaga(action);
    saga.next();
    expect(saga.throw(error).value).toEqual(put(fetchUserFailure(error)));
  });
});
