var canvas=null, ctx =null,lastPress=null;
var mousex =0,mousey=0;
function init (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    y=canvas.height/2;
    //run and repaint functions
    run();
    repaint();
    
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
}
//repaint
function repaint(){
    window.requestAnimationFrame(repaint);
    paint(ctx);
}
function paint(ctx){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle='#FFF'
    ctx.textAlign='center';
    ctx.font='30px sans-serif'
    ctx.fillText('X: '+mousex,canvas.width/2,y);
    ctx.fillText('Y: '+mousey,canvas.width/2,y+30);
    ctx.strokeStyle='#FFF';
    ctx.lineWidth='5'
    ctx.strokeRect(mousex-25,mousey-25,50,50);
}
function act(){
}
window.addEventListener('load',init,false)