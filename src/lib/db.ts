import { collection, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { ProjectProfileData } from '../types/project';

export const saveProjectProfile = async (userId: string, data: Partial<ProjectProfileData>, profileId?: string) => {
  const userProfilesRef = collection(db, 'users', userId, 'projectProfiles');
  
  if (profileId) {
    const docRef = doc(userProfilesRef, profileId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return profileId;
  } else {
    const newDocRef = doc(userProfilesRef);
    await setDoc(newDocRef, {
      ...data,
      id: newDocRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'draft'
    });
    return newDocRef.id;
  }
};
