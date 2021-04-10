const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const edge = 140;

const mouse = {
    x : null,
    y : null
};

var drawing = false;

window.addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

class Root{
    constructor(x,y,color,centerX,centerY){
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    draw(){
        
        this.speedX += (Math.random() - 0.5)/2;
        this.speedY += (Math.random() - 0.5)/2;
        this.x += this.speedX;
        this.y += this.speedY;
        //Calculate Radius
        const distanceX = this.x - this.centerX,
              distanceY = this.y - this.centerY,
              distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY),
              radius = (-distance/edge + 1) * edge/10;
        
        if (radius>0){
            
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x,this.y,radius,0,2*Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}

function branchOut(){
    if (drawing){
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i=0;i<3;i++){
            const root = new Root(mouse.x,mouse.y,'pink',centerX,centerY);
            root.draw();
        }
    }
}

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove',()=>{
    
    branchOut();
});

window.addEventListener('mousedown',()=>{
    drawing = true;
})

window.addEventListener('mouseup',()=>{
    drawing = false;
})
const btn = document.getElementById('clear')

btn.addEventListener('click',()=>{
    console.log('lul')
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
})