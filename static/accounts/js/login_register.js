document.addEventListener("DOMContentLoaded", function () {
      
       // Switch between login and register tabs
        document.getElementById('login-tab').addEventListener('click', function() {
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('register-container').style.display = 'none';
            document.getElementById('login-tab').classList.add('active');
            document.getElementById('register-tab').classList.remove('active');
            document.getElementById("registerForm").reset();
        });

        document.getElementById('register-tab').addEventListener('click', function() {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('register-container').style.display = 'block';
            document.getElementById('register-tab').classList.add('active');
            document.getElementById('login-tab').classList.remove('active');
            document.getElementById("loginForm").reset();
        });

        window.onload=function(){
            document.getElementById("registerForm").reset();
            document.getElementById("loginForm").reset();
        }




// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const target = document.getElementById(toggle.getAttribute('data-target'));
        const type = target.getAttribute('type') === 'password' ? 'text' : 'password';
        target.setAttribute('type', type);

        // Toggle the password visible icon 
        if (type === 'password') {
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-low-vision');
        } else {
            toggle.classList.remove('fa-eye-low-vision');
            toggle.classList.add('fa-eye');
        }

        // toggling the lock and unlock icon
        const lockIcon = target.previousElementSibling;  
        if (type === 'password') {
            lockIcon.classList.remove('fa-lock-open');
            lockIcon.classList.add('fa-lock');
        } else {
            lockIcon.classList.remove('fa-lock');
            lockIcon.classList.add('fa-lock-open');
        }
    });
});

        

        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            

            const emailValue = document.getElementById("login-email").value.trim();
            const passwordValue = document.getElementById("login-password").value.trim();
            
            console.log("Trimmed Email:", emailValue); 
            console.log("Trimmed Password:", passwordValue); 
    
            const formData = new FormData();
            formData.append('csrfmiddlewaretoken', document.querySelector("[name=csrfmiddlewaretoken]").value);
            formData.append("email", emailValue);
            formData.append("password", passwordValue);
    

            const errorMessage = document.getElementById("loginErrorMessage");
            const successMessage = document.getElementById("loginSuccessMessage");
    
            fetch('/account/login/', {
                method: "POST",
                credentials: 'same-origin',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        successMessage.textContent = data.message;
                        successMessage.style.display = 'block';
                        errorMessage.style.display = 'none';
    
                        setTimeout(function () {
                            document.getElementById("loginForm").reset();
                            successMessage.style.display = 'none';
                            window.location.href = data.redirect_url;
                        }, 2000);
    
                    } else {
                        console.log("LOGIN failure");
                        errorMessage.textContent = data.error;
                        errorMessage.style.display = 'block';
                        successMessage.style.display = 'none';
                        console.error(data.error);
    
                        // Hide error message after 2 seconds
                        setTimeout(function () {
                            errorMessage.style.display = 'none';
                        }, 4000);
                    }
                })
                .catch(errors => console.log("Errors", errors));
    
        });


        console.log("login_register script loaded");

    });




//Register code



    function cleanUsername(username) {
        return username.replace(/[^a-zA-Z0-9]/g, "");
    }
    

    document.addEventListener('DOMContentLoaded', function () {

        const uploadImg = document.getElementById("uploadImg");
        const profile = document.getElementById("register-profile-image");
        
        
        profile.addEventListener("change", function (e) {
            // const file = e.target.files[0];
            // uploadImg.src = URL.createObjectURL(file)
            const file = e.target.files[0];
            console.log("uploaded image is : ", file)
            if (file) {
                uploadImg.src = URL.createObjectURL(file);
            }
        });


        function validateRegisterForm() {
            let valid = true;
        
            // Username validation
            const username = document.getElementById('register-username').value.trim();
            const nameError = document.getElementById('registerUsernameError');
            if (username.length < 5) {
                nameError.textContent = 'Username must be at least 5 characters long.';
                valid = false;
            } else {
                nameError.textContent = '';
            }

            const cleannedUsername=cleanUsername(username)
            if(username !== cleannedUsername){
                nameError.textContent = 'Username should not contain special character!.';
                valid = false;
            }else{
                nameError.textContent = '';
            }
        
            // Email validation
            const email = document.getElementById('register-email').value.trim();
            const emailError = document.getElementById('registerEmailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                emailError.textContent = 'Please enter a valid email address.';
                valid = false;
            } else if (username === email) {
                nameError.textContent = 'username and email cannot be same, user different username';
                valid = false;
            }
            else {
                emailError.textContent = '';
            }
        
            // Password validation
            const password1 = document.getElementById('register-password').value.trim();
            const passwordError = document.getElementById('registerPasswordError');
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password1)) {
                passwordError.textContent = 'Password must contain at least 1 special character, 1 uppercase letter, 1 lowercase letter, and 1 number.';
                valid = false;
            } else {
                passwordError.textContent = '';
            }
        
            // Confirm password validation
            const password2 = document.getElementById('register-confirm-password').value.trim();
            const confirmPasswordError = document.getElementById('registerConfirmPasswordError');
            if (password1.length < 8) {  // Moved this check to correct position
                passwordError.textContent = 'Password must be at least 8 characters long.';
                valid = false;
            } else if (password1 !== password2) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                valid = false;
            } else {
                confirmPasswordError.textContent = '';
            }
        
            return valid;
        }
        
        
        // Form submission event
        document.getElementById('registerForm').addEventListener('submit', function (event) {
            console.log('register  button clicked:');
            event.preventDefault(); // This should always be here to prevent default form submission
            const profileFile = document.getElementById('register-profile-image').files[0];
            console.log('Profile Picture File:', profileFile);

            const registerErrorMessage = document.getElementById("registerSuccessMessage");
            const registerSuccessMessage = document.getElementById("registerErrorMessage");
    
            if (validateRegisterForm()) {
                const formData = new FormData();
                //form data append name should be same name as django form fields
                formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
                formData.append('username', document.getElementById('register-username').value.trim());
                formData.append('email', document.getElementById('register-email').value.trim());
                formData.append('password1', document.getElementById('register-password').value.trim());
                formData.append('password2', document.getElementById('register-confirm-password').value.trim());
                formData.append('profile_picture', document.getElementById('register-profile-image').files[0]);
    
                // Print the form data
                for (const [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                console.log(`profilepicture: ${formData.get('profilepicture')}`);
                fetch('/account/register/', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log("SUCCESS MESSAGE", data);
                            console.log("LOGIN URL", loginUrl);
                            registerSuccessMessage.innerHTML  = data.message;
                            registerSuccessMessage.style.display = 'block';
                            registerErrorMessage.style.display = 'none';
                            document.getElementById("registerForm").reset();
                                // Reset the image source to the default
                            const defaultSrc = uploadImg.getAttribute("data-default-src");
                            uploadImg.src = defaultSrc;
                            setTimeout(function () {
                                // window.location.href = loginUrl;
                                // window.location.href = data.redirect_url;
                            }, 2000);
    
                        } else {
                        console.log("Failure", data.errors);
                        document.getElementById('registerUsernameError').textContent = data.errors.username ? data.errors.username : '';
                        document.getElementById('registerEmailError').textContent = data.errors.email ? data.errors.email : '';
                        document.getElementById('registerPasswordError').textContent = data.errors.password1 ? data.errors.password1 : '';
                        document.getElementById('registerConfirmPasswordError').textContent = data.errors.password2 ? data.errors.password2 : '';
                        document.getElementById('registerProfilePictureError').textContent = data.errors.profile_picture ? data.errors.profile_picture : '';


                         }
                    })
                    .catch(error => console.error('Fetch error:', error));
            }
    
    
        });
    });
    