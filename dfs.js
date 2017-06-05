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

    /**
        * Draw the graph in the canvas.
        * @param {HTMLCanvasElement} canvas - The main canvas.
        * @param {CanvasRenderingContext2D} context - The context to render.
        * @param {string} color - The color of the node to be rendered.
    */
    draw(canvas, context, color){
        context.beginPath();
        context.arc(this.x * canvas.width, this.y * canvas.height, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
    }

    /**
        * Render a link and add the node to each other links array.
        * @param {HTMLCanvasElement} canvas - The main canvas.
        * @param {CanvasRenderingContext2D} context - The context to render.
        * @param {number} node - Node to be linked.
    */
    link(canvas, context, node){
        context.beginPath();
        context.moveTo(this.x * canvas.width, this.y * canvas.height);
        context.lineTo(node.x * canvas.width, node.y * canvas.height);
        context.stroke();
        this.links.push(node);
        node.links.push(node);
    }

    /**
        * Gets the distance between the nodes.
        * @param {Node} node - Node to calculate the distance.
        * @returns {number} - Distance between the nodes.
    */
    getDistance(node){
        return Math.sqrt(Math.pow((this.x - node.x),2) + Math.pow((this.y - node.y),2));
    }
}

/**
    * Main class for executing the depth first search.
    * This renders a connected graph with zero or more additional links.
    * @constructor
    * @param {HTMLCanvasElement} canvas - The main canvas.
    * @param {number} qttNodes - The amount of nodes to render.
    * @param {number} qttLinks - The amount of additional links to render.
*/
class Main {
    constructor(canvas, qttNodes, qttLinks){
        clearInterval(window.interval);
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = 1350;
        this.canvas.height = 400;
        this.qttNodes = qttNodes;
        this.nodes = this.generateConnectedGraph(this.qttNodes);
        this.generateRandomLinks(this.nodes, qttLinks);
    }

    /**
        * Runs the application, drawing the graph and executing DFS.
    */
    run(){
        this.initialDraw();
        this.depthFirstSearch();
        this.paintNodes(this.nodes);
    }

    /**
        * Renders the nodes in the canvas.
    */
    initialDraw() {
        this.nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.INACTIVE) });
    }

    depthFirstSearch(){}

    paintNodes(nodes){
        let i = nodes.length;
        window.interval = setInterval(() => {
            if(i--) nodes[i].draw(this.canvas, this.context, Node.ACTIVE);
            else clearInterval(window.interval);
        }, 200);
    }

    /**
        * Generates a connected graph.
        * @param {number} qtt - The amount of nodes in the graph.
        * @returns {Array<Node>} - The connected graph.
    */
    generateConnectedGraph(qtt) {
        let arr = [];
        for(let i = 0; i < qtt; i++){
            let node = new Node(Math.random(), Math.random());
            arr.push(node);
            this.generateRandomLink(arr, node, i - 1);
        }
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

    static get qttLinks() {
        return document.getElementById("additional-nodes").value;
    }
}

function exec(){
    let main = new Main(Interface.canvas, Interface.qttNodes, Interface.qttLinks);
    main.run();
}

Interface.setButtonListener(exec);
exec();

})();
