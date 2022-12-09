import { IPlaces } from "./PlaceModel";

export interface IUser {
    _id: number,
    name: string,
    email: string,
    password: string,
    imageUrl: string,
    places: IPlaces[]
}