let formulaire = document.getElementById('mon_formulaire');
let regexlibelle = /^[a-zA-Z\s]+$/;
let regexdescription = /^[a-zA-Z\s]+$/;   
let minlibelle = 5;
let maxlibelle = 30;
let mindesc = 5;
let maxdesc = 255;

formulaire.addEventListener('submit', function(e) {
    e.preventDefault();

    let libelle = document.getElementById('libelle_input');
    let erreur_libelle = document.getElementById('error');
    
    if (libelle.value.trim() === "") { 
        erreur_libelle.innerHTML = "Le libelle est requis";
        erreur_libelle.style.color = 'red';
    } else if(libelle.value.length < minlibelle || libelle.value.length > maxlibelle){
        erreur_libelle.innerHTML = `Le libelle doit etre compris entre ${minlibelle} et  ${maxlibelle} `;
        erreur_libelle.style.color = 'red';
        valid = false;

    } else if(!regexlibelle.test(libelle.value)){
        erreur_libelle.innerHTML = `veuillez bien regarder les caracteres saisis`;
        erreur_libelle.style.color = 'red';
    }

   
    let categorieSelect = document.getElementById('categorie_input');

    categorieSelect.addEventListener('change', function() {
        // Afficher le bouton Soumettre après avoir sélectionné une catégorie
        document.getElementById('submit_btn').classList.remove('hidden');
    });

    let desc = document.getElementById('desc_input');
    let erreur_desc = document.getElementById('error_desc');
    valid = true;

    if (desc.value.trim() === "") {
        erreur_desc.innerHTML = "La description de l'idee est requise";
        erreur_desc.style.color = 'red';
    } else if (desc.value.length < mindesc || desc.value.length > maxdesc) {
        erreur_desc.innerHTML = `La description de l'idee doit contenir entre ${mindesc} et ${maxdesc} caractères`;
        erreur_desc.style.color = 'red';
    } else if(!regexdescription.test(desc.value)){
        erreur_desc.innerHTML = `veuillez bien regarder les caracteres saisis`;
        erreur_libelle.style.color = 'red';    }

    // Si toutes les validations sont réussies
  if(valid){
    submitbouton = document.getElementById('submit_btn');
    submitbouton.addEventListener('click', function(){
        document.getElementById('mon_contenu').classList.add('hidden');
    document.getElementById('success_message').classList.remove('hidden');


  })}




})