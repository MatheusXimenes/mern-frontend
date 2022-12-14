import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../UIElements/Avatar";
import Card from "../UIElements/Card";
import "./UserItem.css";

type userItemProps = {
  id: number;
  image: string;
  name: string;
  placeCount: number;
};

const UserItem = (props: userItemProps) => {
  return (
    <li className="user-item" data-testid={props.id}>
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
