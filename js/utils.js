define((require, exports) => {
    /**
        * Checks if element is contained in in the array.
        * @param {Array<any>} arr - Array to be verified.
        * @param {string} attr - Attribute in the array to be verified.
        * @param {any} elem - Element to be verified.
        * @returns {boolean} - If the element is contained in the array.
    */
    exports.contains = function(arr, attr, elem) {
        return arr.some((e) => e[attr] == elem);
    }


    /**
        * Generates a random number inside the defined range.
        * @param {number} min - Minimum value possible.
        * @param {number} max - Maximum value possible.
        * @returns {number} - Random number between [min, max].
    */
    exports.getRandomInt =  function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})
