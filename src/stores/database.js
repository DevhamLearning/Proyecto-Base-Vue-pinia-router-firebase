import {
    addDoc, collection, deleteDoc, doc,
    getDoc, getDocs, query, updateDoc, where,
} from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfig";
import { defineStore } from "pinia";
import { nanoid } from 'nanoid'
import router from "../router";

export const useDatabaseStore = defineStore("database", {
    state: () => ({
        documents: [],
        loading: false,
        loadingDoc: false,
    }),
    actions: {
        async getUrls() {
            if (this.documents.length !== 0) {
                return;
            }
            this.loading = true;
            this.loadingDoc = true;
            this.documents = [];
            const q = query(collection(db, "urls")
                , where("user", "==", auth.currentUser.uid)
            );
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    //console.log("log database.js-getUrls:", doc.id, doc.data());
                    this.documents.push({ id: doc.id, ...doc.data(), });
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
                this.loadingDoc = false;
            }
        },
        async addUrl(name) {
            this.loadingDoc = true;
            try {
                const docObjeto = {
                    name: name,
                    short: nanoid(5),
                    user: auth.currentUser.uid
                };
                const q = query(collection(db, 'urls'))
                const docRef = await addDoc(q, docObjeto);
                this.documents.push({ id: docRef.id, ...docObjeto });
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingDoc = false;
            }
        },
        async deleteUrl(id) {
            this.loadingDoc = true;
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error('no existe el doc')
                }

                if (docSnap.data().user === auth.currentUser.uid) {
                    console.log("log database.js-deleteUrl:", docRef);
                    await deleteDoc(docRef);
                    this.documents = this.documents.filter(
                        (item) => item.id !== id
                    );
                } else {
                    throw new Error('no eres el autor')
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDoc = false;
            }
        },
        async leerUrl(id) {
            this.loadingDoc = true;
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("no existe el doc");
                }

                if (docSnap.data().user === auth.currentUser.uid) {
                    return docSnap.data().name;
                } else {
                    throw new Error("no eres el autor");
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDoc = false;
            }
        },
        async updateUrl(id, name) {
            this.loadingDoc = true;
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new Error("no existe el doc");
                }

                if (docSnap.data().user != auth.currentUser.uid) {
                    throw new Error("no eres el autor");
                }

                await updateDoc(docRef, {
                    name: name
                });


                this.documents = this.documents.map((item) =>
                    item.id === id ? { ...item, name: name } : item
                );

                router.push("/");
            } catch (error) {
                console.log(error.message);
            } finally {
                this.loadingDoc = false;
            }
        },
    },
});