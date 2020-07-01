
class Graphics1D
{
    xmin = -10;
    xmax = 10;
    ymin = -10;
    ymax = 10;
    W = 512;
    H = 512;
    gridAmplifier = 1;
    f = function (x) {return x*x-9;};
    evaluate()
    {
        this.buf = new Map();
        for(let x=this.xmin; x<this.xmax; x += (-this.xmin + this.xmax) / this.W)
        {
            this.buf[x] = this.f(x);
        }
    }
    draw(dots = "red", axis = "lime", zeros = "indigo", gaps = "magenta", bg = "gray")
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
        for(let i=0;i<=this.W;i+=stepx*this.gridAmplifier)
        {
            ctx.beginPath();
            ctx.moveTo(i,0);
            ctx.lineTo(i,this.H);
            ctx.closePath();
            ctx.stroke();
        }
        for(let j=0;j<=this.H;j+=stepy*this.gridAmplifier)
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
            if (i!=this.xmin)
            {
                let cur = this.buf[i];
                let prev = this.buf[i - (-this.xmin + this.xmax) / this.W] ;
                if(cur*prev < 0 && (Math.abs(cur - prev) > this.ymax - this.ymin)) {
                    console.log(cur+" "+prev);
                    ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.fillStyle = gaps;
                    ctx.arc(zerox + i * stepx, zeroy, stepx / 10, 0, 180);
                    ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
                }
                else ctx.lineTo(zerox + i * stepx, zeroy - this.buf[i] * stepy);
            }
            else ctx.lineTo(zerox + i * stepx, zeroy - this.buf[i] * stepy);
        }
        ctx.stroke();
        ctx.closePath();


        ctx.font = 25 +"px Consolas";
        ctx.textBaseline = 'ideographic';
        ctx.fillStyle = "black";
        let mx = "(" + this.xmax + ", " + this.ymax + ")", mn = "(" + this.xmin + ", " + this.ymin + ")";
        ctx.fillText(
            mx,
            zerox + this.xmax * stepx - (25 * mx.length) / 1.8,
            zeroy + this.ymin * stepy + 25
        );
        ctx.fillText(
            mn, zerox + this.xmin * stepx,
            zeroy + this.ymax * stepy
        );


    }

    autodraw(dots = "red", axis = "green", zeros = "indigo", gaps = "magenta", bg = "gray")
    {
        this.ymin = this.f(this.xmin);
        this.ymax = this.f(this.xmax);
        this.draw(dots, axis, zeros, gaps, bg);
    }


}

function grid() {
    document.getElementById("gridamp").style.display = "block";
}

function replaceSpecialSequence(str) {
    //Тригонометрические функции
    str = str.split("cos").join("Math.cos");
    str = str.split("sin").join("Math.sin");
    str = str.split("tan").join("Math.tan");
    str = str.split("aMath.cos").join("Math.acos");
    str = str.split("aMath.sin").join("Math.asin");
    str = str.split("aMath.tan").join("Math.atan");
    str = str.split("pi").join("Math.PI");
    str = str.split("ln2").join("Math.LN2");
    str = str.split("ln10").join("Math.LN10");
    str = str.split("log2e").join("Math.LOG2E");
    str = str.split("log10e").join("Math.LOG10E");
    str = str.split("sqrt1_2").join("Math.SQRT1_2");
    str = str.split("sqrt2").join("Math.SQRT2");
    str = str.split("abs").join("Math.abs");
    str = str.split("ceil").join("Math.ceil");
    str = str.split("exp").join("Math.exp");
    str = str.split("floor").join("Math.floor");
    str = str.split("ln").join("Math.log");
    str = str.split("max").join("Math.max");
    str = str.split("min").join("Math.min");
    str = str.split("pow").join("Math.pow");
    str = str.split("round").join("Math.round");
    str = str.split("lg").join("logab");
    str = str.split("sqrt").join("Math.sqrt");
    str = str.split("e").join("Math.E");
    return str;
}

var x = new Graphics1D();
x.draw();
function CALCULATE()
{
    var If = document.getElementById("func").value,
        Ixmin = parseFloat(document.getElementById("xmin").value),
        Ixmax = parseFloat(document.getElementById("xmax").value),
        Iymin = parseFloat(document.getElementById("ymin").value),
        Iymax = parseFloat(document.getElementById("ymax").value),
        IW = parseFloat(document.getElementById("W").value),
        IH = parseFloat(document.getElementById("H").value);
        console.log(Ixmin, Ixmax, Iymin, typeof (Iymax), IW, IH, If);
        x.H = IH;
        x.W = IW;
        document.getElementById("C1").width = IW;
        document.getElementById("C1").height = IH;
        x.xmax = Ixmax;
        x.xmin = Ixmin;
        x.ymax = Iymax;
        x.ymin = Iymin;
        x.f = function(x) {return eval(replaceSpecialSequence(If));}
        if(document.getElementById("gridlow").checked) x.gridAmplifier=parseFloat(document.getElementById("gridamp").value);
        console.log(x.gridAmplifier+" "+typeof(x.gridAmplifier));
        x.draw();



}