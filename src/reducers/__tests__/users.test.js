import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from "../../actions/users";
import usersReducer from "../users";

describe("Редьюсер users", () => {
  describe("поле data", () => {
    it("экшен с типом fetchUserSuccess записывает action.payload в data", () => {
      const user = { id: 1, login: "bob" };
      const nextState = usersReducer({ data: null }, fetchUserSuccess(user));
      expect(nextState.data).toEqual(user);
    });

    it("очищает поле data, если приходит экшен fetchUserRequest", () => {
      const user = { someKey: "some value" };
      const nextState = usersReducer({ data: user }, fetchUserRequest());
      expect(nextState.data).toEqual(null);
    });
  });

  describe("поле error", () => {
    it("наполняет данными error, если приходит экшен fetchUserFailure", () => {
      const error = new Error("error msg");
      const nextState = usersReducer({ error: null }, fetchUserFailure(error));
      expect(nextState.error).toEqual(error);
    });

    it("очищает поле error, если приходит экшен fetchUserRequest", () => {
      const nextState = usersReducer(
        { error: "Some error" },
        fetchUserRequest()
      );
      expect(nextState.error).toEqual(null);
    });

    it("очищает поле error, если приходит экшен fetchUserSuccess", () => {
      const nextState = usersReducer(
        { error: "Some error" },
        fetchUserSuccess()
      );
      expect(nextState.error).toEqual(null);
    });
  });

  describe("флаг isFetched", () => {
    it("если приходит экшен fetchUserRequest, isFetched = false", () => {
      const nextState = usersReducer(
        {
          isFetched: true
        },
        fetchUserRequest()
      );
      expect(nextState.isFetched).toEqual(false);
    });

    it("если приходит экшен fetchUserSuccess, isFetched = true", () => {
      const nextState = usersReducer(
        {
          isFetched: false
        },
        fetchUserSuccess()
      );
      expect(nextState.isFetched).toEqual(true);
    });

    it("если приходит экшен fetchUserFailure, isFetched = true", () => {
      const nextState = usersReducer(
        {
          isFetched: false
        },
        fetchUserFailure()
      );
      expect(nextState.isFetched).toEqual(true);
    });
  });

  describe("флаг isFetching", () => {
    it("если приходит экшен fetchUserRequest, isFetching = true", () => {
      const nextState = usersReducer(
        {
          isFetching: false
        },
        fetchUserRequest()
      );
      expect(nextState.isFetching).toEqual(true);
    });

    it("если приходит экшен fetchUserSuccess, isFetching = false", () => {
      const nextState = usersReducer(
        {
          isFetching: true
        },
        fetchUserSuccess()
      );
      expect(nextState.isFetching).toEqual(false);
    });

    it("если приходит экшен fetchUserFailure, isFetching = false", () => {
      const nextState = usersReducer(
        {
          isFetching: true
        },
        fetchUserFailure()
      );
      expect(nextState.isFetching).toEqual(false);
    });
  });
});
