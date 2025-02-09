const Cell = (function (value) {

    const addMarker = (marker) => {
        value = marker;
    }

    const getValue = () => value;
    const isOccupied = () => value !== null;

    return {
        addMarker,
        getValue,
        isOccupied
    }
});

export default Cell;