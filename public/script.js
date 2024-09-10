document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare data to send to server
    const data = { name, email, password };

    // Send a POST request to the server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        const messageElement = document.getElementById('message');
        if (result.success) {
            messageElement.textContent = 'You are registered successfully!';
            messageElement.className = 'success';
        } else {
            messageElement.textContent = 'Registration failed: ' + result.message;
            messageElement.className = 'error';
        }
    })
    .catch(error => {
        const messageElement = document.getElementById('message');
        messageElement.textContent = 'An error occurred: ' + error.message;
        messageElement.className = 'error';
    });
});
