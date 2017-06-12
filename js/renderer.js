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
            * @param {boolean} directed - True if the link should be directed.
            * @param {number} delay - Delay before drawing the link.
            * @param {string} color - Link color.
        */
        paintLinks(nodes, directed = false, delay = 0, color = Node.ACTIVE_LINK){
            let i = 0;
            window.linkInterval = setInterval(() => {
                if(i++ < nodes.length - 1){
                    this.context.beginPath();
                    this.context.moveTo(
                        nodes[i].node.x * this.canvas.width,
                        nodes[i].node.y * this.canvas.height
                    );
                    this.context.lineTo(
                        nodes[i].parent.x * this.canvas.width,
                        nodes[i].parent.y * this.canvas.height
                    );
                    this.context.strokeStyle = color;
                    if(directed) this.drawArrow(nodes[i].parent, nodes[i].node);
                    this.context.stroke();
                } else {
                    clearInterval(window.linkInterval);
                }
            }, delay)
        }

        /**
            * Redraws a link between two nodes.
            * @param {Node} n1 - Origin node.
            * @param {Node} n2 - Destination node.
            * @param {boolean} directed - True if the link should be directed.
            * @param {number} delay - Delay before drawing the link.
            * @param {string} color - Link color.
        */
        paintLink(n1, n2, directed = false, delay = 0, color = Node.ACTIVE_LINK){
            setTimeout(() => {
                this.context.beginPath();
                this.context.moveTo(n1.x * this.canvas.width, n1.y * this.canvas.height);
                this.context.lineTo(n2.x * this.canvas.width, n2.y * this.canvas.height);
                this.context.strokeStyle = color;
                if(directed) this.drawArrow(n1, n2);
                this.context.stroke();
            }, delay)
        }

        /**
            * Draws an arrow at the end of the link.
            * @param {Node} n1 - Origin node.
            * @param {Node} n2 - Destination node.
            * @param {string} color - Link color.
            * @param {number} size - Arrow size.
        */
        drawArrow(n1, n2, color = Node.ACTIVE_LINK, size = 10){
            let x1 = n1.x * this.canvas.width;
            let x2 = n2.x * this.canvas.width;
            let y1 = n1.y * this.canvas.height;
            let y2 = n2.y * this.canvas.height;
            let angle = Math.atan2(y2 - y1, x2 - x1);
            this.context.moveTo(x2, y2);
            this.context.lineTo(x2-size*Math.cos(angle-Math.PI/6),y2-size*Math.sin(angle-Math.PI/6));
            this.context.moveTo(x2, y2);
            this.context.lineTo(x2-size*Math.cos(angle+Math.PI/6),y2-size*Math.sin(angle+Math.PI/6));
        }
        // drawArrow(origin, color = Node.ACTIVE_LINK, size = 5){
        //     let angle = Math.PI/4; //45 degrees
        //     let x = origin.x * this.canvas.width;
        //     let y = origin.y * this.canvas.height;
        //     this.context.beginPath();
        //     this.context.moveTo(x, y);
        //     this.context.lineTo(x - size * Math.cos(angle), y - size * Math.sin(angle));
        //     this.context.moveTo(x, y);
        //     this.context.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
        //     this.context.stroke();
        //     this.context.closePath();
        // }

        /**
            * Redraws the nodes setting their color to active.
            * @param {Array<Node>} nodes - Nodes to be colored.
            * @param {number} delay - Delay before coloring the next node.
            * @param {string} color - Node color.
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
            * @param {string} color - Node color.
        */
        paintNode(node, delay = 0, color = Node.ACTIVE) {
            setTimeout(node.draw(this.canvas, this.context, color), delay);
        }

    }

});
