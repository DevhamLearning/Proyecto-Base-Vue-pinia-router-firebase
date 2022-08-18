import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import router from "../router";
import { useDatabaseStore } from './database'

export const useUserStore = defineStore("user", {
    state: () => ({
        userData: "bluuweb@test.com",
        loadingUser: false,
        loadingSession: false,
    }),
    getters: {
        userMayuscula(state) {
            return state.userData.toUpperCase();
        },
        userMinuscula(state) {
            return state.userData.toLowerCase();
        },
    },
    actions: {
        registerUser(name) {
            this.userData = name;
        },
        async registroUsuario(email, password) {
            this.loadingUser = true;
            try { 
                const { user } = await createUserWithEmailAndPassword(
                    auth, 
                    email, 
                    password
                );
                this.userData = {email: user.email, uid: user.uid};
                console.log(user);
                router.push("/");
            } catch (error) {
                console.log(error);   
            }
            finally {
                this.loadingUser = false;
            }
        },
        async LoginUsuario(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                this.userData = { email: user.email, uid: user.uid };
                console.log("log user.js-LoginUsuario: ", this.userData);
                router.push("/");
            } catch (error) {
                console.log(error);  
            }
            finally{
                this.loadingUser = false;
            }
        },
        async logoutUsuario() {
            this.loadingUser = true;
            const databaseStore = useDatabaseStore()
            databaseStore.$reset();
             try {
                await signOut(auth);
                this.userData = null;

                 router.push("/Login");
             } catch (error) {
                console.log(error);
             }
             finally {
                 this.loadingUser = false;
             }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(
                    auth,
                    (user) => {
                        if (user) {
                            this.userData = {
                                email: user.email,
                                uid: user.uid
                            };
                        } else {
                            this.userData = null
                            const databaseStore = useDatabaseStore()
                            databaseStore.$reset();
                        }
                        resolve(user)
                    },
                    (e) => reject(e)
                );
                unsuscribe()
            })
        }
    },
});