import React, {
  render,
  screen,
  fireEvent,
  getByRole,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter as BRouter, Router, Route } from "react-router-dom";
import UsersList from "../UsersList";

const MockData = [
  {
    _id: 1,
    name: "Matheus",
    email: "mattximca@gmail.com",
    password: "dfjhgaslkfjhs",
    imageUrl: "Url",
    places: [],
  },
];

describe("UserList Component", () => {
  describe("Rendering", () => {
    it("No Users Found Warning", () => {
      render(<UsersList users={[]} />);
      screen.getByRole("heading", { level: 2, name: "No users found." });
    });

    it("List of UserItems", () => {
      render(
        <BRouter>
          <Route>
            <UsersList users={MockData} />
          </Route>
        </BRouter>
      );
      const linkEl = screen.getAllByRole("link");
      expect(linkEl.length).toBe(1);
    });
  });

  describe("ScreenShot", () => {
    it("No Users Found Warning", () => {
      const tree = renderer.create(<UsersList users={[]} />);
      expect(tree).toMatchSnapshot();
    });

    it("List of UserItems", () => {
      const tree = renderer.create(
        <BRouter>
          <Route>
            <UsersList users={MockData} />
          </Route>
        </BRouter>
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
