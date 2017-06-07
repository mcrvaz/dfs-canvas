define((require) => {
    const GraphRenderer = require('./renderer.js');

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
            this.graphRenderer.initialDraw(nodes);
            this.graphRenderer.drawLinks(nodes[0]);
            this.depthFirstSearch(
                this.graphRenderer.getRandomNode(nodes),
                nodes,
                this.graphRenderer.getRandomNode(nodes)
            );
            // this.graphRenderer.paintNodes(nodes, 200);
        }

        /**
            * Runs a depth first search.
        */
        depthFirstSearch(src, nodes, dst){}

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

});
