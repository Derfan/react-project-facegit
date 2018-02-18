import React from "react";
import { shallow } from "enzyme";
import { UserPage } from "../UserPage/UserPage";

describe("Компонент UserPage", () => {
  it("Должен быть лоадер если props.isFetching === true", () => {
    const match = { params: { name: "User123" } };
    const fetchUserRequestMock = jest.fn();
    const wrapper = shallow(
      <UserPage
        match={match}
        fetchUserRequest={fetchUserRequestMock}
        isFetching={true}
      />
    );
    const spinnerElement = wrapper.find("Spinner");
    expect(spinnerElement).toHaveLength(1);
  });

  it("Должно быть сообщение об отсутствии пользователя если isFetching === false && user == null", () => {
    const match = { params: { name: "User123" } };
    const fetchUserRequestMock = jest.fn();
    const wrapper = shallow(
      <UserPage
        match={match}
        fetchUserRequest={fetchUserRequestMock}
        isFetching={false}
        user={null}
      />
    );
    const errorElement = wrapper.find(".error");
    expect(errorElement).toHaveLength(1);
  });

  describe("Методы", () => {
    const match = { params: { name: "User123" } };
    const fetchUserRequestMock = jest.fn();
    const wrapper = shallow(
      <UserPage match={match} fetchUserRequest={fetchUserRequestMock} />
    );

    it("Должен присутствовать метод componentDidMount", () => {
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });

    it("Должен присутствовать метод componentWillReceiveProps", () => {
      expect(wrapper.instance().componentWillReceiveProps).toBeDefined();
    });
  });

  describe("render", () => {
    const match = { params: { name: "User123" } };
    const fetchUserRequestMock = jest.fn();
    const restProps = {
      isFetching: false,
      isFetched: true,
      user: {}
    };
    const wrapper = shallow(
      <UserPage
        match={match}
        fetchUserRequest={fetchUserRequestMock}
        {...restProps}
      />
    );

    it("Должен присутствовать аватар пользователя", () => {
      const avatarElement = wrapper.find("div.user-card__avatar img");
      expect(avatarElement).toHaveLength(1);
    });

    it("Должен присутствовать login пользователя", () => {
      const loginElement = wrapper.find("span.user-card__login");
      expect(loginElement).toHaveLength(1);
    });

    it("Должна присутствовать информация о количестве фаловеров пользователя", () => {
      const loginElement = wrapper.find("span.user-card__followers");
      expect(loginElement).toHaveLength(1);
    });

    it("Должен присутствовать компонент Followers", () => {
      expect(wrapper.find("Connect(Followers)")).toHaveLength(1);
    });

    it("У компонента Followers должен быть атрибут login, с передачей значения через props login", () => {
      const randomId = Math.random()
        .toString()
        .slice(2, 6);
      const login = "user" + randomId;
      wrapper.setProps({ user: { login } });
      const loginProp = wrapper.find("Connect(Followers)").prop("login");
      expect(loginProp).toBe(login);
    });
  });
});
