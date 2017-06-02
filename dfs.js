(() => {

    class Node {

        constructor(x, y, radius){
            this.x = x;
            this.y = y;
        }

        static get active() { return "white" };
        static get inactive() { return "green" };

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
    }

    class Main {
        constructor(canvas, context, qttNodes){
            this.canvas = canvas;
            this.context = context;
            this.qttNodes = qttNodes;
            this.canvas.width = 1350;
            this.canvas.height = 400;
        }

        run(){
            let nodes = this.generateNodes(this.qttNodes);
            nodes.forEach((n) => { n.draw(this.canvas, this.context, Node.active) });
        }

        depthFirstSearch(){}

        generateNodes(qtt) {
            return Array.from(Array(qtt), () => new Node(Math.random(), Math.random()));
        }

         getDistance(n1, n2){
            return Math.sqrt(Math.pow((n1.x - n2.x),2) + Math.pow((n1.y - n2.y),2));
        }

    }

    let canvas = document.getElementById("main-canvas");
    let context = canvas.getContext("2d");
    let qttNodes = 1000;
    let main = new Main(canvas, context, qttNodes);
    main.run();

})();
