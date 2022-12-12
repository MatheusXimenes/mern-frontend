import React, { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserItem from "../UserItem";

const userItemProps = {
  id: 1,
  image:
    "https://images.pexels.com/photos/6530613/pexels-photo-6530613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  name: "John Doe",
  placeCount: 3,
};

describe("<UserItem/> Component", () => {
  describe("Render", () => {
    it("Should render Link Element", () => {
      render(
        <Router>
          <Route>
            <UserItem
              id={userItemProps.id}
              image={userItemProps.image}
              name={userItemProps.name}
              placeCount={userItemProps.placeCount}
            />
          </Route>
        </Router>
      );
      const link = screen.getByRole("link");
      expect(link).not.toBeNull();
    });
  });

  describe("Snapshot", () => {
    it("Default Variant", () => {
      const tree = renderer.create(
        <Router>
          <Route>
            <UserItem
              id={userItemProps.id}
              image={userItemProps.image}
              name={userItemProps.name}
              placeCount={userItemProps.placeCount}
            />
          </Route>
        </Router>
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
