define((require, exports) => {
    exports.contains = function(arr, attr, elem) {
        return arr.some((e) => e[attr] == elem);
    }
})
