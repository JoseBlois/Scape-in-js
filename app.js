(function(){
var canvas=null, ctx =null,lastPress=null;
var mousex =0,mousey=0,x=0,y=0;
var player = new Circle(x,y,15);
var target = new Circle (100,100,20)
function init (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=300;
    canvas.height=200;
    //run and repaint functions
    run();
    
}
//function Circle
function Circle(x,y,radius){
    this.x = (x === null)?0:x;
    this.y = (y === null)?0:y;
    this.radius = (radius ===null)?0:radius;
}
Circle.prototype.draw = function(ctx){
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
    ctx.stroke();
}
Circle.prototype.distance=function(circle){
    if(circle!=null){
        var dx=this.x-circle.x;
        var dy=this.y-circle.y;
        return(Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));}
    };
//Mouse detection
document.addEventListener('mousemove',function(evt){
    mousex=evt.pageX-canvas.offsetLeft;
    mousey=evt.pageY-canvas.offsetTop;
},false);
//run
function run(){
    setTimeout(run,50);
    //console.log('+1')
    act();
    paint(ctx)
}
//repaint
// function repaint(){
//     window.requestAnimationFrame(repaint);
//     paint(ctx);
// }
function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle='#FFF'
    ctx.textAlign='left'
    ctx.fillText('X: '+player.x,0,20);
    ctx.fillText('Y: '+player.y,0,30);
    ctx.fillText('Distance: '+player.distance(target).toFixed(1),0,10)
    ctx.strokeStyle='#F00';
    if(target.distance(player)<=0){
        ctx.strokeStyle='#0f0'
        if(target.x == player.x && target.y ===player.y){
            ctx.strokeStyle='#f0f'
        }
    }
    player.draw(ctx);
    target.draw(ctx)
}
function act(){
    player.x=mousex;
    player.y=mousey;
    if(player.x<0){
        player.x=0
    }
    if(player.x > canvas.width){
        player.x=canvas.width
    }
    if(player.y<0){
        player.y=0;
    }
    if(player.y>canvas.height){
        player.y=canvas.height
    }
}
window.addEventListener('load',init,false)
window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame ||            
        window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
    function(callback){window.setTimeout(callback,17);};
    })();
})();
