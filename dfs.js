(() => {

    class Node {
        constructor(x, y, radius){
            this.x = x;
            this.y = y;
            this.links = [];
        }

        static get ACTIVE() { return "green" };
        static get INACTIVE() { return "white" };

        draw(canvas, context, color){
            let radius = 5;
            context.beginPath();
            context.arc(this.x * canvas.width, this.y * canvas.height, radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
        }

        link(canvas, context, node){
            context.beginPath();
            context.moveTo(this.x * canvas.width, this.y * canvas.height);
            context.lineTo(node.x * canvas.width, node.y * canvas.height);
            context.stroke();
            this.links.push(node);
            node.links.push(node);
        }

        getDistance(node){
            return Math.sqrt(Math.pow((this.x - node.x),2) + Math.pow((this.y - node.y),2));
        }
    }

    class Main {
        constructor(canvas, context, qttNodes, qttLinks){
            this.canvas = canvas;
            this.context = context;
            this.canvas.width = 1350;
            this.canvas.height = 400;
            this.qttNodes = qttNodes;
            this.nodes = this.generateConnectedGraph(this.qttNodes);
            this.generateRandomLinks(this.nodes, qttLinks);
        }

        run(){
            this.initialDraw();
        }

        initialDraw() {
            this.nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.INACTIVE) });
        }

        depthFirstSearch(){}

        generateConnectedGraph(qtt) {
            let arr = [];
            for(let i = 0; i < qtt; i++){
                let node = new Node(Math.random(), Math.random());
                arr.push(node);
                this.generateRandomLink(arr, node, i - 1);
            }
            return arr;
        }

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        generateRandomLink(nodes, currentNode, maxIndex) {
            let index = this.getRandomInt(0, maxIndex);
            currentNode.link(this.canvas, this.context, nodes[index]);
        }

        generateRandomLinks(nodes, amount){
            for(let i = 0; i < amount; i++){
                let current = nodes[Math.floor(Math.random() * i)];
                let next = nodes[Math.floor(Math.random() * i)];
                if(current.links.indexOf(next) == -1){
                    current.link(this.canvas, this.context, next);
                }
            }
        }

    }

    let canvas = document.getElementById("main-canvas");
    let context = canvas.getContext("2d");
    let qttNodes = 10;
    let qttLinks = 2;
    let main = new Main(canvas, context, qttNodes, qttLinks);
    main.run();

})();
