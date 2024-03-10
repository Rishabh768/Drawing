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
canvas.width=1517;
let isDrawing=false;
let x,y;
context.fillStyle="white";
context.fillRect(0,0,canvas.width,canvas.height)

function startDraw(e){
isDrawing=true;
[x,y]=[e.offsetX || e.touches[0].clientX,e.offsetY ||e.touches[0].clientX]
}

function draw(e){
    if (!isDrawing) return
    console.log("drwaing start");
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(e.offsetX,e.offsetY);
    context.strokeStyle=color;
    context.lineWidth = lineWidth;
    context.stroke();
    [x, y] = [e.offsetX || e.touches[0].clientX , e.offsetY || e.touches[0].clientY];
    }

function endDraw(){
isDrawing=false
}

let prev=null;
function getColors(e,col){
    color=e.target.id;
    console.log(e.target)
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


canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', endDraw);
