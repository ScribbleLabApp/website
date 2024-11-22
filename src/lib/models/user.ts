import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const saveUserToFirestore = async (
  userId: string,
  data: { email: string; username?: string; profileImage?: string }
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, data, { merge: true });
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getUserFromFirestore = async (userId: string): Promise<any> => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn('No such user found!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
