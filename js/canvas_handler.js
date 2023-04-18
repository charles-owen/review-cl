class Tool {
    static num_paths = 0;
    constructor(owner) {
        this.handler = owner;
        this.pointer_down = false;
    }

    makePath(path_string, width, path_id) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", path_string);
        path.setAttributeNS(null, "stroke", this.handler.color);
        path.setAttributeNS(null, "stroke-linecap", 'round');
        path.setAttributeNS(null, "stroke-width", width);
        path.setAttributeNS(null, "fill", "transparent");
        path.setAttributeNS(null, "data-id", path_id);
        document.getElementById("drawing-svg").appendChild(path);
    }

    getLineWidth(event) {
        switch (event.pointerType) {
            case 'mouse':
                return this.handler.line_width | 0;
            case 'pen':
            case 'touch':
                return this.handler.line_width * event.pressure;
        }
    }

    deletePath(path_id) {
        // delete all elements with path id
        if (path_id !== null) document.querySelectorAll(`path[data-id="${path_id}"]`)
            .forEach(e => e.remove());
    }

    doDown(event) {
        this.pointer_down = true;
    }

    doUp(event) {
        this.pointer_down = false;
    }
}

class Pen extends Tool {
    static name = "pen";
    constructor(owner) {
        super(owner);

        this.n = 5;
        this.points = [];
        this.averaged_points = [];
    }

    doDown(event) {
        super.doDown(event);
    }

    doUp(event) {
        super.doUp(event);

        // draw path
        this.drawSplines(this.averaged_points);
        // clear canvas
        this.handler.ctx.clearRect(0, 0, this.handler.canvas.width, this.handler.canvas.height);

        // delete previous points
        this.averaged_points.length = 0;
        this.points.length = 0;
    }

    doMove(event) {
        if (this.pointer_down) {
            const x = event.clientX - this.handler.x_pos;
            const y = event.clientY - this.handler.y_pos;

            this.points.push(new Point(x, y, this.getLineWidth(event)));

            if (this.points.length == this.n) {
                this.points.shift();
                const loc = this.mean(this.points);
                this.averaged_points.push(loc);

                const from = this.averaged_points.at(-2);
                const to = this.averaged_points.at(-1);
                this.drawLine(from, to);
            }
        }
    }

    drawLine(from, to) {
        if (from === undefined) from = to;
        var dir = new Point(to.x - from.x, to.y - from.y);
        var angle = Math.atan2(dir.y, dir.x) - Math.PI / 2;

        this.handler.ctx.beginPath();
        this.handler.ctx.arc(to.x, to.y, to.w / 2, angle, angle + Math.PI);
        this.handler.ctx.arc(from.x, from.y, from.w / 2, angle + Math.PI, angle);
        this.handler.ctx.closePath()

        this.handler.ctx.fillStyle = this.handler.color;
        this.handler.ctx.fill();
    }

    drawSplines(pts) {
        if (pts.length) {
            var xc = pts[0].x;
            var yc = pts[0].y;

            for (var i = 1; i < pts.length - 2; i++) {
                var string = `M ${xc},${yc} `; // ctx.moveTo(xc, yc);
                xc = (pts[i].x + pts[i + 1].x) / 2;
                yc = (pts[i].y + pts[i + 1].y) / 2;
                string += `Q ${pts[i].x},${pts[i].y} ${xc},${yc}` // ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);

                this.makePath(string, pts[i - 1].w, Tool.num_paths);
            }
            string = `M ${xc},${yc} `; // ctx.moveTo(xc, yc);
            string += `Q ${pts[i].x},${pts[i].y} ${pts[i + 1].x},${pts[i + 1].y}` // ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            this.makePath(string, pts[i].w, Tool.num_paths);

            Tool.num_paths += 1;
        }
    }

    // find mean of an array of points
    mean(arr) {
        var sum = arr.reduce(
            (a, b) => new Point(a.x + b.x, a.y + b.y, a.w + b.w)
        );
        return new Point(sum.x / arr.length, sum.y / arr.length, sum.w / arr.length);
    }

}

class Eraser extends Tool {
    constructor(owner) {
        super(owner);
    }

    doDown(event) {
        super.doDown(event);
        this.doErase(event.clientX, event.clientY);
    }

    doUp(event) {
        super.doUp(event);
    }

    doMove(event) {
        if (this.pointer_down) {
            this.doErase(event.clientX, event.clientY);
        }
    }

    doErase(x, y) { /* override m */ }
}

