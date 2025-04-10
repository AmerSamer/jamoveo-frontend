/**
 * Firebase Authentication Helpers
 *
 * Provides simple wrapper functions for:
 * - User signup (email & password)
 * - User login (email & password)
 * - User logout
 *
 * Uses Firebase Auth SDK and the configured auth instance from firebaseConfig.js.
 */
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

/**
 * signUp
 * Creates a new user account using email and password.
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<UserCredential>} Firebase UserCredential object
 */
export const signUp = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

/**
 * signIn
 * Signs in an existing user using email and password.
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<UserCredential>} Firebase UserCredential object
 */
export const signIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

/**
 * logOut
 * Signs out the currently logged-in user.
 * 
 * @returns {Promise<void>}
 */
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
