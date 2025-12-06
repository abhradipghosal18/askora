console.log("Askora Profile Script Loaded!");

document.addEventListener("DOMContentLoaded", () => {

    const profileImg = document.querySelector(".profile-header img");

    if (profileImg) {
        profileImg.addEventListener("click", () => {
            profileImg.classList.toggle("spin-active");
            console.log("Profile image clicked - Animation toggled!");
        });

        profileImg.setAttribute("title", "Click me to spin!");
    }

    const posts = document.querySelectorAll(".post-item, .card");

    posts.forEach((post, index) => {
        post.style.opacity = "0";
        post.style.transform = "translateY(20px)";
        post.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

        setTimeout(() => {
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
        }, 300 + (index * 200)); 
    });

    const profileTextContainer = document.querySelector(".profile-header div");
    const nameElement = document.querySelector(".profile-header h2");

    if (profileTextContainer && nameElement) {
        const currentHour = new Date().getHours();
        let greetingText = "Welcome back";

        if (currentHour < 12) {
            greetingText = "Good Morning";
        } else if (currentHour < 18) {
            greetingText = "Good Afternoon";
        } else {
            greetingText = "Good Evening";
        }

        const greetingElement = document.createElement("p");
        greetingElement.textContent = greetingText;
        greetingElement.style.color = "#3b64ff";
        greetingElement.style.fontSize = "14px";
        greetingElement.style.fontWeight = "bold";
        greetingElement.style.marginBottom = "4px";

        profileTextContainer.insertBefore(greetingElement, nameElement);
    }

    const allCards = document.querySelectorAll(".grid .card, .post-item");

    if (allCards.length > 0) {
        const modalHTML = `
      <div id="post-modal" class="modal">
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <div id="modal-body"></div>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        const modal = document.getElementById("post-modal");
        const modalBody = document.getElementById("modal-body");
        const closeBtn = document.querySelector(".close-btn");

        allCards.forEach(card => {
            if (card.querySelector("form")) return;

            card.style.cursor = "pointer";
            card.addEventListener("click", () => {
                modalBody.innerHTML = card.innerHTML;

                const actions = modalBody.querySelector(".post-actions");
                if (actions) actions.style.display = "flex";

                modal.classList.add("show");
            });
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show");
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("show")) {
                modal.classList.remove("show");
            }
        });
    }

    const imageInput = document.getElementById("imageInput");
    const videoInput = document.getElementById("videoInput");
    const mediaPreview = document.getElementById("media-preview");

    function handleFileSelect(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        mediaPreview.innerHTML = "";

        const fileURL = URL.createObjectURL(file);
        let previewElement;

        if (type === "image") {
            previewElement = document.createElement("img");
            previewElement.src = fileURL;
        } else {
            previewElement = document.createElement("video");
            previewElement.src = fileURL;
            previewElement.controls = true;
        }

        mediaPreview.appendChild(previewElement);
    }

    if (imageInput) {
        imageInput.addEventListener("change", (e) => handleFileSelect(e, "image"));
    }

    if (videoInput) {
        videoInput.addEventListener("change", (e) => handleFileSelect(e, "video"));
    }
});
