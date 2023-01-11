const colors = {
    green: '#3ca50c',
    red: '#FF3333'
};

// Signup form
const signupForm = document.getElementById('signup_form');
console.log(signupForm);
const signupFormNodes = {
    mail: signupForm.querySelector('input[name="mail"]'),
    name: signupForm.querySelector('input[name="name"]'),
    surname: signupForm.querySelector('input[name="surname"]'),
    password: signupForm.querySelector('input[name="password"]'),
    confirm: signupForm.querySelector('input[name="confirm"]')
};

signupForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get form data
    const data = {
        mail: signupFormNodes.mail.value,
        name: signupFormNodes.name.value,
        surname: signupFormNodes.surname.value,
        password: signupFormNodes.password.value,
    };

    // Reset input styles
    for (const inputName in signupFormNodes) {
        if (signupFormNodes.hasOwnProperty(inputName)) {
            const input = signupFormNodes[inputName];
            input.style.borderColor = colors.green;
        }
    }

    // Check data
    // if (data.pseudo.length > 20 || data.pseudo.length < 3) {
    //     signupFormNodes.pseudo.style.borderColor = colors.red;
    //     return;
    // }
    if (data.password !== signupFormNodes.confirm.value
        || data.password.length < 3) {
        signupFormNodes.password.style.borderColor = colors.red;
        signupFormNodes.confirm.style.borderColor = colors.red;
        return;
    }
    fetch('/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(res);
        if (res.ok) {
            console.log('Register success');
            window.location.href = 'user_route_list';
        }else{
            console.log('Register failed');
            errorOnForm(e.target);
        }
    })
    .catch(err => {
        console.log("Login error")
        console.error(err);
    });
});

function errorOnForm(form) {
    // Get all target inputs
    const inputs = form.querySelectorAll('input[type=text], input[type=password]');
    console.log(inputs);
    // Update style
    for (const input of inputs)
        input.style.borderColor = "#FF5733";
}