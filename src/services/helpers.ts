import { getDoc } from 'firebase/firestore';

import { User, Room } from '../types/global';
import { RoomDTO } from './types';

export const convertRoomData = async ({
  room,
  isDetailed = false,
}: {
  room: RoomDTO;
  isDetailed?: boolean;
}): Promise<Room> => {
  const { id, createdBy, moderator, members, ...roomRest } = room;
  const [createdBySnap, moderatorSnap] = await Promise.all([getDoc(room.createdBy), getDoc(room.moderator)]);

  const membersSnap = await Promise.all(members.map((member) => getDoc(member.user)));
  const visibleMembers = isDetailed ? membersSnap.slice(0, 4) : membersSnap;

  return {
    ...roomRest,
    id,
    createdBy: {
      id: createdBySnap.id,
      ...(createdBySnap.data() as Omit<User, 'id'>),
    },
    moderator: {
      id: moderatorSnap.id,
      ...(createdBySnap.data() as Omit<User, 'id'>),
    },
    members: members.map((member, i) => ({
      ...(visibleMembers[i].data() as Omit<User, 'id'>),
      role: member.role,
      id: visibleMembers[i].id,
    })),
  };
};
