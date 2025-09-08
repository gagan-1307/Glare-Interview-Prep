'use server'

import { db,auth } from "@/firebase/admin";
import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { tr } from "zod/v4/locales";

export async function signUp(params: SignUpParams){
    const {uid, name, email} = params;

    try {
        const user = await db.collection('users').doc(uid).get();

        if(user.exists){
            return {
                success: false,
                message: 'User already exists. Please sign in instead.',
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email
        });

        return{
            success: true,
            message: 'User created successfully',
        }

    } catch (error: any) {
        console.error("Error creating user:", error);
        if (error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already in use',
            }
        }
        return {
            success: false,
            message: error?.message ? `failed to create an account: ${error.message}` : 'failed to create an account',
            error: error,
        }
    }
}

export async function signIn(params: SignInParams){
    const {email,idToken} = params;
    try{
        const user = await auth.getUserByEmail(email);
        if(!user){
            return {
                success: false,
                message: 'User does not exist. Please sign up first.',
            }
        }

        await setSessionCookie(idToken);
    }
    catch(error){
        console.error("Error signing in user:", error);
        return {
            success: false,
            message: 'failed to sign in',
        }
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const expiresIn = 60 * 60 * 24 * 7 ; 
    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn: expiresIn*1000});
    cookieStore.set("session", sessionCookie, {httpOnly: true, maxAge: expiresIn, secure: process.env.NODE_ENV === 'production', path: '/', sameSite: 'lax'});
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userDoc = await db.collection('users').doc(decodedClaims.uid).get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            return {
                id: userDoc.id,
                name: userData?.name || '',
                email: userData?.email || '',
            } as User;
        }
        return null;
    } catch (e) {
        console.error("Error getting current user:", e);
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return user !== null;
}