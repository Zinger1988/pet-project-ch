import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

export const apiGenerateToken = async (data: { roomId: string; userId: string }): Promise<string> => {
  const generateTokenFunction = httpsCallable(functions, 'generateToken');

  const result: any = await generateTokenFunction({
    channelName: data.roomId,
    uid: data.userId,
    expiryTime: 36000,
  });

  return result.data;
  //   try {

  //   } catch (err) {
  //     console.error("Error generating token:", err);
  //     //setError(err.message);
  //   }
};
