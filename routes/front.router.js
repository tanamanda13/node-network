    
/*
Configurer le module de route
*/
    const express = require('express');
    const router = express.Router();
//

/*
Définition des routes
*/
    // Accueil
    router.get('/', (req, res) => {
        res.render('index', { title: 'Bienvenue sur VoxPopulis', isLogged: false });
    });

    // Inscription
    router.get('/register', (req, res) => {
        res.render('register', { title: 'Créez votre compte', isLogged: false });
    });

    // Connexion
    router.get('/login', (req, res) => {
        res.render('login', { title: 'Connectez-vous', isLogged: false });
    });
//


/*
Exporter le module de route
*/
    module.exports = router;
//