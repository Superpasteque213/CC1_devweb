"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");


function launchGame(_evt) {
  let secretNumber = 0;
  let nbGuesses = 0;
  let maxGuesses = 0;
  let nmb                     // ici on déclare le nombre testé par l'utilisateur 
  let game_finished = false;  // on déclare que la partie n'est pas terminée

  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  // TODO : compléter ici

  $guessBtn.removeAttribute('disabled')
  $output.innerHTML = "Trouvez le nombre secret entre 1 et "+$maxUsr.value+" en "+maxGuesses+" essais"

  

  $guessBtn.addEventListener('click',handler)
  $numUsr.addEventListener('keypress', function (event){
    if(event.key == 'Enter'){
      handler()
    }
  })
  
  function handler(){ // la fonction executée à chaque touche entrée ou clique sur le bouton de verification
    

    nbGuesses ++

    nmb = $numUsr.value
    nmb = Number(nmb)
    if (isNaN(nmb)){
      $output.innerHTML = "Veuillez spécifier un nombre valide" 
      nbGuesses--
      return
    }

    if (nmb > secretNumber){
      $output.innerHTML = "Le nombre secret est inferieur à "+nmb+" / esssais restants : "+(maxGuesses-nbGuesses)
    }

    if (nmb < secretNumber){
      $output.innerHTML = "Le nombre secret est superieur à "+nmb+" / esssais restants : "+(maxGuesses-nbGuesses)
    }

    if (nmb == secretNumber){
      $output.innerHTML = "Félicitaions ! Le nombre secret etait "+nmb+" !"
      game_finished = true
    }

    

    if (nbGuesses >= maxGuesses){  // on vérifie si le joueur a epuisé ses essais
      if (!game_finished){ // on affiche le message de défaite seulement si l'utilisateur n'a pas gagné vaant ;)
        $output.innerHTML = "Perdu ! vous avez epuisé vos "+maxGuesses+" essais (le nombre secret etait "+secretNumber+" !)"
      }
      game_finished = true
    }

    if (game_finished){ // la partie est terminée soit par victoire soit par epuisement des essais : on enleve le listener et on desacttive le bouton
      $guessBtn.removeEventListener('click', handler)
      $guessBtn.setAttribute('disabled',"")
    } 
  }
}

$startBtn.addEventListener("click", launchGame);



function addCow(evt) {
  console.debug(evt.x, evt.y);
  // TODO : compléter ici
  let $vache = document.createElement("img");
  $vache.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg");
  $vache.classList.add("cow");
  $vache.style.left = evt.x + "px" ;
  $vache.style.top = evt.y+ "px" ;
  $vache.style.transform = "rotate("+Math.random() * 360+"deg)"

  document.body.appendChild($vache);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);

