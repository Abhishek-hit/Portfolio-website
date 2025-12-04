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

// nana

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Sabhi Modals aur Links ko select karo
  const modals = {
    about: document.getElementById("modal-about"),
    projects: document.getElementById("modal-projects"),
    services: document.getElementById("modal-services"),
    contact: document.getElementById("contactModal") // Tumhara purana contact modal
  };

  const navLinks = document.querySelectorAll(".menu a, .cta");
  const closeButtons = document.querySelectorAll(".close-btn, .close");

  // 2. Link Click hone par Modal kholne ka function
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Link ka href attribute nikalo (eg: #about, #projects)
      const targetId = link.getAttribute("href") ? link.getAttribute("href").substring(1) : null;
      
      // Agar 'Hire me' button hai to class check karo ya manual set karo
      let modalKey = targetId; 
      
      // Special check for Hire Me button (class 'cta')
      if (link.classList.contains('cta')) {
          modalKey = 'contact';
      }

      // Agar us ID ka modal exist karta hai, to open karo
      if (modals[modalKey]) {
        e.preventDefault(); // Page scroll hone se roko
        openModal(modals[modalKey]);
      }
    });
  });

  // 3. Modal Kholne ka Logic
  function openModal(modal) {
    if(!modal) return;
    modal.style.display = "flex";
    // Thoda delay taaki animation smooth ho
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);
  }

  // 4. Modal Band karne ka Logic (Close Button)
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Is button ka parent modal dhundo
      const modal = btn.closest(".custom-modal") || btn.closest(".modal");
      closeModal(modal);
    });
  });

  // 5. Modal Band karne ka Logic (Outside Click)
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("custom-modal") || e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  function closeModal(modal) {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300); // Animation ke baad display none
  }
});
