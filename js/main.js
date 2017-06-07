define((require) => {
    const GraphRenderer = require('./renderer.js');
    const Node = require('./node.js');

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
            this.canvas.width = 400;
            this.canvas.height = 400;
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            this.graphRenderer = new GraphRenderer(this.canvas, this.context, qttNodes, qttLinks);
        }

        /**
            * Runs the application, drawing the graph and executing DFS.
        */
        run(){
            let nodes = this.graphRenderer.generateGraph();
            let src = this.graphRenderer.getRandomNode(nodes);

            this.graphRenderer.initializeClosestNodes(nodes);
            this.graphRenderer.initialDraw(nodes);

            this.graphRenderer.paintNode(src, 0, Node.SOURCE);

            let visited = this.depthFirstSearch(src, nodes, []);
            this.graphRenderer.paintLinks(visited, false, 500);
        }

        depthFirstSearch(src, nodes, visited, parent){
            visited.push({node: src, parent: parent});
            src.links.forEach((n) => {
                if(!this.contains(visited, "node", n)) {
                    this.depthFirstSearch(n, nodes, visited, src);
                }
            });

            return visited;
        }

        contains(arr, attr, elem){
            return arr.some((e) => e[attr] == elem);
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
    }

    function exec(){
        let main = new Main(Interface.canvas, Interface.qttNodes, Interface.qttLinks);
        main.run();
    }

    Interface.setButtonListener(exec);
    exec();

});
