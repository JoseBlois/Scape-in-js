(function(){
var canvas=null, ctx =null,lastPress=null;
var mousex =0,mousey=0,x=0,y=0;
function init (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width=300;
    canvas.height=200;
    //run and repaint functions
    run();
    
}
//Keydown event
// document.addEventListener('keydown',function(evt){
//     lastPress = evt.keyCode;
// },false);

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
    ctx.font='30px sans-serif'
    ctx.textAlign='left'
    ctx.fillText('X: '+x,0,30);
    ctx.fillText('Y: '+y,0,60);
    ctx.strokeStyle='#F00';
    ctx.lineWidth='3';
    ctx.beginPath();
    ctx.arc(x,y,20,0,Math.PI*2,true);
    ctx.stroke();
}
function act(){
    x=mousex
    y=mousey
    if(x<0){
        x=0
    }
    if(x > canvas.width){
        x=canvas.width
    }
    if(y<0){
        y=o;
    }
    if(y>canvas.height){
        y=canvas.height
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
