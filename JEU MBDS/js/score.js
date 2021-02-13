let score = {
    x:0,
    y:0,
    l:150,
    h:50,
    debut:0,
    vie:5,
    niveau :1,

draw: function(ctx){
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.fillRect(this.x, this.y, this.l, this.h);
    ctx.strokeRect(this.x, this.y, this.l, this.h);
    ctx.font = "20pt Calibri";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "red";
  
    ctx.fillText("Vie : "+ score.vie, 0,this.h/2-5, this.l);
    ctx.fillText("Niv : "+ score.niveau, 0,this.h-5, this.l);
    


    ctx.translate(1050,0);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.fillRect(this.x, this.y, this.l, this.h);
    ctx.strokeRect(this.x, this.y, this.l, this.h);
    ctx.fillStyle = "red";
    ctx.fillText("Score : "+ score.debut, 0,this.h/2, this.l);
    ctx.restore();
}

}