export class View {
    constructor({ onDataReceive, onClickOfCrossDelete, onChangingFlagColor, onClickOnCheckbox }) {
        this.inputFilmsNode = document.querySelector(".js-input-add-films");
        this.btnAddNode = document.querySelector(".js-button-add-films");
        this.btnAddNode.addEventListener("click", this._clickImgAddFilm);
        this.listFilmsNode = document.querySelector(".js-list-films");

        this.onDataReceive = onDataReceive;
        this.onClickOfCrossDelete = onClickOfCrossDelete;
        this.onChangingFlagColor = onChangingFlagColor;
        this.onClickOnCheckbox = onClickOnCheckbox;

        this.cardsFilms = document.getElementsByClassName("card-film");
        this.labels = document.getElementsByClassName("label");
        this.titlesFilms = document.getElementsByClassName("film-content");
        this.crossesDelete = document.getElementsByClassName("js-btn-cross");

        $("#list-films-id").click((e) => {
            const selectedItem = e.target;
            console.log(selectedItem);
            const indexCardFilm = this._getIndexCard(selectedItem);
            const CLASS_OF_MOVIE_CARD_LABEL_TAG = "label";
            const CLASS_CARD_FILM = "card-film";
            const CLASS_TITLE_FILM = "film-content";

            const CARD_DIMMING_MODIFIER = "card-film_blackout";
            const CHECKBOX_COLOR_CHANGE_MODIFIER = "label_background";
            const TEXT_STRIKETHROUGH_MODIFIER = "film-content_cross-out";

            if ($(selectedItem).hasClass(CLASS_OF_MOVIE_CARD_LABEL_TAG) ||
                $(selectedItem).hasClass(CLASS_CARD_FILM) ||
                $(selectedItem).hasClass(CLASS_TITLE_FILM)) {
                    $(this.cardsFilms[indexCardFilm]).toggleClass(CARD_DIMMING_MODIFIER);
                    $(this.labels[indexCardFilm]).toggleClass(CHECKBOX_COLOR_CHANGE_MODIFIER);
                    $(this.titlesFilms[indexCardFilm]).toggleClass(TEXT_STRIKETHROUGH_MODIFIER);
                    this.onClickOnCheckbox(indexCardFilm);
            };
        });

        $("#list-films-id").click((e) => {
            const selectedItem = e.target;
            const indexCrossDelete = this._getIndexCard(selectedItem);
            const CLASS_CROSS_DELETE = "js-btn-cross";
            if (selectedItem.classList.contains(CLASS_CROSS_DELETE)) {
                this.onClickOfCrossDelete(indexCrossDelete);
            };
        });
    }

    _getIndexCard(selectedItem) {
        const itemsCardsFilms = [].slice.call(document.querySelectorAll(`.${selectedItem.classList[0]}`));
        const indexSelectedItem = itemsCardsFilms.indexOf(selectedItem);
        return indexSelectedItem;
    }

    _clickImgAddFilm = () => {
        const film = this.inputFilmsNode.value;
        this.onDataReceive(film);
        this.inputFilmsNode.value = "";
    }

    render(listFilmsResponse) {
        const CARD_DIMMING_MODIFIER = "card-film_blackout";
        const CHECKBOX_COLOR_CHANGE_MODIFIER = "label_background";
        const TEXT_STRIKETHROUGH_MODIFIER = "film-content_cross-out";

        this.listFilmsNode.innerHTML = "";
        listFilmsResponse.forEach((film, index) => {

            if (film.viewed === false) {
                const cardFilm = document.createElement("div");
                cardFilm.className = "card-film";
                cardFilm.id = "card-film-id";
                const cardFilmItem = document.createElement("div");
                cardFilmItem.className = "card-film__item";
                const checkbox = document.createElement("input");
                checkbox.id = "checkbox";
                checkbox.className = "js-input-checkbox input-checkbox";
                checkbox.type = "checkbox";
                const label = document.createElement("label");
                label.className = "label";
                label.for = "checkbox";

                const filmContent = document.createElement("p");
                filmContent.className = "film-content";
                filmContent.textContent = film.title;
                const btnCross = document.createElement("button");
                btnCross.className = "js-btn-cross btn-cross";
                cardFilm.append(cardFilmItem, btnCross);
                cardFilmItem.append(checkbox, label, filmContent);
                this.listFilmsNode.append(cardFilm);
            } else {
                console.log("Должно работать")
                const cardFilm = document.createElement("div");
                cardFilm.className = `card-film ${CARD_DIMMING_MODIFIER}`;
                cardFilm.id = "card-film-id";
                const cardFilmItem = document.createElement("div");
                cardFilmItem.className = "card-film__item";
                const checkbox = document.createElement("input");
                checkbox.id = "checkbox";
                checkbox.className = "js-input-checkbox input-checkbox";
                checkbox.type = "checkbox";
                const label = document.createElement("label");
                label.className = `label ${CHECKBOX_COLOR_CHANGE_MODIFIER}`;
                label.for = "checkbox";

                const filmContent = document.createElement("p");
                filmContent.className = `film-content ${TEXT_STRIKETHROUGH_MODIFIER}`;
                filmContent.textContent = film.title;
                const btnCross = document.createElement("button");
                btnCross.className = "js-btn-cross btn-cross";
                cardFilm.append(cardFilmItem, btnCross);
                cardFilmItem.append(checkbox, label, filmContent);
                this.listFilmsNode.append(cardFilm);
            };
        });
    }
};