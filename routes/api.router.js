    
/*
Configurer le module de route
*/
    const express = require('express');
    const router = express.Router();
    const bcrypt = require('bcryptjs');
//

/* 
Configure MySQL
*/
    const mysql = require('mysql');
    const connexion = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port: 8889,
        database : 'node-boiler-plate'
    });
    connexion.connect();
//

/* 
route Auth
*/
    // Register new user
    router.post('/auth/register', (req, res) => {
        if( 
            req.body &&
            req.body.pseudo.length > 1 &&
            req.body.email.length > 4 &&
            req.body.password.length > 4
        ){
            // Generate password hash
            bcrypt.hash(req.body.password, 10)
            .then( hashedPassword => {
                // Définir l'item
                const newItem = { pseudo: req.body.pseudo, email : req.body.email, password : hashedPassword };

                // Enregistrer l'item
                connexion.query(`INSERT INTO user SET ?`, newItem, (err, result, fields) => {
                    if( err ){
                        res.json({ msg: 'Connection failed', data: err })
                    }
                    else{
                        res.json({ msg: 'User registrated', data: result })
                    }
                })
            })
            .catch( errorHash => {
                res.json({ msg: 'Error hash', data: errorHash })
            })
        }
        else{
            return res.json({ data: 'no body' })
        }
    })

    // Login user
    router.post('/auth/login', (req, res) => {
        if( 
            req.body &&
            req.body.email.length > 4 &&
            req.body.password.length > 4
        ){
            // Search for user email
        connexion.query(`SELECT * FROM user WHERE email="${req.body.email}"`, (err, result, fields) => {
                if( err ){
                    res.json({ msg: 'Connection failed', data: err })
                }
                else{
                    // Check password
                    const validPassword = bcrypt.compareSync( req.body.password, result[0].password )
                    console.log(req.body.password)
                    console.log(result[0].password)

                    if(validPassword){
                        res.json({ msg: 'User logged', data: result })
                    }
                    else{
                        res.json({ msg: 'Wrong password', data: null })
                    }
                }
            })
        }
        else{
            return res.json({ data: 'no body' })
        }
    })
//

/*
Route Article
*/
    // Create Item: POST
    router.post('/article', (req, res) => {

        /* 
        Pour créer un article il faut une valeur pour :
        - title
        - content
        */
            if( 
                req.body &&
                req.body.title.length > 0 &&
                req.body.content.length > 0
             ){
                // Définir l'item
                const newItem = { title: req.body.title, content : req.body.content };

                // Enregistrer l'item
                connexion.query(`INSERT INTO post SET ?`, newItem, (err, result, fields) => {
                    if( err ){
                        res.json({ msg: 'Connection failed', data: err })
                    }
                    else{
                        res.json({ msg: 'Create Article', data: result })
                    }
                })

            }
            else{
                res.json({ msg: 'No data', data: null })
            }
        //


        
    });

    // Read all Items: GET
    router.get('/article', (req, res) => {

        // Récupérer des données SQL
        connexion.query('SELECT * FROM post', (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error get all', err: error })
            }
            else{
                res.json({ msg: 'Get ALL', data: results })
            }
        });

    });

    // Read one Item: GET
    router.get('/article/:id', (req, res) => {
        
        // Récupérer le paramêtre d'une route
        const routeParam = req.params.id;

        // Récupérer des données SQL
        connexion.query(`SELECT * FROM post WHERE _id = ${routeParam}`, (error, results, fields) => {
            if (error) {
                res.json({ msg: 'Error get one', err: error })
            }
            else{
                res.json({ msg: 'Get One', data: results })
            }
        });

    });

    // Update one Item: PUT
    router.put('/article/:id', (req, res) => {

        // Récupérer le paramêtre d'une route
        const routeParam = req.params.id;

        /* 
        Pour éditer un article il faut une valeur pour :
        - title
        - content
        */
            if( 
                req.body &&
                req.body.title.length > 0 &&
                req.body.content.length > 0
            ){
                // Modifier des données SQL
                connexion.query(`UPDATE post  SET title = ?, content = ?  WHERE _id = ${routeParam}`, [req.body.title, req.body.content] , (error, results, fields) => {
                    if (error) {
                        res.json({ msg: 'Error update', err: error })
                    }
                    else{
                        res.json({ msg: 'Update', data: results })
                    }
                });

            }
            else{
                res.json({ msg: 'No data', data: null })
            };
        //
    });

    // Delete one Item: DELETE
    router.delete('/article/:id', (req, res) => {
         // Récupérer le paramêtre d'une route
         const routeParam = req.params.id;

         // Supprimer des données SQL
         connexion.query(`DELETE FROM post WHERE _id = ${routeParam}`, (error, results, fields) => {
             if (error) {
                 res.json({ msg: 'Error delete', err: error })
             }
             else{
                 res.json({ msg: 'Delete', data: results })
             }
         });
    });
//


/*
Exporter le module de route
*/
    module.exports = router;
//