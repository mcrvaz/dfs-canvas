define((require) => {
    const Node = require("./node.js");

    /**
        * Main class for executing the depth first search.
        * @constructor
        * @param {HTMLCanvasElement} canvas - The main canvas.
        * @param {CanvasRenderingContext2D} context - The context to render.
        * @param {number} qttNodes - The amount of nodes to render.
        * @param {number} qttLinks - The amount of additional links to render.
    */
    return class GraphRenderer {
        constructor(canvas, context, qttNodes, qttLinks){
            clearInterval(window.interval);
            this.canvas = canvas;
            this.context = context;
            this.qttNodes = Number(qttNodes);
            this.qttLinks =  Number(qttLinks);
            //number of links any node must have
            this.k = Math.trunc(Math.log10(this.qttNodes));
        }

        /**
            * Renders the nodes in the canvas.
        */
        initialDraw(nodes) {
            nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.INACTIVE) });
        }

        /**
            * Redraws the nodes setting their color to active.
            * @param {Array<Node>} nodes - Nodes to be colored.
            * @param {number} delay - Delay before coloring the next node.
        */
        paintNodes(nodes, delay = 0, color = Node.ACTIVE){
            let i = nodes.length;
            window.interval = setInterval(() => {
                if(i--) {
                    nodes[i].draw(this.canvas, this.context, color);
                } else {
                    clearInterval(window.interval);
                }
            }, delay);
        }

        /**
            * Redraws the node setting its color to active.
            * @param {Node} node - Node to be colored.
            * @param {number} delay - Delay before coloring the next node.
        */
        paintNode(node, delay = 0, color = Node.ACTIVE) {
            setTimeout(node.draw(this.canvas, this.context, color), delay);
        }

        /**
            * Renders all the links from the node.
            * @param {number} node - Node to be linked.
            * @param {string} color - Color of the link.
        */
        drawLinks(node, color = Node.INACTIVE_LINK){
            node.links.forEach((n) => {
                this.context.beginPath();
                this.context.moveTo(node.x * this.canvas.width, node.y * this.canvas.height);
                this.context.lineTo(n.x * this.canvas.width, n.y * this.canvas.height);
                this.context.strokeStyle = color;
                this.context.stroke();
            });
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
