import React from "react";
import Card from "../UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../FormElements/Button";
import "./PlaceList.css";
import { IPlaces } from "../../models/PlaceModel";

const PlaceList = ({ places }: { places: IPlaces[] }) => {
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {places.map((place: IPlaces) => (
        <PlaceItem
          key={place._id}
          _id={place._id}
          imageUrl={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          location={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
