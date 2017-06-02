(() => {
    class Node {
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
    }

    class Main {
        constructor(canvas, context){
            this.canvas = canvas;
            this.context = context;
            this.canvas.width = 1000;
            this.canvas.height = 300;
        }

        run(){
            this.drawCircle(Math.random(), Math.random());
            this.drawCircle(Math.random(), Math.random());
            this.drawCircle(Math.random(), Math.random());
            this.drawCircle(Math.random(), Math.random());
            this.drawCircle(Math.random(), Math.random());
            this.drawCircle(Math.random(), Math.random());
            this.drawCircle(Math.random(), Math.random());
        }

        drawCircle(x, y){
            let radius = 10;
            this.context.beginPath();
            this.context.arc(x * this.canvas.width, y * this.canvas.height, radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = 'green';
            this.context.fill();
            this.context.lineWidth = 5;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        }

         getDistance(nodeA, nodeB){
            return Math.sqrt(Math.pow((nodeA.x - nodeB.x),2) + Math.pow((nodeA.y - nodeB.y),2));
        }

    }

    let canvas = document.getElementById("main-canvas");
    let context = canvas.getContext("2d");
    let main = new Main(canvas, context);
    main.run();

})();
