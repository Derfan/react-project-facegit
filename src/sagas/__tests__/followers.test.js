import { call, put } from "redux-saga/effects";
import {
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../../actions/followers";
import { fetchFollowersSaga } from "../followers";
import { getUserFollowers } from "../../api";

describe("Сага followers", () => {
  it("проверка наличия вызова getUserFollowers с правильными аргументами", () => {
    const login = "user123";
    const action = { payload: login };
    const saga = fetchFollowersSaga(action);
    expect(saga.next().value).toEqual(call(getUserFollowers, login));
  });

  it("если нет ошибок, должен отправляться экшен fetchUserSuccess с followers", () => {
    const action = { payload: "user456" };
    const saga = fetchFollowersSaga(action);
    saga.next();
    const followers = [{ id: 1, name: "Bob" }];
    const result = { data: followers };
    expect(saga.next(result).value).toEqual(
      put(fetchFollowersSuccess(result.data))
    );
  });

  it("если произошла ошибка, должен отправляться экшен fetchUserFailure с ошибкой", () => {
    const action = { payload: "user789" };
    const error = new Error("test error");
    const saga = fetchFollowersSaga(action);
    saga.next();
    expect(saga.throw(error).value).toEqual(put(fetchFollowersFailure(error)));
  });
});
