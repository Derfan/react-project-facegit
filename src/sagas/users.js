import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  fetchTokenOwnerRequest
} from "../actions/users";
import { getUserInformation, getTokenOwner } from "../api";
import requestFlow from "./request";

export function* fetchUserSaga(action) {
  try {
    let response;
    if (fetchTokenOwnerRequest.toString() === action.type) {
      response = yield call(requestFlow, getTokenOwner, action.payload);
    } else {
      response = yield call(requestFlow, getUserInformation, action.payload);
    }
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest([fetchUserRequest, fetchTokenOwnerRequest], fetchUserSaga);
}
