const canvas=document.getElementById('drawing');
const context=canvas.getContext("2d");
const colors=document.querySelectorAll(".colors")


const reset=document.getElementById('reset').addEventListener('click',()=>{
    canvas.width=canvas.width
})

const save=document.getElementById('save').addEventListener('click',
()=>{
    let dataURL= canvas.toDataURL()
    
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas_image.png';
    link.click();

});
let color;
let lineWidth;
const line=document.getElementById('lineWidth');
line.addEventListener('change',(e)=>{
    lineWidth=e.target.value -1 
})

canvas.height=800;
canvas.width=window.innerWidth;
let isDrawing=false;
let x,y;
context.fillStyle="white";
context.fillRect(0,0,canvas.width,canvas.height)

function startDraw(e){
     if(e.type=="touchstart"){
        console.log("touch start")
      isDrawing=true;
        const touchX=e.touches[0].clientX;
        const touchY=e.touches[0].clientY;
        [x, y] = [touchX , touchY];
     }
     if(e.type=="mousedown"){
         isDrawing=true;
         [x, y] = [e.offsetX , e.offsetY];
     }
}

function draw(e){
    if (!isDrawing) return
    if(e.type=='touchmove'){
        console.log("draw start")
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(e.touches[0].clientX,e.touches[0].clientY);
        context.strokeStyle=color;
        context.lineWidth = lineWidth;
        context.stroke();
        [x, y] = [e.touches[0].clientX , e.touches[0].clientY];
    }
    if(e.type=='mousemove'){
        console.log("draw start")
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(e.offsetX,e.offsetY);
        context.strokeStyle=color;
        context.lineWidth = lineWidth;
        context.stroke();
        [x, y] = [e.offsetX , e.offsetY];
    }

    }

function endDraw(){
isDrawing=false
console.log("touchend")
}

let prev=null;
function getColors(e,col){
    color=e.target.id;
    if(prev !== null){
     prev.style.border='';
     }
    prev=e.target;
    col.border="2px solid black";

}

colors.forEach(color => {
    const col=color.style;
    color.addEventListener('click',(e)=>{getColors(e,col)});
});


canvas.addEventListener('mousedown',startDraw);
canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup',endDraw);
canvas.addEventListener('mouseout',endDraw);


canvas.addEventListener('touchstart', startDraw,{passive:true});
canvas.addEventListener('touchmove', draw,{passive:false});
canvas.addEventListener('touchend', endDraw,{passive:true});
