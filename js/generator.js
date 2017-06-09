define((require) => {
    const Node = require("./node.js");

    /**
        * Class for generating graphs.
        * @constructor
        * @param {number} qttNodes - The amount of nodes to render.
        * @param {number} qttLinks - The amount of additional links to render.
    */
    return class GraphGenerator {
        constructor(qttNodes, qttLinks){
            this.qttNodes = Number(qttNodes);
            this.qttLinks =  Number(qttLinks);
            //number of links any node must have
            this.k = Math.trunc(Math.log10(this.qttNodes));
        }

        /**
            * Generates a graph with no links.
            * @param {number} qtt - The amount of nodes in the graph.
            * @returns {Array<Node>} - The graph.
        */
        generateGraph(qtt = this.qttNodes){
            let arr = Array(Number(qtt));
            for(let i = 0; i < arr.length; i++){
                arr[i] = (new Node(Math.random(), Math.random()));
            }
            return arr;
        }

        /**
            * Generates a connected graph.
            * @param {number} qtt - The amount of nodes in the graph.
            * @param {number} additionalLinks - The amount of additional links in the graph.
            * @returns {Array<Node>} - The connected graph.
        */
        generateConnectedGraph(qtt = this.qttNodes, additionalLinks = this.qttLinks) {
            let arr = [];
            for(let i = 0; i < qtt; i++){
                let node = new Node(Math.random(), Math.random());
                arr.push(node);
                this.generateRandomLink(arr, node, i - 1);
            }
            this.generateRandomLinks(arr, additionalLinks);
            return arr;
        }

        /**
            * Generates a random number inside the defined range.
            * @param {number} min - Minimum value possible.
            * @param {number} max - Maximum value possible.
            * @returns {number} - Random number between [min, max].
        */
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
            * Gets a random node from the node array.
            * @param {Array<Node>} nodes - Array of possible nodes.
            * @returns {Node} - Random node from the array.
        */
        getRandomNode(nodes) {
            return nodes[this.getRandomInt(0, nodes.length - 1)];
        }

        /**
            * Calculates the closest K nodes for each node in the array.
            * @param {Array<Node>} nodes - Array of possible nodes.
            * @returns {Array<Node>} - Nodes with their their closest nodes.
        */
        initializeClosestNodes(nodes) {
            nodes.forEach((n, idx, arr) => n.getClosest(arr, this.k));
            return nodes;
        }

        /**
            * Generates a link with a random node.
            * @param {Array<Node>} nodes - Array of possible nodes to link.
            * @param {Node} currentNode - Node to be linked.
            * @param {number} maxIndex - Maximum index to be searched in the node array.
        */
        generateRandomLink(nodes, currentNode, maxIndex) {
            maxIndex = maxIndex > nodes.length ? nodes.length : maxIndex;
            let index = this.getRandomInt(0, maxIndex);
            currentNode.link(this.canvas, this.context, nodes[index]);
        }

        /**
            * Generates a defined amount of random links between nodes.
            * @param {Array<Node>} nodes - Array of possible nodes to link.
            * @param {Node} amount - Amount of random links to be generated.
        */
        generateRandomLinks(nodes, amount){
            for(let i = 0; i < Number(amount); i++){
                let current = nodes[Math.floor(Math.random() * nodes.length)];
                let next = nodes[Math.floor(Math.random() * nodes.length)];
                if(current.links.indexOf(next) == -1){
                    current.link(this.canvas, this.context, next);
                }
            }
        }
    }

});
