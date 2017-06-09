define((require, exports) => {
    const contains = require("./utils.js").contains;

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
