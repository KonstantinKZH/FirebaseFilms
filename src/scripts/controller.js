import { View } from "./view.js";
import { Model } from "./model.js";

export class Controller {
    constructor() {
        this.view = new View({
            onDataReceive: this._handleReceivedData,
            onClickOfCrossDelete: this._deleteCardFilm,
            onClickOnCheckbox: this._handleMovieStatusChange,
        });
        this.model = new Model({
            onReceivingDataFromServer: this._renderCardsFilms,
        });
    }

    init() {
        this.model.updateDataInModel();
    }

    _handleReceivedData = (film) => {
        this.model.sendDataToStorage(film);
    }

    _renderCardsFilms = (listFilms) => {
        this.view.render(listFilms);
        
    }

    _deleteCardFilm = (indexCrossDelete) => {
        this.model.deleteCardFilms(indexCrossDelete);
    }

    _handleMovieStatusChange = (indexCardFilm) => {
        this.model.updateStatusFilm(indexCardFilm);
    }
}