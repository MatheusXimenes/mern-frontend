import React, { FC } from "react";

import { IUser } from "../../models/UserModel";
import UserItem from "./UserItem";
import Card from "../UIElements/Card";

import "./UsersList.css";

type UserListProps = {
  users: IUser[];
};

const UsersList: FC<UserListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {users.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          image={user.imageUrl}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
