// exemple d'objet litteral
let monstre = {
  x: 50,
  y: 50,
  l: 40,
  h: 40,
  scale: 1,
  incScale: 0,
  xOeil: 450,
  yOeil: 60,
  angle: 0,
  incAngle: 0,
  vitesseX: 0,
  vitesseY: 0,
  donneTonNom: function () {
    return "Je m'appelle Paul, je suis en x= " + this.x + " y=" + this.y;
  },
  
  draw: function (ctx) {
    // bonne pratique : sauver le contexte courant
    // couleur courante, taille du trait, etc. avant
    // de dessiner ou de modifier qq chose dans le contexte
    ctx.save();
   
    ctx.translate(this.x, this.y);

    ctx.translate(this.l / 2, this.h / 2);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.angle);
    ctx.translate(-this.l / 2, -this.h / 2);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.l, this.h);
    this.drawOeil(ctx);
    
    // On restaure le contexte
    ctx.restore();
  },
  drawOeil(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.arc(75/4, 75/4, 50/4, 0, Math.PI * 2, true);  // Cercle extérieur
    ctx.moveTo(110/4,75/4);
    ctx.arc(75/4, 75/4, 35/4, 0, Math.PI, false);  // Bouche (sens horaire)
    ctx.moveTo(65/4, 65/4);
    ctx.arc(60/4, 65/4, 5/4, 0, Math.PI * 2, true);  // Oeil gauche
    ctx.moveTo(95/4, 65/4);
    ctx.arc(90/4, 65/4, 5/4, 0, Math.PI * 2, true);  // Oeil droite
    ctx.stroke();

    ctx.restore();
  },
  setPos: function (x, y) {
    this.x = x - this.l / 2;
    this.y = y - this.h / 2;
  },
  move: function () {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
    this.angle += this.incAngle;
    this.scale += this.incScale;
    if (this.scale > 2) this.incScale = -this.incScale;
    if (this.scale < 1) this.incScale = -this.incScale;
  },
  animeYeux: function () {
    this.xOeil = 450 + Math.random() * 5;
    this.yOeil = 60 + Math.random() * 5;
  },
};

function changePositionYeux() {
  //console.log("change changePositionYeux");
  monstre.animeYeux();
}
