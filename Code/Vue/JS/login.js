const colors = {
    green: '#3ca50c',
    red: '#FF3333'
};

// Login form
const loginForm = document.getElementById('login_form');
const loginFormNodes = {
    mail: loginForm.querySelector('input[name="mail"]'),
    password: loginForm.querySelector('input[name="password"]')
};

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get form data
    const data = {
        mail: loginFormNodes.mail.value,
        password: loginFormNodes.password.value
    };

    // Reset input styles
    for (const inputName in loginFormNodes) {
        if (loginFormNodes.hasOwnProperty(inputName)) {
            const input = loginFormNodes[inputName];
            input.style.borderColor = colors.green;
        }
    }

    // Check data
    // if (data.mail.length > 20 || data.mail.length < 3) {
    //     loginFormNodes.mail.style.borderColor = colors.red;
    //     return;
    // }
    if (data.password.length < 3) {
        loginFormNodes.password.style.borderColor = colors.red;
        return;
    }

    fetch('/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(res);
        if (res.ok) {
            console.log('Login success');
            window.location.href = 'user_route_list';
        }else{
            console.log('Login failed');
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