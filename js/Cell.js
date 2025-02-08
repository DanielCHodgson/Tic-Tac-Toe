const Cell = (function () {

    let value = " ";

    const addMarker = (player) => {
        value = player.marker;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue
    }
});

window.Cell = Cell;