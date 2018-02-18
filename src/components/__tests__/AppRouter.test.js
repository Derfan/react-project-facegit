import React from "react";
import { shallow } from "enzyme";

import { Switch, Route, Redirect } from "react-router-dom";
import { AppRouter } from "../AppRouter/AppRouter";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

describe("Компонент AppRouter", () => {
  const wrapper = shallow(<AppRouter />);

  it("Должен присутствовать компонент Switch", () => {
    expect(wrapper.find(Switch)).toHaveLength(1);
  });

  it("Должен присутствовать как минимум один компонент PrivateRoute", () => {
    expect(wrapper.find(PrivateRoute).length).toBeGreaterThanOrEqual(1);
  });

  it('У компонента PrivateRoute должен быть атрибут path со значением "/user/:name"', () => {
    const findRoute = wrapper.findWhere(
      el => el.type() === PrivateRoute && el.prop("path") === "/user/:name"
    );
    expect(findRoute).toHaveLength(1);
  });

  it('У компонента PrivateRoute должен быть атрибут path со значением "/user/me"', () => {
    const findRoute = wrapper.findWhere(
      el => el.type() === PrivateRoute && el.prop("path") === "/user/me"
    );
    expect(findRoute).toHaveLength(1);
  });

  it("Должен присутствовать компонент Route", () => {
    expect(wrapper.find(Route)).not.toHaveLength(0);
  });

  it('У компонента Route должен быть атрибут path со значением "/login"', () => {
    const findRoutes = wrapper.findWhere(
      el => el.type() === Route && el.prop("path") === "/login"
    );
    expect(findRoutes).toHaveLength(1);
  });

  it("Должен быть редирект на /user/me", () => {
    const findRedirects = wrapper.findWhere(
      el => el.type() === Redirect && el.prop("to") === "/user/me"
    );
    expect(findRedirects).toHaveLength(1);
  });

  it("Выводить кнопку logout если props.isAuthorized === true", () => {
    wrapper.setProps({ isAuthorized: true });
    expect(wrapper.find("button.logout-button")).toHaveLength(1);
  });

  it("Выводить сетевую ошибку networkError, если она передается через props.networkError", () => {
    wrapper.setProps({ networkError: "Some network error" });
    expect(wrapper.find(".error")).toHaveLength(1);
  });
});
