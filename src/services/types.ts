import { DocumentReference } from "firebase/firestore";
import { Room } from "../types/global";

export type RoomDTO = Room & {
  moderator: DocumentReference;
  createdBy: DocumentReference;
};
