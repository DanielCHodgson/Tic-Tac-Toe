const Utility = (function () {

    function twoDToIndex(row, col, width) {
        return row * width + col;
    }

    function indexToTwoD(index, width) {
        let row = Math.floor(index / width);
        let col = index % width;
        return [row, col];
    }

    return {
        twoDToIndex,
        indexToTwoD
    }
});

export default Utility;