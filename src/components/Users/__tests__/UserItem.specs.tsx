import React, { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter as BRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import UserItem from "../UserItem";

const userItemProps = {
  id: 1,
  image:
    "https://images.pexels.com/photos/6530613/pexels-photo-6530613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  name: "John Doe",
  placeCount: 3,
};

describe("UserItem Component", () => {
  describe("Rendering Elements", () => {
    it("Should has one h2 element", () => {
      render(
        <BRouter>
          <Route>
            <UserItem
              id={userItemProps.id}
              image={userItemProps.image}
              name={userItemProps.name}
              placeCount={userItemProps.placeCount}
            />
          </Route>
        </BRouter>
      );
      const headingEl = screen.getByRole("heading", {
        level: 2,
        name: userItemProps.name,
      });
      expect(headingEl).toBeInTheDocument();
    });

    it("Should has one h3 element", () => {
      render(
        <BRouter>
          <Route>
            <UserItem
              id={userItemProps.id}
              image={userItemProps.image}
              name={userItemProps.name}
              placeCount={userItemProps.placeCount}
            />
          </Route>
        </BRouter>
      );
      const headingEl = screen.getByRole("heading", {
        level: 3,
        name: `${userItemProps.placeCount} Places`,
      });
      expect(headingEl).toBeInTheDocument();
    });

    it("Should have one link", () => {
      render(
        <BRouter>
          <Route>
            <UserItem
              id={userItemProps.id}
              image={userItemProps.image}
              name={userItemProps.name}
              placeCount={userItemProps.placeCount}
            />
          </Route>
        </BRouter>
      );
      const linkEl = screen.getByRole("link");
      expect(linkEl).toBeInTheDocument();
    });
  });

  describe("Features", () => {
    it("Clicking on Link, should navigate to Places Page", async () => {
      const history = createMemoryHistory();
      history.push = jest.fn();

      render(
        <Router history={history}>
          <UserItem
            id={userItemProps.id}
            image={userItemProps.image}
            name={userItemProps.name}
            placeCount={userItemProps.placeCount}
          />
        </Router>
      );
      const linkEl = screen.getByRole("link");
      fireEvent.click(linkEl);

      expect(history.push).toHaveBeenCalledWith(`/${userItemProps.id}/places`);
    });
  });

  describe("Snapshot", () => {
    it("Default Variant", () => {
      const tree = renderer.create(
        <BRouter>
          <Route>
            <UserItem
              id={userItemProps.id}
              image={userItemProps.image}
              name={userItemProps.name}
              placeCount={userItemProps.placeCount}
            />
          </Route>
        </BRouter>
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
