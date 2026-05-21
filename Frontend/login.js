const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.userName);

            window.location.href = "index.html";
        }
    } catch (error) {
        console.log("Login error:", error);
        alert("Something went wrong during login.");
    }
});
