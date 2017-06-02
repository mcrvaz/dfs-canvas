(() => {

    class Node {
        constructor(x, y, radius){
            this.x = x;
            this.y = y;
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
        }

        getDistance(node){
            return Math.sqrt(Math.pow((this.x - node.x),2) + Math.pow((this.y - node.y),2));
        }
    }

    class Main {
        constructor(canvas, context, qttNodes){
            this.canvas = canvas;
            this.context = context;
            this.canvas.width = 1350;
            this.canvas.height = 400;
            this.qttNodes = qttNodes;
            this.nodes = this.generateNodes(this.qttNodes);
        }

        run(){
            this.nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.INACTIVE) });
            for(let i=0; i < this.nodes.length - 1; i++){
                this.nodes[i].link(this.canvas, this.context, this.nodes[i + 1]);
            }
        }

        depthFirstSearch(){}

        generateNodes(qtt) {
            return Array.from(Array(qtt), () => new Node(Math.random(), Math.random()));
        }
    }

    let canvas = document.getElementById("main-canvas");
    let context = canvas.getContext("2d");
    let qttNodes = 10;
    let main = new Main(canvas, context, qttNodes);
    main.run();


})();
