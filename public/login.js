document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Simple validation (you can replace this with actual authentication logic)
    if (username === 'Wafi' && password === '28') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Username atau password salah.');
    }
});

document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

document.getElementById('forgot-password-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Lupa? Usernamenya : Wafi , Passwordnya : 28.');
});