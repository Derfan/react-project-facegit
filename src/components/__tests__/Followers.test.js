import React from "react";
import { shallow } from "enzyme";
import { Followers } from "../Followers/Followers";

describe("Копмонент Followers", () => {
  it("должен быть лоадер/спинер, если isFetcing === true", () => {
    const fetchFollowersRequestMock = jest.fn();
    const wrapper = shallow(
      <Followers
        fetchFollowersRequest={fetchFollowersRequestMock}
        isFetching={true}
      />
    );
    const spinnerElement = wrapper.find("Spinner");
    expect(spinnerElement).toHaveLength(1);
  });

  it("Проверить что возвращаются компоненты Followers в том количестве, в котором передаются в props.followers.", () => {
    const fetchFollowersRequestMock = jest.fn();
    const followers = [{ id: 1 }, { id: 2 }];
    const wrapper = shallow(
      <Followers
        fetchFollowersRequest={fetchFollowersRequestMock}
        followers={followers}
        isFetched={true}
        isFetching={false}
      />
    );
    expect(wrapper.find("Follower")).toHaveLength(followers.length);
  });

  describe("методы", () => {
    it("должен быть метод componentDidMount", () => {
      const fetchFollowersRequestMock = jest.fn();
      const wrapper = shallow(
        <Followers fetchFollowersRequest={fetchFollowersRequestMock} />
      );
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });
  });
});
