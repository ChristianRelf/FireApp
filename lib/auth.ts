import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isDemoMode } from './firebase';
import { User } from '@/types';

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Demo user for when Firebase is not configured
const createDemoUser = (email: string, displayName?: string): User => ({
  id: 'demo-user-' + Math.random().toString(36).substr(2, 9),
  email,
  displayName: displayName || email.split('@')[0],
  photoURL: '',
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Convert Firebase User to our User type
export const convertFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  if (isDemoMode || !db) {
    return createDemoUser(firebaseUser.email!, firebaseUser.displayName || undefined);
  }

  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  const userData = userDoc.data();

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email!,
    displayName: firebaseUser.displayName || userData?.displayName || '',
    photoURL: firebaseUser.photoURL || userData?.photoURL || '',
    createdAt: userData?.createdAt?.toDate() || new Date(),
    updatedAt: userData?.updatedAt?.toDate() || new Date(),
  };
};

// Save user to Firestore
export const saveUserToFirestore = async (firebaseUser: FirebaseUser) => {
  if (isDemoMode || !db) {
    console.log('Demo mode: Skipping Firestore user save');
    return;
  }

  const userRef = doc(db, 'users', firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await setDoc(userRef, {
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || userSnap.data().displayName,
      photoURL: firebaseUser.photoURL || userSnap.data().photoURL,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }
};

// Demo mode authentication functions
const demoSignIn = async (email: string, password: string) => {
  // Simulate authentication delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (password.length < 6) {
    throw new Error('Password should be at least 6 characters');
  }
  
  return createDemoUser(email);
};

const demoSignUp = async (email: string, password: string, displayName?: string) => {
  // Simulate authentication delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (password.length < 6) {
    throw new Error('Password should be at least 6 characters');
  }
  
  return createDemoUser(email, displayName);
};

// Authentication functions
export const signInWithEmail = async (email: string, password: string) => {
  if (isDemoMode || !auth) {
    const user = await demoSignIn(email, password);
    // Store demo user in localStorage for persistence
    localStorage.setItem('demoUser', JSON.stringify(user));
    return { user };
  }

  const result = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(result.user);
  return result;
};

export const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
  if (isDemoMode || !auth) {
    const user = await demoSignUp(email, password, displayName);
    // Store demo user in localStorage for persistence
    localStorage.setItem('demoUser', JSON.stringify(user));
    return { user };
  }

  const result = await createUserWithEmailAndPassword(auth, email, password);
  
  if (displayName) {
    await updateProfile(result.user, { displayName });
  }
  
  await saveUserToFirestore(result.user);
  return result;
};

export const signInWithGoogle = async () => {
  if (isDemoMode || !auth) {
    const user = createDemoUser('demo@google.com', 'Demo Google User');
    localStorage.setItem('demoUser', JSON.stringify(user));
    return { user };
  }

  const result = await signInWithPopup(auth, googleProvider);
  await saveUserToFirestore(result.user);
  return result;
};

export const signInWithGithub = async () => {
  if (isDemoMode || !auth) {
    const user = createDemoUser('demo@github.com', 'Demo GitHub User');
    localStorage.setItem('demoUser', JSON.stringify(user));
    return { user };
  }

  const result = await signInWithPopup(auth, githubProvider);
  await saveUserToFirestore(result.user);
  return result;
};

export const logout = async () => {
  if (isDemoMode || !auth) {
    localStorage.removeItem('demoUser');
    return;
  }

  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  if (isDemoMode || !auth) {
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Demo mode: Password reset email would be sent to', email);
    return;
  }

  await sendPasswordResetEmail(auth, email);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (isDemoMode || !auth) {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      const user = JSON.parse(demoUser);
      // Convert date strings back to Date objects
      user.createdAt = new Date(user.createdAt);
      user.updatedAt = new Date(user.updatedAt);
      callback(user);
    } else {
      callback(null);
    }
    
    // Return a no-op unsubscribe function
    return () => {};
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await convertFirebaseUser(firebaseUser);
      callback(user);
    } else {
      callback(null);
    }
  });
};