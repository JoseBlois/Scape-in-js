var canvas=null, ctx =null;lastPress=null;
function init (){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    y=canvas.height/2;
    //run and repaint functions
    run();
    repaint();
    
}
//Keydown event
document.addEventListener('keydown',function(evt){
    lastPress = evt.keyCode;
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
    ctx.fillText('Last press: '+lastPress,canvas.width/2,y);
}
function act(){
    if(lastPress ===40 ){
        y=y+10
    }
}
window.addEventListener('load',init,false)