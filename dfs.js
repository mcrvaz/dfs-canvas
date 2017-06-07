(() => {

/**
    * Represents a node.
    * @constructor
    * @param {number} x - The x position of the node.
    * @param {number} y - The y position of the node.
    * @param {number} radius - The radius of the node.
*/
class Node {
    constructor(x, y, radius = 8){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.links = [];
    }

    static get ACTIVE() { return "green" };
    static get INACTIVE() { return "white" };
    static get ACTIVE_LINK() { return "blue" };
    static get INACTIVE_LINK() { return "black" };
    /**
        * Draw the graph in the canvas.
        * @param {HTMLCanvasElement} canvas - The main canvas.
        * @param {CanvasRenderingContext2D} context - The context to render.
        * @param {string} color - The color of the node to be rendered.
    */
    draw(canvas, context, color = Node.ACTIVE){
        context.beginPath();
        context.arc(
            this.x * canvas.width, this.y * canvas.height,
            this.radius, 0, 2 * Math.PI, false
        );
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
    }

    /**
        * Gets the closest nodes to this node.
        * @param {Array<Node>} nodes - Nodes to be searched.
        * @param {number} amount - Amount of closest nodes to return.
        * @return {Array<Node>} - Array containing the closest nodes.
    */
    getClosest(nodes, amount) {
        let arr = nodes.slice(); //shallow copy
        arr = arr.sort((a, b) => this.getDistance(a) > this.getDistance(b) );
        arr.splice(0, 1); //remove self
        this.links = arr.slice(0, amount);
        return this.links;
    }

    /**
        * Gets the distance between the nodes.
        * @param {Node} node - Node to calculate the distance.
        * @returns {number} - Distance between the nodes.
    */
    getDistance(node){
        if(this.links.indexOf(node) != -1)
            return Math.sqrt(Math.pow((this.x - node.x),2) + Math.pow((this.y - node.y),2));
        return Number.POSITIVE_INFINITY;
    }
}

/**
    * Main class for executing the depth first search.
    * @constructor
    * @param {HTMLCanvasElement} canvas - The main canvas.
    * @param {CanvasRenderingContext2D} context - The context to render.
    * @param {number} qttNodes - The amount of nodes to render.
    * @param {number} qttLinks - The amount of additional links to render.
*/
class GraphRenderer {
    constructor(canvas, context, qttNodes, qttLinks){
        clearInterval(window.interval);
        this.canvas = canvas;
        this.context = context;
        this.qttNodes = Number(qttNodes);
        this.qttLinks =  Number(qttLinks);
        this.k = Math.trunc(Math.log10(this.qttNodes));
    }

    /**
        * Renders the nodes in the canvas.
    */
    initialDraw(nodes) {
        nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.INACTIVE) });
    }

    /**
        * Redraws the nodes setting their color as active.
        * @param {Array<Node>} qtt - Nodes to be colored.
        * @param {number} delay - Delay before coloring the next node.
    */
    paintNodes(nodes, delay){
        let i = nodes.length;
        window.interval = setInterval(() => {
            if(i--) nodes[i].draw(this.canvas, this.context, Node.ACTIVE);
            else clearInterval(window.interval);
        }, delay);
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
        return nodes[this.getRandomInt(0, nodes.length)];
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

/**
    * Main class for executing the depth first search.
    * @constructor
    * @param {HTMLCanvasElement} canvas - The main canvas.
    * @param {number} qttNodes - The amount of nodes to render.
    * @param {number} qttLinks - The amount of additional links to render.
*/
class Main {
    constructor(canvas, qttNodes, qttLinks){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = 1350;
        this.canvas.height = 400;
        this.graphRenderer = new GraphRenderer(this.canvas, this.context, qttNodes, qttLinks);
    }

    /**
        * Runs the application, drawing the graph and executing DFS.
    */
    run(){
        let nodes = this.graphRenderer.generateGraph();
        this.graphRenderer.initializeClosestNodes(nodes);
        this.graphRenderer.drawLinks(nodes[0]);
        this.graphRenderer.initialDraw(nodes);
        this.depthFirstSearch(this.graphRenderer.getRandomNode(nodes), nodes);
        this.graphRenderer.paintNodes(nodes, 200);
    }

    /**
        * Runs a depth first search.
    */
    depthFirstSearch(src, nodes){}

}

class Interface {
    static setButtonListener(callback){
        document.getElementById("generate-btn").addEventListener("click", callback);
    }

    static get canvas(){
        return document.getElementById("main-canvas");
    }

    static get qttNodes() {
        return document.querySelector('input[name="nodes"]:checked').value;
    }
}

function exec(){
    let main = new Main(Interface.canvas, Interface.qttNodes, Interface.qttLinks);
    main.run();
}

Interface.setButtonListener(exec);
exec();

})();
