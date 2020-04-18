(function(){
var canvas=null, ctx =null,lastPress=null;
var mousex =0,mousey=0,x=0,y=0;
var player = new Circle(x,y,15);
var target = new Circle (100,100,20)
var score = 0;
var bgColor='#0f0';
var img = new Image();
var counter=15;
var lastUpdate=null;
var pause = true;
var gameover=true;
function reset(){
    score=0;
    counter=15;
    gameover=false;
    pause=true;
}
function init (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=300;
    canvas.height=200;
    //declaring the images
    img.src='assets/img.png'
    //run and repaint functions
    enableInputs();
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
Circle.prototype.drawImage = function (ctx,img){
    if(img.width){
   ctx.drawImage(img,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
    }else this.stroke(ctx)
}
//Mouse detection
function enableInputs(){
document.addEventListener('mousemove',function(evt){
    mousex=evt.pageX-canvas.offsetLeft;
    mousey=evt.pageY-canvas.offsetTop;
},false);
document.addEventListener('mousedown',function(evt){
    lastPress=evt.which;
},false);
}
//run
function run(){
    window.requestAnimationFrame(run);
    //console.log('+1')
    var now = Date.now()
    var deltaTime = (now-lastUpdate)/1000;
    if(deltaTime>1){
        deltaTime=0;
    }
    lastUpdate=now;
    act(deltaTime);
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
    // ctx.fillText('X: '+player.x,0,20);
    // ctx.fillText('Y: '+player.y,0,30);
    ctx.strokeStyle=bgColor;
    player.draw(ctx);
    target.drawImage(ctx,img)
    ctx.font='10px sans-serif'
    ctx.fillText('Distance: '+player.distance(target).toFixed(1),0,10)
    ctx.fillText('Lastpress: '+lastPress,0,40);
    ctx.fillText('Time: '+counter.toFixed(0),0,30);
    ctx.fillText('Score: '+score,0,20)
    lastPress=null;

    if(pause){
        ctx.font='20px sans-serif'
        if(gameover){
            ctx.textAlign='center';
            ctx.fillText('Click to reset',canvas.width/2,canvas.height/2-50);
            ctx.fillText('Score: '+score,canvas.width/2,canvas.height/2-30);
        }else{
            ctx.textAlign='center';
            ctx.fillText('Click to start',canvas.width/2,canvas.height/2);
        }
    }
}
function act(deltaTime){
        player.x=mousex;
        player.y=mousey;
         
            //  if(gameover){
            //      reset()
            //  }
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
    if(!pause){
        counter-=deltaTime;
        if(counter<=0){
            gameover=true;
            pause=true;
            counter=0;
        }
        if(lastPress===1){
            bgColor ='#F00';
            if(player.distance(target)<0){
            score++;
            target.x= random(canvas.width/10)*10+target.radius;
            target.y= random(canvas.height/10)*10+target.radius;
        }
        }else{
        bgColor='#0f0'
        }
    }else if(lastPress===1){
        if (gameover){
            gameover=false;
            counter=15;
            score=0;
            target.x=canvas.width/2
            target.y=canvas.height/2
        }else {pause=false;
        lastPress=null;
        target.x=random(canvas.width/10)*10+target.radius;
        target.y=random(canvas.height/10)*10+target.radius;
        }
    }
}
function random(max){
    return ~~(Math.random()*max);
}
window.addEventListener('load',init,false)
window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame ||            
        window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
    function(callback){window.setTimeout(callback,17);};
    })();
})();
