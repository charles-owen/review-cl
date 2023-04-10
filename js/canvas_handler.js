class Tool {
    constructor(name, description, owner) {
        this.name = name;
        this.description = description;
        owner.tools.push(this);
    }
}

class Pen extends Tool {
    constructor(name, description, owner) {
        super(name, description, owner);
        this.mouse_down = false;
    }

    doDown(event) {
        this.mouse_down = true;
    }

    doUp(event) {

    }

    doMove(event) {

    }
}


export let CanvasHandler = function() {
    this.ispointerDown = false;
    this.line_width = 1;
    this.pressureEnabled = true;
    this.n = 5;
    this.hasMoved = false;
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

    this.setSize = function(image_div) {
        var rect = image_div.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.x_pos = rect.x;
        this.y_pos = rect.y;

        // find canvas
        var canvas = document.getElementById("drawing");
        // find svg
        var svg = document.getElementById("drawing-svg");

        // set canvas size
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);

        // set svg size
        svg.setAttribute('width', this.width);
        svg.setAttribute('height', this.height);

    }

    this.init = function() {
        // find canvas
        var canvas = document.getElementById("drawing");
        // find svg
        var svg = document.getElementById("drawing-svg");

        // attach event listeners
        this.addListeners(canvas);
        this.addListeners(svg);
    }

    this.getLineWidth = function(event) {
        switch (event.pointerType) {
            case 'mouse':
                return this.line_width | 0;
            case 'pen':
            case 'touch':
                return this.pressureEnabled ? this.line_width * event.pressure | 0 : this.line_width | 0;
        }
    }

    this.drawPoint = function(ctx, point) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.w, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.drawLine = function(ctx, from, to) {
        if (from === undefined) from = to;
        var dir = new Point(to.x - from.x, to.y - from.y);
        var angle = Math.atan2(dir.y, dir.x) - Math.PI / 2;

        ctx.beginPath();
        ctx.arc(to.x, to.y, to.w / 2, angle, angle + Math.PI);
        ctx.arc(from.x, from.y, from.w / 2, angle + Math.PI, angle);
        ctx.closePath()

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.drawSplines = function(pts) {
        if (pts.length) {
            var xc = pts[0].x;
            var yc = pts[0].y;

            for (var i = 1; i < pts.length - 2; i++) {
                var string = `M ${xc},${yc} `; // ctx.moveTo(xc, yc);
                xc = (pts[i].x + pts[i + 1].x) / 2;
                yc = (pts[i].y + pts[i + 1].y) / 2;
                string += `Q ${pts[i].x},${pts[i].y} ${xc},${yc}` // ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);

                this.makePath(string, pts[i - 1].w, this.num_paths);
            }
            string = `M ${xc},${yc} `; // ctx.moveTo(xc, yc);
            string += `Q ${pts[i].x},${pts[i].y} ${pts[i + 1].x},${pts[i + 1].y}` // ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
            this.makePath(string, pts[i].w, this.num_paths);

            this.num_paths += 1;
        }

    }


    this.penMove = function(ctx, x, y, line_width) {
        // add point to buffer
        this.points.push(new Point(x, y, line_width));

        if (this.points.length == this.n) {
            this.points.shift();
            var loc = mean(this.points);
            this.averaged_points.push(loc);

            var from = this.averaged_points.at(-2);
            var to = this.averaged_points.at(-1);
            this.drawLine(ctx, from, to);
        }
    }

    this.pointerMove = function(event) {
        var x = event.clientX - this.x_pos;
        var y = event.clientY - this.y_pos;
        this.hasMoved = true;


        if (this.ispointerDown) {
            // get context
            var canvas = document.getElementById("drawing");
            var ctx = canvas.getContext("2d");

            switch(this.tool) {
                case "pen":
                    this.penMove(ctx, x, y, this.getLineWidth(event));
                    break;
                case "eraser":
                    this.deletePath(this.pathIdFromPoint(x, y));
                    break;
                // case "segment_eraser":
                //     deleteSegment(x, y);
                //     break;
            }

        }
    }

    this.pointerDown = function(event) {
        var x = event.clientX - this.x_pos;
        var y = event.clientY - this.y_pos;

        this.averaged_points.length = 0;

        // set mouse down
        this.ispointerDown = true;
        this.hasMoved = false;

        switch(this.tool) {
            case "eraser":
                this.deletePath(this.pathIdFromPoint(x, y));
                break;
            // case "segment_eraser":
            //     deleteSegment(x, y);
            //     break;
        }
    }

    this.pointerUp = function(event) {
        this.ispointerDown = false;
        this.points.length = 0;

        var canvas = document.getElementById("drawing");
        var ctx = canvas.getContext("2d");

        var x = event.clientX - this.x_pos;
        var y = event.clientY - this.y_pos;

        switch(this.tool) {
            case "pen":
                if (!this.hasMoved) this.drawPoint(ctx, new Point(x, y, this.getLineWidth(event) / 2));
                // draw path
                this.drawSplines(this.averaged_points);
                // clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                break;
        }
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

    this.makePath = function(path_string, width, path_id) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", path_string);
        path.setAttributeNS(null, "stroke", this.color);
        path.setAttributeNS(null, "stroke-linecap", 'round');
        path.setAttributeNS(null, "stroke-width", width);
        path.setAttributeNS(null, "fill", "transparent");
        path.setAttributeNS(null, "data-id", path_id);
        document.getElementById("drawing-svg").appendChild(path);
    }

    this.deletePath = function(path_id) {
        // delete all elements with path id
        if (path_id !== null) document.querySelectorAll(`path[data-id="${path_id}"]`)
            .forEach(e => e.remove());
    }

    this.pathIdFromPoint = function(x, y) {
        var topmost_path = document.elementsFromPoint(x + this.x_pos, y + this.y_pos).find(el => el.tagName == "path");
        if (topmost_path === undefined) return null;
        return topmost_path.getAttribute("data-id");
    }

}

function Point(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
}

// find mean of an array of points
function mean(arr) {
    var sum = arr.reduce(
        (a, b) => new Point(a.x + b.x, a.y + b.y, a.w + b.w)
    );
    return new Point(sum.x / arr.length, sum.y / arr.length, sum.w / arr.length);
}

function deleteSegment(x, y) {
    document.elementsFromPoint(x, y).find(el => el.tagName == "path").remove();
}
