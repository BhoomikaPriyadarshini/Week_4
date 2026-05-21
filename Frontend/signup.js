const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Signup failed");
            return;
        }

        alert(data.message);
        window.location.href = "login.html";
    } catch (error) {
        console.log("Signup error:", error);
        alert("Could not connect to backend. Check if server is running on port 5000.");
    }
});
