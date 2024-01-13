

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;                // Quand on a 2 cartes ouvertes ça va verouiller l'écran 




function retourneCarte() {
    
    if (verouillage) return;

    // console.log(this);                 // Répresente objet courant, ici carte sur laquelle on clique
    // console.log(this.childNodes);      // Sélectionne ses noeuds enfants (éléments HTML et retour à la ligne) à l'objet courant carte

    this.childNodes[1].classList.toggle('active');          // Carte cliquée se retoune 

    if (!carteRetournee) {                // !carteRetournee = true;
        
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    // console.log(premiereCarte, secondeCarte);

    correspondance();

}



function correspondance() {

    if (premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);
    }

    else {
        verouillage = true;                

        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');         // Au bout de 1500ms la carte va se retourner
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;            // A la fin du setTimeout on dévérouille
        }, 1500)
    }
}


function shuffle(a)    // Propriété order qui va disposer nos images
{
  var j = 0;
  var valI = '';
  var valJ = valI;
  var l = a.length - 1;
  while(l > -1)
  {
    j = Math.floor(Math.random() * l);
    valI = a[l];
    valJ = a[j];
    a[l] = valJ;
    a[j] = valI;
    l = l - 1;
  }
  return a;
}

function affiche() {
    img = [
        "memory_cactus.png", "memory_cactus.png",
        "memory_rainbow.png", "memory_rainbow.png",
        "memory_watermelon.png", "memory_watermelon.png",
        "memory_icecream.png", "memory_icecream.png",
        "memory_sorbet.png", "memory_sorbet.png",
        "memory_lolipop.png", "memory_lolipop.png",
              ];
  
              shuffle(img);

  var game = document.getElementById('grille');
  
       jeu="";
      var i;
   
      for(i = 0; i < img.length; i++){
          
  jeu += "<div class=\"carte\" data-attr=\" "+ img[i] +"\"> <div class=\"double-face\"> <div class=\"face\" > <img src=\"ressources/" + img[i] + "\">  </div> <div class=\"arriere\">   ❓  </div></div> </div>"
  
        }
      
      
       game.innerHTML =  jeu;

    }


    affiche()



 let c2 = document.querySelectorAll('.carte');
           
c2.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})


/*

NOTES :

On fait démarrer carteRetournee à false
!carteRetournee = true donc la première fois la condition va fonctionner
premiereCarte = this  correspond à la carte cliquée
Une fois on rentrera dans le if la fois suivante on n'y rentrera pas car !carteRetournee sera à false
Cela va nous permettre de stocker deux cartes sur lesquelles on va cliquer (un peu comme un toggle)

*/