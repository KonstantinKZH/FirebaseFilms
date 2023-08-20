import { Firebase, } from "./firebase.js";
import { v4 as uuidv4 } from "uuid";

export class Model {
    constructor({ onReceivingDataFromServer }) {
        this.listFilms = [];
        this.firebase = new Firebase();
        this.onReceivingDataFromServer = onReceivingDataFromServer;
    }

    sendDataToStorage(film) {
        if (film === "") return;
        if (film.charAt(0) === ' ') return;
        this.listFilms.push({
            title: film,
            viewed: false,
            id: uuidv4(),
        });
        this.firebase.push(this.listFilms.at(-1));
        this.onReceivingDataFromServer(this.listFilms);
    }

    updateDataInModel() {
        this.firebase.pull().then(listFilmsResponse => {
            const films = listFilmsResponse;
            this.listFilms = films;
            this.onReceivingDataFromServer(this.listFilms);
        });
    }

    updateStatusFilm(indexCardFilm) {
        if (this.listFilms[indexCardFilm].viewed === false) {
            const statusFilm = true;
            this.listFilms[indexCardFilm].viewed = true;
            this.firebase.update(this.listFilms[indexCardFilm], statusFilm);
        } else {
            const statusFilm = false;
            this.listFilms[indexCardFilm].viewed = false;
            this.firebase.update(this.listFilms[indexCardFilm], statusFilm);
        };
    }

    deleteCardFilms(indexCrossDelete) {
        this.firebase.delete(this.listFilms[indexCrossDelete].id);
        this.listFilms.splice(indexCrossDelete, 1);
        this.onReceivingDataFromServer(this.listFilms);
    }
};