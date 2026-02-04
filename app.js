const cardData = [
  {
    id: 1,
    title: "Misty Number Lines",
    subtitle: "Glide along gentle steps.",
    description:
      "Explore how numbers drift and connect with a soft, guided path of discovery."
  },
  {
    id: 2,
    title: "Shape Whisper",
    subtitle: "Find quiet geometry moments.",
    description:
      "Notice how shapes breathe and shift as you trace their edges and curves."
  },
  {
    id: 3,
    title: "Pattern Garden",
    subtitle: "Watch sequences bloom.",
    description:
      "Grow calm rhythms by spotting the next gentle step in a pattern."
  },
  {
    id: 4,
    title: "Soft Fractions",
    subtitle: "Share things evenly.",
    description:
      "Split and share in a calm way, noticing parts that feel just right."
  },
  {
    id: 5,
    title: "Quiet Multiples",
    subtitle: "Find friendly repeats.",
    description:
      "Listen for repetition as you uncover steady multiples and echoes."
  },
  {
    id: 6,
    title: "Curious Metrics",
    subtitle: "Measure with gentle eyes.",
    description:
      "Discover how length, weight, and time quietly connect to everyday life."
  },
  {
    id: 7,
    title: "Mirror Symmetry",
    subtitle: "Balance in motion.",
    description:
      "Notice how reflections align to create calm, balanced forms."
  },
  {
    id: 8,
    title: "Slow Coordinates",
    subtitle: "Plot a calm path.",
    description:
      "Place points softly on a map and see how paths unfold."
  },
  {
    id: 9,
    title: "Gentle Estimation",
    subtitle: "Make quiet guesses.",
    description:
      "Practice peaceful approximations without rushing for exactness."
  }
];

const icons = [
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17c4-4 7-2 10-5s6-2 8-6"/><path d="M4 9h4"/><path d="M6 5h3"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 12h16"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19c4-4 8-4 12-8"/><circle cx="7" cy="7" r="2"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/><circle cx="12" cy="12" r="8"/></svg>`
];

const carousel = document.querySelector(".carousel");
const searchInput = document.getElementById("searchInput");
const emptyState = document.querySelector(".empty-state");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const closeButtons = modal.querySelectorAll("[data-close]");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");
const mascots = document.querySelectorAll(".mascot");

let filteredCards = [...cardData];

const renderCards = () => {
  carousel.innerHTML = "";
  filteredCards.forEach((card, index) => {
    const cardEl = document.createElement("button");
    cardEl.type = "button";
    cardEl.className = "carousel-card";
    cardEl.setAttribute("data-id", card.id);
    cardEl.innerHTML = `
      <div class="card-icon" aria-hidden="true">${icons[index % icons.length]}</div>
      <h3>${card.title}</h3>
      <p>${card.subtitle}</p>
    `;
    cardEl.addEventListener("click", () => openModal(card));
    cardEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }
    });
    carousel.appendChild(cardEl);
  });

  emptyState.classList.toggle("visible", filteredCards.length === 0);
  updateCardScales();
};

const openModal = (card) => {
  modalTitle.textContent = card.title;
  modalDescription.textContent = card.description;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const updateCardScales = () => {
  const cards = carousel.querySelectorAll(".carousel-card");
  const carouselRect = carousel.getBoundingClientRect();
  const centerX = carouselRect.left + carouselRect.width / 2;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(centerX - cardCenter);
    const maxDistance = carouselRect.width / 2 + rect.width;
    const normalized = Math.min(distance / maxDistance, 1);
    const scale = 1 - normalized * 0.15;
    const opacity = 1 - normalized * 0.45;
    card.style.setProperty("--card-scale", scale.toFixed(3));
    card.style.setProperty("--card-opacity", opacity.toFixed(3));
  });
};

const scrollByCard = (direction) => {
  const card = carousel.querySelector(".carousel-card");
  if (!card) return;
  const cardWidth = card.getBoundingClientRect().width + 22;
  carousel.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
};

const handleSearch = (event) => {
  const value = event.target.value.toLowerCase();
  filteredCards = cardData.filter((card) =>
    card.title.toLowerCase().includes(value)
  );
  renderCards();
};

let isDragging = false;
let startX = 0;
let scrollStart = 0;

const onPointerDown = (event) => {
  isDragging = true;
  startX = event.clientX;
  scrollStart = carousel.scrollLeft;
  carousel.setPointerCapture(event.pointerId);
};

const onPointerMove = (event) => {
  if (!isDragging) return;
  const delta = event.clientX - startX;
  carousel.scrollLeft = scrollStart - delta;
};

const onPointerUp = (event) => {
  isDragging = false;
  carousel.releasePointerCapture(event.pointerId);
};

const handleKeydown = (event) => {
  if (modal.classList.contains("open")) {
    if (event.key === "Escape") {
      closeModal();
    }
    return;
  }

  if (event.key === "ArrowRight") {
    scrollByCard(1);
  }
  if (event.key === "ArrowLeft") {
    scrollByCard(-1);
  }
};

mascots.forEach((mascot) => {
  mascot.addEventListener("error", () => {
    const color = mascot.dataset.placeholder || "#e2e8f0";
    mascot.classList.add("placeholder");
    mascot.style.setProperty("--placeholder", color);
    mascot.removeAttribute("src");
    mascot.alt = "";
  });
});

searchInput.addEventListener("input", handleSearch);
prevButton.addEventListener("click", () => scrollByCard(-1));
nextButton.addEventListener("click", () => scrollByCard(1));

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close]")) {
    closeModal();
  }
});

carousel.addEventListener("scroll", () => requestAnimationFrame(updateCardScales));
carousel.addEventListener("pointerdown", onPointerDown);
carousel.addEventListener("pointermove", onPointerMove);
carousel.addEventListener("pointerup", onPointerUp);
carousel.addEventListener("pointerleave", () => {
  isDragging = false;
});

window.addEventListener("resize", updateCardScales);
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

renderCards();
