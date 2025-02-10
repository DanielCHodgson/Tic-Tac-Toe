export default class Cell {

    constructor(marker) {
        this.value = marker
    }

    addMarker(marker) {
        this.value = marker;
    }

    getValue() {
        return this.value;
    }

    isOccupied() {
        return this.value !== null;
    }

}

