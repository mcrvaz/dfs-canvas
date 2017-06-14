define((require) => {
    /**
        * Represents a node.
        * @constructor
        * @param {number} x - The x position of the node.
        * @param {number} y - The y position of the node.
        * @param {number} radius - The radius of the node.
    */
    return class Node {
        constructor(x, y, radius = 8){
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.links = [];
            this.links.pushUnique = function(n) {
                if(this.indexOf(n) == -1) this.push(n);
            }
        }

        static get ACTIVE() { return "green" };
        static get INACTIVE() { return "white" };

        static get SOURCE() { return "blue" };
        static get DESTINATION() { return "red" };

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
            * Gets the closest nodes to this node.
            * @param {Array<Node>} nodes - Nodes to be searched.
            * @param {number} amount - Amount of closest nodes to return.
            * @return {Array<Node>} - Array containing the closest directed nodes.
        */
        getClosestDirected(nodes, amount) {
            let arr = nodes.slice(); //shallow copy
            arr = arr.sort((a, b) => this.getDistance(a) > this.getDistance(b) );
            arr.splice(0, 1); //remove self
            arr = arr.slice(0, amount);

            // if n1.x < n2.x: n1 -> n2
            // else: n1 <- n2
            for(let i = 0; i < arr.length; i++){
                if(this.x < arr[i].x) {
                    this.links.pushUnique(arr[i]);
                } else {
                    arr[i].links.pushUnique(this);
                }
            }
            return this.links;
        }

        /**
            * Gets the distance between the nodes.
            * Uses the following formula: sqrt((n1.x – n2.x)^2 + (n1.y – n2.y)^2)
            * @param {Node} node - Node to calculate the distance.
            * @returns {number} - Distance between the nodes.
        */
        getDistance(node){
            return Math.sqrt(Math.pow((this.x - node.x),2) + Math.pow((this.y - node.y),2));
        }
    }
});
