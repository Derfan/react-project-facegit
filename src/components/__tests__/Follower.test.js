import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import Follower from "../Follower/Follower";
import { shallow, mount } from "enzyme";

describe("Компонент Follower", () => {
  it("Проверить наличие аватара", () => {
    const wrapper = shallow(<Follower follower={{}} />);
    expect(wrapper.find("img.follower__avatar")).toHaveLength(1);
  });

  it("Проверить наличие login пользователя переданного через props", () => {
    const login = "User123";
    const wrapper = mount(
      <MemoryRouter>
        <Follower follower={{ login }} />
      </MemoryRouter>
    );
    expect(wrapper.find("Follower").prop("follower").login).toBe(login);
  });

  it("Проверить что ссылка с логина пользователя ведет на /user/{user.login}", () => {
    const login = "User123";
    const wrapper = mount(
      <MemoryRouter>
        <Follower follower={{ login }} />
      </MemoryRouter>
    );
    const findLinks = wrapper.findWhere(el => {
      return el.type() === Link && el.prop("to") === `/user/${login}`;
    });
    expect(findLinks).toHaveLength(1);
  });
});
