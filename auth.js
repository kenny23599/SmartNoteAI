function signup(auth){
        
            const signupform = document.querySelector('#signup-form');

            signupform.addEventListener('submit',  (e) => {
                e.preventDefault();

                
            // get user info

                const email = signupform['signup-email'].value;
                const password = signupform['signup-password'].value;
                
                if(email != '' && password != ''){

                    console.log(email, password)

                    auth.createUserWithEmailAndPassword(email, password).then(cred   =>{
                        e.preventDefault
                        console.log(email, password)
                        signupform.reset()
                        document.getElementById("blur").style.display = "none";
                    
                    })
                    
                }

                else{
                    document.getElementById("blur").style.display = "block";
                    alert('Enter email and password')
                }
                

            })

//signup the user


}

