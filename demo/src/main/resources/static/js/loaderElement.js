export class LoaderElement {
    constructor() {
        this.loader = document.createElement("div");
        this.loader.classList.add("loading-screen");
        this.loader.innerHTML = "Загрузка...";
        this.isPresent = false;
    }

    show() {
        if (!this.isPresent) {
            document.body.appendChild(this.loader);
            this.isPresent = true;
        }
    }

    hide() {
        if (this.isPresent) {
            document.body.removeChild(this.loader);
            this.isPresent = false;
        }
    }
}
