window.onload = init;

let canvas;
let ctx;
let etatJeu = "MenuPrincipal";
let assets;
let musiqueCourante;

// ici on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBallesVertes = [];
let tableauDesBallesRouges = [];
let tableauDesBallesBleue = [];
let tableauDesBallesPurple = [];
let tableauDesBallesMarron = [];


// programme principal
function init(){
  loadAssets(startGame);
}

function startGame(assetsLoaded){
// On récupère grace à la "selector API" un pointeur sur le canvas
canvas = document.querySelector("#myCanvas");
assets = assetsLoaded;
changeMusique(assets.intro);
// on ajoute des écouteurs souris/clavier sur le canvas
canvas.onmousedown = traiteMouseDown;
canvas.onmouseup = traiteMouseUp;
canvas.onmousemove = traiteMouseMove;

//canvas.addEventListener("mousedown", traiteMouseDown);
//canvas.addEventListener("mousedown", traiteMouseDown2);

// le canvas ne peut détecter les touches que si il a le focus (voir mooc)
// c'est plus simple de mettre l'écouteur sur le document (la page)
document.onkeydown = traiteKeyDown;
document.onkeyup = traiteKeyUp;

// pour dessiner, on a besoin de son "contexte graphique", un objet qui
// va permettre de dessiner, ou de changer les propriétés du canvas
// (largeur du trait, couleur, repère, etc.)

ctx = canvas.getContext("2d");

console.log(monstre.donneTonNom());

creerDesBallesVertes(1);
creerDesBallesRouges(1);

requestAnimationFrame(animationLoop);
setInterval(changePositionYeux, 300); // appelle la fonction changeCouleur toutes les n millisecondes
}


function creerDesBallesVertes(nb) {
  let tabRayon = [20,30,40,50];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let indexr = Math.floor(Math.random() * tabRayon.length);
    let r = tabRayon[indexr];
    let couleur = 'green';
    let vx =3+Math.random()*5;
    let vy =3+Math.random()*5;
    let b = new Balle(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBallesVertes.push(b);
  }
}
function creerDesBallesRouges(nb) {
  let tabRayon = [20,30];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let indexr = Math.floor(Math.random() * tabRayon.length);
    let r = tabRayon[indexr];
    let couleur = 'red';
    let vx =-3+Math.random()*10;
    let vy =-3+Math.random()*10;
    let b = new Balle(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBallesRouges.push(b);
  }
}
function creerDesBallesBleue(nb) {
  let tabRayon = [10,20,30];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let indexr = Math.floor(Math.random() * tabRayon.length);
    let r = tabRayon[indexr];
    let couleur = 'blue';
    let vx =1+Math.random()*10;
    let vy =1+Math.random()*10;
    let b = new Balle(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBallesBleue.push(b);
  }
}
function creerDesBallesPurple(nb) {
  let tabRayon = [10,20];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let indexr = Math.floor(Math.random() * tabRayon.length);
    let r = tabRayon[indexr];
    let couleur = 'purple';
    let vx =5+Math.random()*10;
    let vy =5+Math.random()*10;
    let b = new Balle(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBallesPurple.push(b);
  }
}
function creerDesBallesMarron(nb) {
  let tabRayon = [10,20,30];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let indexr = Math.floor(Math.random() * tabRayon.length);
    let r = tabRayon[indexr];
    let couleur = 'marron';
    let vx =-1+Math.random()*10;
    let vy =-1+Math.random()*10;
    let b = new Balle(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBallesMarron.push(b);
  }
}

/*function creerDesBalles(nb) {
  let tabCouleurs = ["red", "green"];
  let tabRayon = [10,20,30,40,50];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let indexr = Math.floor(Math.random() * tabRayon.length);
    let r = tabRayon[indexr];
    let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
    let couleur = tabCouleurs[indexCouleur];
    let vx =-5+Math.random()*10;
    let vy =-5+Math.random()*10;
    let b = new Balle(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBalles.push(b);
  }
}*/

// animation à 60 images/s
function animationLoop() {
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch (etatJeu) {
    case "MenuPrincipal":
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      updateJeu();
      break;
    case "GameOver":
      afficheEcranGameOver();
  }
  // 2 On dessine les objets

  
  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}
function afficheMenuPrincipal() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "White";
  ctx.font = "30pt Calibri";
  ctx.fillText("Bagarre.io", 205, 0);
  ctx.fillStyle = "white";
  ctx.fillText("Rules :", 90, 80);
  ctx.fillStyle = "green";
  ctx.fillText("GREEN : ", 130, 130);
  ctx.fillStyle = "white";
  ctx.fillText("Food ", 300, 130);
  
  ctx.fillStyle = "red";
  ctx.fillText("RED : ", 130, 165);
  ctx.fillStyle = "white";
  ctx.fillText("Ennemies", 300, 165);

  ctx.fillStyle = "blue";
  ctx.fillText("BLUE : ", 130, 200);
  ctx.fillStyle = "white";
  ctx.fillText("+1 Life", 300, 200);

  ctx.fillStyle = "purple";
  ctx.fillText("PURPLE :", 130, 235);
  ctx.fillStyle = "white";
  ctx.fillText("+1000 Points", 300, 235);

  ctx.fillStyle = "brown";
  ctx.fillText("BROWN :", 130, 270);
  ctx.fillStyle = "white";
  ctx.fillText("Kill All the ennemies", 300, 270,275);

  ctx.fillText("Cliquez ici pour démarrer", 100, 390);

  ctx.restore();
}

function traiteCollisionBalleRougesAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon,
      b.couleur = 'red',
    )
  ) {
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
    let indexR = tableauDesBallesRouges.indexOf(b);

    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    
    tableauDesBallesRouges.splice(indexR, 1); {

      score.debut -=100;
      score.vie -=1;
      changeMusique(assets.losslife);
    }
    
}
}function traiteCollisionBalleVertesAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon,
      b.couleur = 'green',
    )
  ) {
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles

    let indexV = tableauDesBallesVertes.indexOf(b);
    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    
   
    tableauDesBallesVertes.splice(indexV, 1); {
      score.debut +=200;
      changeMusique(assets.feed);
      


  }
}
}
function traiteCollisionBalleBleueAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon,
      b.couleur = 'blue',
    )
  ) {
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
 
    let indexB = tableauDesBallesBleue.indexOf(b);
    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    
    tableauDesBallesBleue.splice(indexB, 1); {
      score.vie += 1;
      changeMusique(assets.uplife);


  }
}
}
function traiteCollisionBallePurpleAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon,
      b.couleur = 'purple',
    )
  ) {
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
  
    let indexP = tableauDesBallesPurple.indexOf(b);
    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
   
    tableauDesBallesPurple.splice(indexP, 1); {
      score.debut += 2000;
      changeMusique(assets.jackpot);
      


  }
}
}

function traiteCollisionBalleMarronAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon,
      b.couleur = 'brown',
    )
  ) {
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles

    let indexM = tableauDesBallesMarron.indexOf(b);
    
    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    
    
    tableauDesBallesMarron.splice(indexM, 1); {
      
      changeMusique(assets.brown);
      }
    tableauDesBallesRouges =[];
  
  }
    
}

function updateBalles() {
  // utilisation d'un itérateur sur le tableau
  tableauDesBallesVertes.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleVertesAvecMonstre(b);
    b.move();
    
    
  });
  tableauDesBallesRouges.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleRougesAvecMonstre(b);
    b.move();
    
  });
    tableauDesBallesBleue.forEach((b) => {
      b.draw(ctx);
      traiteCollisionsBalleAvecBords(b);
      traiteCollisionBalleBleueAvecMonstre(b);
      b.move();
      
    });
    tableauDesBallesPurple.forEach((b) => {
      b.draw(ctx);
      traiteCollisionsBalleAvecBords(b);
      traiteCollisionBallePurpleAvecMonstre(b);
      b.move();
      
    });
    tableauDesBallesMarron.forEach((b) => {
      b.draw(ctx);
      traiteCollisionsBalleAvecBords(b);
      traiteCollisionBalleMarronAvecMonstre(b);
      b.move();
      
    });
  
  }

function updateJeu() {
  monstre.draw(ctx);
  score.draw(ctx);

  updateBalles();
  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();

  if (niveauFini()) {
    etatJeu = "EcranChangementNiveau";
  }

  if (score.vie == 0){
    etatJeu = "GameOver"
  }
}
 function niveauFini(){
  if (tableauDesBallesVertes==0){
    nb = 1;
    score.niveau += 1;
    creerDesBallesVertes(score.niveau-1);
    if(score.niveau<10){
    creerDesBallesRouges(score.niveau-2);}
    if(score.niveau%5 == 0){
      creerDesBallesBleue(1);
    }
    if(score.niveau%6 == 0){
      creerDesBallesPurple(1);
    }
    if(score.niveau%7 == 0){
      creerDesBallesMarron(1);
    }
    if(score.niveau%8 == 0){
      creerDesBallesBleue(3);
    }
    if(score.niveau%13 == 0){
      creerDesBallesMarron(1);
    }
    if(score.niveau%15 == 0){
      creerDesBallesBleue(2);
    }
    if(score.niveau> 9){
      creerDesBallesBleue(1);
      creerDesBallesRouges(5);
    }
  }
 }
 function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "red";
  ctx.font = "30pt Calibri";
  ctx.fillText("Game Over", 65, 20);
  ctx.fillText("Score : "+ score.debut, 65, 60);
  ctx.fillStyle = "white";
  ctx.fillText("Recommencer", 300, 250);
  tableauDesBallesRouges=[];
  tableauDesBallesVertes=[];
  tableauDesBallesBleue=[];
  tableauDesBallesPurple=[];
  tableauDesBallesMarron=[];

  ctx.restore();
 }


