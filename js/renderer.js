define((require) => {
    const Node = require("./node.js");

    /**
        * Class for rendering graphs.
        * @constructor
        * @param {HTMLCanvasElement} canvas - The main canvas.
        * @param {CanvasRenderingContext2D} context - The context to render.
    */
    return class GraphRenderer {
        constructor(canvas, context, qttNodes, qttLinks){
            clearInterval(window.nodeInterval);
            clearInterval(window.linkInterval);
            this.canvas = canvas;
            this.context = context;
        }

        /**
            * Renders the nodes in the canvas.
            * @param {Array<Node>} nodes - Nodes to be rendered.
        */
        initialDraw(nodes) {
            nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.INACTIVE) });
        }

        /**
            * Draw a link between two nodes.
            * @param {Array<{node, parent}>} nodes - Array with nodes and its parents.
            * @param {number} delay - Delay before drawing the link.
            * @param {string} color - Link color.
        */
        paintLinks(nodes, delay = 0, color = Node.ACTIVE_LINK){
            let i = 0;
            window.linkInterval = setInterval(() => {
                if(i++ < nodes.length - 1){
                    this.context.beginPath();
                    this.context.moveTo(nodes[i].node.x * this.canvas.width, nodes[i].node.y * this.canvas.height);
                    this.context.lineTo(nodes[i].parent.x * this.canvas.width, nodes[i].parent.y * this.canvas.height);
                    this.context.strokeStyle = color;
                    this.context.stroke();
                } else {
                    clearInterval(window.linkInterval);
                }
            }, delay)
        }

        /**
            * Draw a link between two nodes.
            * @param {Node} n1 - Origin node.
            * @param {Node} n2 - Destination node.
            * @param {boolean} directed - True if the link should be directed.
            * @param {number} delay - Delay before drawing the link.
            * @param {string} color - Link color.
        */
        paintLink(n1, n2, directed = false, delay = 0, color = Node.ACTIVE_LINK){
            window.linkInterval = setInterval(() => {
                this.context.beginPath();
                this.context.moveTo(n1.x * this.canvas.width, n1.y * this.canvas.height);
                this.context.lineTo(n2.x * this.canvas.width, n2.y * this.canvas.height);
                this.context.strokeStyle = color;
                this.context.stroke();
            }, delay)
        }

        /**
            * Redraws the nodes setting their color to active.
            * @param {Array<Node>} nodes - Nodes to be colored.
            * @param {number} delay - Delay before coloring the next node.
        */
        paintNodes(nodes, delay = 0, color = Node.ACTIVE){
            let i = nodes.length;
            window.nodeInterval = setInterval(() => {
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
    }

});
