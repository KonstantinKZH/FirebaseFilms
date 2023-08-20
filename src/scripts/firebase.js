import { initializeApp } from "firebase/app";
import {
    collection, getFirestore, doc, serverTimestamp, query,
    orderBy, getDocs, updateDoc, deleteDoc, setDoc,
} from "firebase/firestore";

export class Firebase {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyBecab95pdDzThpZ64wmfl4UVgs2pnJyR8",
            authDomain: "list-movies-7e350.firebaseapp.com",
            projectId: "list-movies-7e350",
            storageBucket: "list-movies-7e350.appspot.com",
            messagingSenderId: "118972593764",
            appId: "1:118972593764:web:0794f6898fc152522cd171"
        };
        this.key = "listFilms";
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
    }

    async push(film) {
        try {
            const docRef = await setDoc(doc(this.db, this.key, film.id), {
                title: film.title,
                viewed: false,
                createdAt: serverTimestamp(),
                id: film.id
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        };
    }

    async pull() {
        const ref = collection(this.db, this.key);
        const q = query(ref, orderBy("createdAt"));
        const querySnapshot = await getDocs(q);

        const listFilmsResponse = [];
        querySnapshot.forEach((doc) => {
            listFilmsResponse.push({
                viewed: doc.data().viewed,
                title: doc.data().title,
                id: doc.id
            });
        });
        return listFilmsResponse;
    }

    async update(film, statusFilm) {
        const ref = doc(this.db, this.key, film.id);
        await updateDoc(ref, {
            viewed: statusFilm
        });
    }

    async delete(id) {
        await deleteDoc(doc(this.db, this.key, id));
    }
}
