import {
  fetchFollowersRequest,
  fetchFollowersSuccess,
  fetchFollowersFailure
} from "../../actions/followers";
import followersReducer from "../followers";

describe("Редьюсер followers", () => {
  describe("поле ids", () => {
    it("очищают поле ids, если приходит экшен fetchFollowersRequest", () => {
      const followers = [{ id: 1, login: "User123" }];
      const nextState = followersReducer(
        { ids: followers },
        fetchFollowersRequest()
      );
      expect(nextState.ids).toEqual([]);
    });
    it("наполняют данными ids, если приходит экшен fetchFollowersSuccess", () => {
      const followers = [{ id: 1, login: "User123" }];
      const nextState = followersReducer(
        { id: [] },
        fetchFollowersSuccess(followers)
      );
      expect(nextState.ids).toEqual(followers);
    });
  });

  describe("поле error", () => {
    it("очищают поле error, если приходит экшен fetchFollowersRequest,", () => {
      const nextState = followersReducer(
        { error: "Some error" },
        fetchFollowersRequest()
      );
      expect(nextState.error).toEqual(null);
    });
    it("очищают поле error, если приходит экшен fetchFollowersSuccess,", () => {
      const nextState = followersReducer(
        { error: "Some error" },
        fetchFollowersSuccess()
      );
      expect(nextState.error).toEqual(null);
    });
    it("наполняют данными error, если приходит экшен fetchFollowersFailure,", () => {
      const error = new Error("New error");
      const nextState = followersReducer(
        { error: null },
        fetchFollowersFailure(error)
      );
      expect(nextState.error).toEqual(error);
    });
  });

  describe("флаг isFetching", () => {
    it("если приходит экшен fetchFollowersRequest, isFetching = true", () => {
      const nextState = followersReducer(
        {
          isFetching: false
        },
        fetchFollowersRequest()
      );
      expect(nextState.isFetching).toEqual(true);
    });

    it("если приходит экшен fetchFollowersSuccess, isFetching = false", () => {
      const nextState = followersReducer(
        {
          isFetching: true
        },
        fetchFollowersSuccess()
      );
      expect(nextState.isFetching).toEqual(false);
    });

    it("если приходит экшен fetchFollowersFailure, isFetching = false", () => {
      const nextState = followersReducer(
        {
          isFetching: true
        },
        fetchFollowersFailure()
      );
      expect(nextState.isFetching).toEqual(false);
    });
  });

  describe("флаг isFetched", () => {
    it("если приходит экшен fetchFollowersRequest, isFetched = false", () => {
      const nextState = followersReducer(
        {
          isFetched: true
        },
        fetchFollowersRequest()
      );
      expect(nextState.isFetched).toEqual(false);
    });

    it("если приходит экшен fetchFollowersSuccess, isFetched = true", () => {
      const nextState = followersReducer(
        {
          isFetched: false
        },
        fetchFollowersSuccess()
      );
      expect(nextState.isFetched).toEqual(true);
    });

    it("если приходит экшен fetchFollowersFailure, isFetched = true", () => {
      const nextState = followersReducer(
        {
          isFetched: false
        },
        fetchFollowersFailure()
      );
      expect(nextState.isFetched).toEqual(true);
    });
  });
});
