import { call, put, select } from "redux-saga/effects";

import requestSaga from "../request";
import { fetchFollowersSuccess } from "../../actions/followers";
import { getIsNetworkErrorPresent } from "../../reducers/network";
import { clearNetworkErrors, networkError } from "../../actions/network";
import { logout } from "../../actions/auth";

describe("Сага request", () => {
  const followers = [{ id: 1, name: "Bob" }];
  const saga = requestSaga(fetchFollowersSuccess, followers);

  describe("Сценарий кода когда нет ошибок", () => {
    it("1. Эффект call(fn, args)", () => {
      expect(saga.next().value).toEqual(call(fetchFollowersSuccess, followers));
    });

    it("2. Эффект select getIsNetworkErrorPresent", () => {
      expect(saga.next().value).toEqual(select(getIsNetworkErrorPresent));
    });

    it("3. Эффект put clearNetworkErrors", () => {
      expect(saga.next(true).value).toEqual(put(clearNetworkErrors()));
    });
  });

  describe("Сценарий кода когда ошибка происходит", () => {
    it("1. Эффект put networkError", () => {
      const error = { response: { status: 401 } };
      expect(saga.throw(error).value).toEqual(put(networkError(error)));
    });

    it("2. Эффект put logout", () => {
      expect(saga.next().value).toEqual(put(logout()));
    });
  });
});
