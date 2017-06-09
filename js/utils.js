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
})
