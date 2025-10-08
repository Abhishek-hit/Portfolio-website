 const git = document.getElementById("Github");
    git.addEventListener("click", () => {
      window.open("https://github.com/Abhishek-hit", "_blank");
    });
    
  document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contactModal");
  const openBtn = document.getElementById("openContactModal");
  const closeBtn = document.querySelector(".modal .close");
  const form = document.getElementById("contactForm");

  // Open modal
  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("Message sent successfully!");
        form.reset();
        modal.style.display = "none";
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Error sending message.");
      console.error(error);
    }
  });
});
