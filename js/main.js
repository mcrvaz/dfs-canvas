define((require) => {
    const GraphRenderer = require('./renderer.js');
    const GraphGenerator = require('./generator.js');
    const Node = require('./node.js');
    const depthFirstSearch = require('./dfs.js').depthFirstSearch;
    /**
        * Main class for executing the depth first search.
        * @constructor
        * @param {HTMLCanvasElement} canvas - The main canvas.
        * @param {number} qttNodes - The amount of nodes to render.
        * @param {number} qttLinks - The amount of additional links to render.
        * @param {boolean} directed - If the graph is directed.
    */
    class Main {
        constructor(canvas, qttNodes, qttLinks, directed){
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            this.canvas.width = 1200;
            this.canvas.height = 500;
            this.directed = directed;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            this.graphRenderer = new GraphRenderer(this.canvas, this.context);
            this.graphGenerator = new GraphGenerator(qttNodes, qttLinks, directed);
        }

        /**
            * Runs the application, drawing the graph and executing DFS.
        */
        run(){
            let nodes = this.graphGenerator.generateGraph();
            let src = this.graphGenerator.getRandomNode(nodes);

            this.graphGenerator.initializeClosestNodes(nodes);
            this.graphRenderer.initialDraw(nodes);

            this.graphRenderer.paintNode(src, 0, Node.SOURCE);

            let visited = depthFirstSearch(src, nodes, []);
            this.graphRenderer.paintLinks(visited, false, 500);
        }

        /**
            * Runs the application, drawing the directed graph and executing DFS.
        */
        runDirected(){
            let nodes = this.graphGenerator.generateGraph();
            let src = this.graphGenerator.getMinimumNode(nodes, "x");

            this.graphGenerator.initializeClosestDirectedNodes(nodes);
            this.graphRenderer.initialDraw(nodes);

            this.graphRenderer.paintNode(src, 0, Node.SOURCE);

            let visited = depthFirstSearch(src, nodes, []);
            this.graphRenderer.paintLinks(visited, true, 500);
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

        static get directed() {
            return document.getElementById('directed').checked;
        }
    }

    function exec(){
        let main = new Main(Interface.canvas, Interface.qttNodes, Interface.qttLinks, Interface.directed);
        if(!main.directed) main.run();
        else main.runDirected();
    }

    Interface.setButtonListener(exec);
    exec();

});
