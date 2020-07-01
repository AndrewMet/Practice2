
class Graphics1D
{
    xmin = -10;
    xmax = 10;
    ymin = -10;
    ymax = 10;
    W = 1000;
    H = 1000;
    f = function (x) {return x*x-9;};
    evaluate()
    {
        this.buf = new Map();
        for(let x=this.xmin; x<this.xmax; x += (-this.xmin + this.xmax) / this.W)
        {
            this.buf[x] = this.f(x);
        }
    }
    draw(dots = "red", axis = "green", zeros = "indigo", gaps = "magenta", bg = "gray")
    {
        var graph = document.getElementById("C1");
        var ctx = graph.getContext("2d");
        this.evaluate();
        let stepx = this.W / (-this.xmin + this.xmax), stepy = this.H / (-this.ymin + this.ymax),
            zerox = Math.abs(this.xmin) * stepx, zeroy = Math.abs(this.ymin) * stepy;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, this.W, this.H);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = axis;
        ctx.moveTo(0, zeroy);
        ctx.lineTo(this.W, zeroy);
        ctx.moveTo(zerox, 0);
        ctx.lineTo(zerox, this.H);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = axis;
        for(let i=0;i<=this.W;i+=stepx)
        {
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,this.H);
            ctx.closePath();
            ctx.stroke();
        }
        for(let j=0;j<=this.H;j+=stepy)
        {
            ctx.beginPath();
            ctx.moveTo(0,j);
            ctx.lineTo(this.W,j);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = dots;
        ctx.moveTo(zerox + this.xmin * stepx, zeroy - this.f(this.xmin) * stepy);
        for (let i = this.xmin; i <= this.xmax; i += (-this.xmin + this.xmax) / this.W)
        {
            if (this.buf[i])
            {
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = zeros;
                ctx.arc(zerox + i * stepx, zeroy - stepy * this.buf[i - 0.1], 3, 0, 180);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
            }
            else ctx.lineTo(zerox + i * stepx, zeroy - this.buf[i] * stepy);
            console.log(zeroy - this.buf[i] * stepy);
        }
        ctx.stroke();
        ctx.closePath();



    }

    autodraw(dots = "red", axis = "green", zeros = "indigo", gaps = "magenta", bg = "gray")
    {
        this.ymin = this.f(this.xmin);
        this.ymax = this.f(this.xmax);
        this.draw(dots, axis, zeros, gaps, bg);
    }


}
var x = new Graphics1D();
x.draw();