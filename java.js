document.addEventListener('DOMContentLoaded', function() {
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
        let categorieSelect = document.getElementById('categorie_input');
        let desc = document.getElementById('desc_input');
        let erreur_desc = document.getElementById('error_desc');
        let valid = true;

        // Validation du libellé
        if (libelle.value.trim() === "") { 
            erreur_libelle.innerHTML = "Le libelle est requis";
            erreur_libelle.style.color = 'red';
            valid = false;
        } else if (libelle.value.length < minlibelle || libelle.value.length > maxlibelle) {
            erreur_libelle.innerHTML = `Le libelle doit être compris entre ${minlibelle} et ${maxlibelle}`;
            erreur_libelle.style.color = 'red';
            valid = false;
        } else if (!regexlibelle.test(libelle.value)) {
            erreur_libelle.innerHTML = `Veuillez bien regarder les caractères saisis`;
            erreur_libelle.style.color = 'red';
            valid = false;
        }

        // Validation de la description
        if (desc.value.trim() === "") {
            erreur_desc.innerHTML = "La description de l'idée est requise";
            erreur_desc.style.color = 'red';
            valid = false;
        } else if (desc.value.length < mindesc || desc.value.length > maxdesc) {
            erreur_desc.innerHTML = `La description de l'idée doit contenir entre ${mindesc} et ${maxdesc} caractères`;
            erreur_desc.style.color = 'red';
            valid = false;
        } else if (!regexdescription.test(desc.value)) {
            erreur_desc.innerHTML = `Veuillez bien regarder les caractères saisis`;
            erreur_desc.style.color = 'red';
            valid = false;
        }

        // Afficher le bouton Soumettre après avoir sélectionné une catégorie
        categorieSelect.addEventListener('change', function() {
            document.getElementById('submit_btn').classList.remove('hidden');
        });

        // Si toutes les validations sont réussies
        if (valid) {
            const idee = {
                libelle: libelle.value,
                desc: desc.value,
                categorie: categorieSelect.value
            };
            localStorage.setItem("idee", JSON.stringify(idee));
            afficherIdee(idee.libelle, idee.categorie, idee.desc);
            // Réinitialiser le formulaire après soumission
            formulaire.reset();
            // Masquer le bouton Soumettre après réinitialisation
            document.getElementById('submit_btn').classList.add('hidden');
        }
    });

    // Afficher toutes les idées stockées dans le local storage lors du chargement de la page
    afficherToutesIdees();

    function afficherToutesIdees() {
        const local = JSON.parse(localStorage.getItem("idee"));
        if (local != null) {
            if (Array.isArray(local)) {
                local.forEach(function(idee) {
                    afficherIdee(idee.libelle, idee.categorie, idee.desc);
                });
            } else {
                afficherIdee(local.libelle, local.categorie, local.desc);
            }
        }
    }

    function afficherIdee(libelle, categorie, desc) {
        const messageContainer = document.querySelector('.list_idee');
        const nouvelleIdee = document.createElement('div');
        nouvelleIdee.classList.add('une_idee');
        nouvelleIdee.innerHTML = `
            <h5>Libellé: ${libelle}</h5>
            <h5>Catégorie: ${categorie}</h5>
            <h5>Description: ${desc}</h5>
            <button class="btn-approuver">Approuver</button>
            <button class="btn-desapprouver hidden">Désapprouver</button>
            <i class="fas fa-trash" style="color: #cf1732;"></i>
        `;
        messageContainer.appendChild(nouvelleIdee);

        // Gestion des boutons Approuver et Désapprouver
        const btnApprouver = nouvelleIdee.querySelector('.btn-approuver');
        const btnDesapprouver = nouvelleIdee.querySelector('.btn-desapprouver');

        btnApprouver.addEventListener('click', function() {
            nouvelleIdee.style.border = '2px solid green';
            btnApprouver.classList.add('hidden');
            btnDesapprouver.classList.remove('hidden');
        });

        btnDesapprouver.addEventListener('click', function() {
            nouvelleIdee.style.border = '2px solid red';
            btnDesapprouver.classList.add('hidden');
            btnApprouver.classList.remove('hidden');
        });
    }

    // Gérer la suppression d'une idée
    document.querySelector('.list_idee').addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-trash')) {
            const ideeDiv = e.target.parentElement;
            ideeDiv.remove();
            localStorage.removeItem("idee");
        }
    });
});
