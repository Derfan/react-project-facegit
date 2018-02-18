import { clearNetworkErrors, networkError } from "../../actions/network";
import networkReducer from "../network";

describe("Редьюсер network", () => {
  describe("поле error", () => {
    it("очищают поле error, если приходит экшен clearNetworkErrors", () => {
      const error = { response: { data: { message: "My error msg" } } };
      const nextState = networkReducer({ error }, clearNetworkErrors());
      expect(nextState.error).toEqual(null);
    });

    it("наполняют данными error, если приходит экшен networkError", () => {
      const error = { response: { data: { message: "My error msg" } } };
      const nextState = networkReducer(
        { error: null, message: null },
        networkError(error)
      );
      expect(nextState.error).toEqual(error);
    });
  });

  describe("поле message", () => {
    it("очищают поле message, если приходит экшен clearNetworkErrors", () => {
      const nextState = networkReducer(
        { message: "Some error message" },
        clearNetworkErrors()
      );
      expect(nextState.message).toEqual(null);
    });

    it("наполняют данными message, если приходит экшен networkError", () => {
      const msg = "My error msg";
      const error = { response: { data: { message: msg } } };
      const nextState = networkReducer(
        { error: null, message: null },
        networkError(error)
      );
      expect(nextState.message).toEqual(msg);
    });
  });
});