class PathEraser extends Eraser {
    static name = "eraser";
    doErase(x, y) {
        // find topmost path on given coordinates
        var topmost_path = document.elementsFromPoint(x, y).find(el => el.tagName == "path");
        if (topmost_path !== undefined) {
            // delete it if found
            this.deletePath(topmost_path.getAttribute("data-id"));
        }
    }
}

class SegmentEraser extends Eraser {
    static name = "segment_eraser";
    doErase(x, y) {
        var segment = document.elementsFromPoint(x, y).find(el => el.tagName == "path");
        if (segment !== undefined) segment.remove();
    }
}

class Shape extends Tool {
    constructor(owner) {
        super(owner);

        this.mouse_start = null;
    }

    doDown(event) {
        super.doDown(event);
        Tool.num_paths += 1;

        const x = event.clientX - this.handler.x_pos;
        const y = event.clientY - this.handler.y_pos;
        this.mouse_start = new Point(x, y);
    }

    doUp(event) {
        super.doUp(event);
    }

    doMove(event) {
        if (this.pointer_down) {
            this.deletePath(Tool.num_paths);

            const x = event.clientX - this.handler.x_pos;
            const y = event.clientY - this.handler.y_pos;
            this.makeShape(this.mouse_start, new Point(x, y));
        }
    }

    makeShape(from, to) { /* override me */ }
}

class Line extends Shape {
    static name = "line_tool";
    makeShape(from, to) {
        var string = `M ${from.x} ${from.y} `;
        string += `L ${to.x} ${to.y}`
        this.makePath(string, this.handler.line_width, Tool.num_paths);
    }

}

class Rectangle extends Shape {
    static name = "rect_tool";
    makeShape(from, to) {
        var string = `M ${from.x} ${from.y} H ${to.x} V ${to.y} H ${from.x} Z`;
        this.makePath(string, this.handler.line_width, Tool.num_paths);
    }

}


export let CanvasHandler = function() {
    this.ispointerDown = false;
    this.line_width = 1;
    this.n = 5;
    this.num_paths = 0;

    this.tool = "pen";

    this.points = [];
    this.averaged_points = [];

    this.color = 'red';

    this.width = 0;
    this.height = 0;
    this.x_pos = 0;
    this.y_pos = 0;

    this.tools = [];

    this.canvas = null;
    this.ctx = null;
    this.svg = null;

    this.setSize = function(image_div) {
        var rect = image_div.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.x_pos = rect.x;
        this.y_pos = rect.y;

        // set canvas size
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        // set svg size
        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('height', this.height);

    }

    this.init = function() {
        // find canvas
        this.canvas = document.getElementById("drawing");
        // get context
        this.ctx = this.canvas.getContext("2d");
        // find svg
        this.svg = document.getElementById("drawing-svg");

        this.tools = [
            new Pen(this),
            new PathEraser(this),
            new SegmentEraser(this),
            new Line(this),
            new Rectangle(this),
        ];


        // attach event listeners
        this.addListeners(this.canvas);
        this.addListeners(this.svg);
    }

    this.pointerMove = function(event) {
        // dispatch event to corresponding tool
        this.tools.find(el => el.constructor.name === this.tool).doMove(event);
    }

    this.pointerDown = function(event) {
        // dispatch event to corresponding tool
        this.tools.find(el => el.constructor.name === this.tool).doDown(event);
    }

    this.pointerUp = function(event) {
        // dispatch event to corresponding tool
        this.tools.find(el => el.constructor.name === this.tool).doUp(event);
    }

    this.pointerEnter = function(event) {
        if (event.pointerType == 'pen' || event.pointerType == 'touch') {
            document.body.style.position = 'fixed';
            document.body.style.overflowY = 'scroll';
        }
    }

    this.pointerLeave = function(event) {
        if (event.pointerType == 'pen' || event.pointerType == 'touch') {
            document.body.style.position = 'static';
            document.body.style.overflowY = 'auto';
        }
    }

    this.addListeners = function(obj) {
        this.pointerDown = this.pointerDown.bind(this);
        this.pointerUp = this.pointerUp.bind(this);
        this.pointerMove = this.pointerMove.bind(this);
        this.pointerEnter = this.pointerEnter.bind(this);
        this.pointerLeave = this.pointerLeave.bind(this);

        obj.addEventListener("pointerdown", this.pointerDown, false);
        obj.addEventListener("pointerup", this.pointerUp, false);
        obj.addEventListener("pointermove", this.pointerMove, false);
        obj.addEventListener("pointerenter", this.pointerEnter, false)
        obj.addEventListener("pointerleave", this.pointerLeave, false)
    }

}

function Point(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
}

