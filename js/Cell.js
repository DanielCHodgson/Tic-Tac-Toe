const Cell = (function () {

    let value = " ";

    const addMarker = (marker) => {
        value = marker;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue
    }
});

export default Cell;