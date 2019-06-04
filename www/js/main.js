/* 
Wait for DOM element
*/
    document.addEventListener('DOMContentLoaded', () => {

        /* 
        Methods
        */
            const asyncFetch = async (path, type = 'GET', data = null) => {
                // Check request type
                if( type === 'POST' ){
                    // Make POST request
                    const response = await fetch( path, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify( data )
                    })

                    console.log(response)

                }
                else if( type === 'GET' ){
                    console.log('Get request')
                }
            }

            const checkRegisterForm = ( pseudo, email, password, passwordRepeat ) => {
                // Set error form
                let formError = 0;

                // Check value
                pseudo.length > 1 ? undefined : formError++;
                email.length > 4 ? undefined : formError++;
                password.length > 4 ? undefined : formError++;
                password === passwordRepeat ? undefined : formError++;

                // Check formError
                if( formError === 0 ){
                    // Send data to server
                    asyncFetch('/api/auth/register', 'POST', { pseudo, email, password })
                }
            }
        //


        /* 
        Check active page
        */
            // Home page
            if( document.querySelector('.home-page') != undefined ){
                console.log('Home page')
            }

            // Register page
            if( document.querySelector('.register-page') != undefined ){
                // Declaration
                const registerForm = document.querySelector('#registerForm');
                const pseudo = document.querySelector('#pseudo');
                const email = document.querySelector('#email');
                const password = document.querySelector('#password');
                const passwordRepeat = document.querySelector('#password-repeate');

                // Get form submit
                registerForm.addEventListener('submit', event => {
                    // Stop event propogation
                    event.preventDefault();

                    // check form
                    checkRegisterForm(pseudo.value, email.value, password.value, passwordRepeat.value)
                })
            }
        //


    })
//