const Utility = (function () {

    function twoDToIndex(row, col, width) {
        return row * width + col;
    }

    function indexToTwoD(index, width) {
        const row = Math.floor(index / width);
        const col = index % width;
        const point = {row, col}
        return point;
    }

    return {
        twoDToIndex,
        indexToTwoD
    }
});

export default Utility;