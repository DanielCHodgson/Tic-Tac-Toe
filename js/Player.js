export default class Player {

    constructor(name, marker) {
        this.name = name;
        this.marker = marker
    }

    getName() {
        return this.name;
    }

    getMarker() {
        return this.marker;
    }

}