define((require, exports) => {
    const contains = require("./utils.js").contains;

    /**
        * Runs a depth first search.
        * @param {Node} src - Node to start the search.
        * @param {Array<Node>} nodes - Possible nodes to check.
        * @param {Array<{node, parent}>} visited - Array containing nodes that were visited and its parents.
        * @param {Node} parent - Node parent to the source node.
        * @returns {Array<{node, parent}>} - Array containing nodes that were visited and its parents.
    */
    depthFirstSearch = function(src, nodes, visited, parent) {
        visited.push({node: src, parent: parent});
        src.links.forEach((n) => {
            if(!contains(visited, "node", n)) {
                depthFirstSearch(n, nodes, visited, src);
            }
        });
        return visited;
    }

    exports.depthFirstSearch = depthFirstSearch;
})
