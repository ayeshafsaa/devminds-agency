// ---------- Navbar template ----------
const navbarHTML = `
  <div class="container nav-inner">
    <a href="index.html" class="logo">
      <img src="favicon.svg" alt="DevMinds.ai logo">
      <div>DevMinds<span>.ai</span></div>
    </a>

    <nav class="nav-links" id="nav-links">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="portfolio.html">Portfolio</a>
      <a href="contact.html">Contact</a>
    </nav>

    <div class="nav-actions">
      <button class="theme-toggle" id="theme-toggle" title="Toggle theme" aria-label="Toggle theme"></button>
      <a href="booking.html" class="btn btn-primary">Book a Call</a>
      <button class="menu-toggle" id="menu-toggle" title="Menu" aria-label="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </div>
`;

// ---------- Footer template ----------
const footerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="logo" style="margin-bottom:14px;">
          <img src="favicon.svg" alt="DevMinds.ai logo">
          <div>DevMinds<span>.ai</span></div>
        </a>
        <p>Idea se launch tak: code, AI aur creative, sab ek hi team se.</p>
      </div>

      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="booking.html">Book a Call</a></li>
        </ul>
      </div>

      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="services.html#software">Software Development</a></li>
          <li><a href="services.html#ai">AI Solutions</a></li>
          <li><a href="services.html#content">AI Content</a></li>
          <li><a href="services.html#marketing">Digital Marketing</a></li>
          <li><a href="services.html#video">Post Production</a></li>
        </ul>
      </div>

      <div>
        <h4>Get in touch</h4>
        <ul>
          <li><a href="mailto:hello@devminds.ai">hello@devminds.ai</a></li>
          <li><a href="booking.html">Schedule a meeting</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; <span id="year"></span> DevMinds.ai. 
    </div>
  </div>
`;

// ---------- Inject ----------
document.getElementById("site-header").innerHTML = navbarHTML;
document.getElementById("site-footer").innerHTML = footerHTML;
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Active link ----------
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ---------- Dark / Light theme ----------
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function updateThemeIcon() {
  const isLight = root.getAttribute("data-theme") === "light";
  themeBtn.innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  updateThemeIcon();
});

updateThemeIcon();

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("show"));
}
// ---------- Counter animation ----------
const counters = document.querySelectorAll("[data-count]");

function runCounter(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const step = Math.max(1, Math.ceil(target / 60));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 25);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));
} else {
  counters.forEach((el) => {
    el.textContent = el.dataset.count + (el.dataset.suffix || "");
  });
}
// ---------- Mouse glow (hero) ----------
const heroEl = document.querySelector(".aurora-hero");
const mouseGlow = document.querySelector(".mouse-glow");

if (heroEl && mouseGlow) {
  heroEl.addEventListener("mousemove", (e) => {
    const rect = heroEl.getBoundingClientRect();
    mouseGlow.style.left = e.clientX - rect.left + "px";
    mouseGlow.style.top = e.clientY - rect.top + "px";
  });
}

// ---------- AI chat demo (hero) ----------
const chatBody = document.getElementById("chat-body");

const chatScenes = [
  {
    q: "I need a website for my bakery.",
    a: "Done! We would build a fast, mobile-friendly site with online ordering and a photo gallery. Want to book a quick call?"
  },
  {
    q: "Can AI answer my customer messages?",
    a: "Yes. We build a chatbot trained on your FAQs that replies 24/7 and hands over to you when needed."
  },
  {
    q: "Do you edit videos too?",
    a: "We do. Reels, motion graphics and color grading, all from the same team that builds your website."
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function addMsg(type, text) {
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.textContent = text || "";
  chatBody.appendChild(div);
  return div;
}

async function playChat() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0;

  while (true) {
    const scene = chatScenes[i % chatScenes.length];
    chatBody.innerHTML = "";
    addMsg("user", scene.q);

    if (reduceMotion) {
      addMsg("ai", scene.a);
      return;
    }

    await sleep(600);
    const bubble = addMsg("ai typing");
    bubble.innerHTML = "<span></span><span></span><span></span>";
    await sleep(1200);

    bubble.className = "msg ai";
    bubble.textContent = "";
    for (const ch of scene.a) {
      bubble.textContent += ch;
      await sleep(22);
    }

    await sleep(3200);
    i++;
  }
}

if (chatBody) {
  playChat();
}
// ---------- Page-wide cursor effect ----------
if (window.matchMedia("(hover: hover)").matches) {
    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    const cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";
    document.body.append(cursorGlow, cursorRing);
  
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
  
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorGlow.classList.add("on");
      cursorRing.classList.add("on");
    });
  
    document.addEventListener("mouseleave", () => {
      cursorGlow.classList.remove("on");
      cursorRing.classList.remove("on");
    });
  
    document.addEventListener("mouseover", (e) => {
      const interactive = e.target.closest(
        "a, button, .card, .step, .chip, input, textarea, select"
      );
      cursorRing.classList.toggle("hover", !!interactive);
    });
  
    function animateCursor() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      cursorGlow.style.transform = "translate(" + mx + "px, " + my + "px) translate(-50%, -50%)";
      cursorRing.style.transform = "translate(" + rx + "px, " + ry + "px) translate(-50%, -50%)";
      requestAnimationFrame(animateCursor);
    }
  
    animateCursor();
  }
  // ---------- Bento card spotlight ----------
document.querySelectorAll(".bento-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});

// ---------- Sticky process steps ----------
const procSteps = document.querySelectorAll(".proc-step");
const procNum = document.getElementById("proc-num");
const procDots = document.querySelectorAll(".proc-dots span");

if (procSteps.length && procNum && "IntersectionObserver" in window) {
  const procObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          procSteps.forEach((s) => s.classList.remove("active"));
          entry.target.classList.add("active");
          procNum.textContent = "0" + (index + 1);
          procDots.forEach((dot, i) => dot.classList.toggle("on", i <= index));
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  procSteps.forEach((step) => procObserver.observe(step));
}

// ---------- Big footer wordmark ----------
const footerBottomEl = document.querySelector(".footer-bottom");
if (footerBottomEl) {
  footerBottomEl.insertAdjacentHTML(
    "beforebegin",
    '<div class="footer-wordmark" aria-hidden="true">DevMinds.ai</div>'
  );
}
// ---------- Portfolio: project data ----------
const projectData = {
  shopsphere: {
    tag: "Software",
    title: "ShopSphere",
    thumb: "pt1",
    icon: "fa-cart-shopping",
    desc: "A modern e-commerce platform built for speed. Smart search, a one-page checkout and an admin dashboard let small brands sell online without fighting their tools.",
    tech: ["React", "Node.js", "MySQL", "Stripe API"],
    results: [["+38%", "Conversion rate"], ["1.2s", "Page load"], ["99.9%", "Uptime"]]
  },
  chatpilot: {
    tag: "AI Solutions",
    title: "ChatPilot",
    thumb: "pt2",
    icon: "fa-comments",
    desc: "A support assistant trained on a company's own FAQs and documents. It answers customers around the clock and hands the tricky conversations over to a human.",
    tech: ["Python", "OpenAI API", "WhatsApp API", "Node.js"],
    results: [["70%", "Queries automated"], ["24/7", "Availability"], ["<3s", "Response time"]]
  },
  reelcraft: {
    tag: "Post Production",
    title: "ReelCraft",
    thumb: "pt3",
    icon: "fa-clapperboard",
    desc: "A monthly short-form video series for a lifestyle brand, with motion graphics, color grading, sound design and captions made for vertical screens.",
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    results: [["40", "Reels per month"], ["2.1M", "Total views"], ["+65%", "Engagement"]]
  },
  growthlens: {
    tag: "Marketing",
    title: "GrowthLens",
    thumb: "pt4",
    icon: "fa-chart-line",
    desc: "An SEO and content strategy paired with a live analytics dashboard, so the team can see which pages bring visitors and which visitors become leads.",
    tech: ["Next.js", "Google Analytics", "Search Console", "Looker Studio"],
    results: [["+120%", "Organic traffic"], ["3x", "Qualified leads"], ["Top 3", "Target keywords"]]
  },
  storyforge: {
    tag: "AI Content",
    title: "StoryForge",
    thumb: "pt5",
    icon: "fa-feather-pointed",
    desc: "A writing engine that drafts blogs, captions and product copy in a brand's own voice. Editors review every piece before it goes live.",
    tech: ["OpenAI API", "Notion", "Zapier", "Python"],
    results: [["5x", "Faster drafting"], ["200", "Posts per month"], ["1", "Consistent voice"]]
  },
  fittrack: {
    tag: "Software",
    title: "FitTrack",
    thumb: "pt6",
    icon: "fa-dumbbell",
    desc: "A mobile fitness app with guided workout plans, progress charts and reminders, designed to keep people coming back after the first week.",
    tech: ["React Native", "Firebase", "Node.js", "Figma"],
    results: [["50k", "Downloads"], ["4.8", "Store rating"], ["62%", "Retention"]]
  }
};

// ---------- Portfolio: filter ----------
const pFilterBtns = document.querySelectorAll(".p-btn");
const projectItems = document.querySelectorAll(".project-item");

pFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    pFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectItems.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hide", !match);

      if (match) {
        item.classList.add("show");
        item.classList.remove("pop");
        void item.offsetWidth;
        item.classList.add("pop");
      }
    });
  });
});

// ---------- Portfolio: card spotlight ----------
projectItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--x", e.clientX - rect.left + "px");
    item.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});

// ---------- Portfolio: modal ----------
const modalEl = document.getElementById("modal");
let lastOpenedItem = null;

function openModal(id, trigger) {
  const data = projectData[id];
  if (!data) return;

  lastOpenedItem = trigger;

  document.getElementById("modal-thumb").className = "modal-thumb " + data.thumb;
  document.getElementById("modal-thumb").innerHTML = '<i class="fa-solid ' + data.icon + '"></i>';
  document.getElementById("modal-tag").textContent = data.tag;
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-desc").textContent = data.desc;

  document.getElementById("modal-tech").innerHTML = data.tech
    .map((t) => "<span>" + t + "</span>")
    .join("");

  document.getElementById("modal-results").innerHTML = data.results
    .map((r) => '<div class="result"><strong>' + r[0] + "</strong><span>" + r[1] + "</span></div>")
    .join("");

  modalEl.classList.add("open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modal-close").focus();
}

function closeModal() {
  modalEl.classList.remove("open");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastOpenedItem) lastOpenedItem.focus();
}

if (modalEl) {
  projectItems.forEach((item) => {
    item.addEventListener("click", () => openModal(item.dataset.id, item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(item.dataset.id, item);
      }
    });
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);

  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("open")) closeModal();
  });
}

// ---------- Contact: form validation ----------
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const formSuccess = document.getElementById("form-success");
  const submitBtn = document.getElementById("submit-btn");

  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    service: (v) => (v ? "" : "Please choose a service."),
    message: (v) =>
      v.trim().length >= 20 ? "" : "Please write at least 20 characters so we can help you better."
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const wrap = input.closest(".field");
    const msg = rules[id](input.value);
    wrap.classList.toggle("error", !!msg);
    wrap.querySelector(".err").textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => validateField(id));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("error")) validateField(id);
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstInvalid = null;
    Object.keys(rules).forEach((id) => {
      if (!validateField(id) && !firstInvalid) {
        firstInvalid = document.getElementById(id);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    // Demo: yahan abhi koi server nahi hai, isliye sirf success dikhate hain
    setTimeout(() => {
      const firstName = document.getElementById("name").value.trim().split(" ")[0];
      document.getElementById("success-name").textContent = firstName;
      contactForm.reset();
      contactForm.hidden = true;
      formSuccess.hidden = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    }, 1200);
  });

  document.getElementById("send-another").addEventListener("click", () => {
    formSuccess.hidden = true;
    contactForm.hidden = false;
  });
}

// ---------- FAQ accordion ----------
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-q");
  const answer = item.querySelector(".faq-a");

  question.addEventListener("click", () => {
    const open = item.classList.toggle("open");
    answer.style.maxHeight = open ? answer.scrollHeight + "px" : "";
    question.setAttribute("aria-expanded", open);
  });
});
// ---------- Booking page (meeting scheduler) ----------
(function () {
  const bk = document.getElementById("booking");
  if (!bk) return;

  const stepPick = document.getElementById("step-pick");
  const stepForm = document.getElementById("step-form");
  const stepDone = document.getElementById("step-done");

  const calDays = document.getElementById("cal-days");
  const calMonth = document.getElementById("cal-month");
  const calPrev = document.getElementById("cal-prev");
  const calNext = document.getElementById("cal-next");

  const slotGrid = document.getElementById("slot-grid");
  const slotsTitle = document.getElementById("slots-title");

  const sumDate = document.getElementById("sum-date");
  const sumTime = document.getElementById("sum-time");
  const continueBtn = document.getElementById("bk-continue");
  const backBtn = document.getElementById("bk-back");

  const form = document.getElementById("booking-form");
  const submitBtn = document.getElementById("bk-submit");

  const typeInputs = document.querySelectorAll('input[name="bk-type"]');
  const phoneField = document.getElementById("phone-field");
  const typeText = document.getElementById("bk-type-text");
  const typeIcon = document.getElementById("bk-type-icon");

  // Working hours: 9:00 AM se 5:00 PM, har 30 minute
  const DAY_START = 9 * 60;
  const DAY_END = 17 * 60;
  const SLOT_STEP = 30;
  const STORE_KEY = "devminds_bookings";

  const CALL_TYPES = {
    video: { label: "Video call", info: "Video call, link sent by email", icon: "fa-solid fa-video" },
    phone: { label: "Phone call", info: "Phone call, we will call you", icon: "fa-solid fa-phone" },
    whatsapp: { label: "WhatsApp call", info: "WhatsApp call, we will call you", icon: "fa-brands fa-whatsapp" }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);

  let viewYear = minDate.getFullYear();
  let viewMonth = minDate.getMonth();
  let selectedDate = null;
  let selectedTime = null;

  // ----- helpers -----
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function dateKey(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function longDate(d) {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  function shortDate(d) {
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  function timeLabel(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ap = h >= 12 ? "PM" : "AM";
    return (h % 12 || 12) + ":" + pad(m) + " " + ap;
  }

  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  function getBooked() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveBooking(key) {
    try {
      const list = getBooked();
      list.push(key);
      localStorage.setItem(STORE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  // Kuch slots demo ke liye pehle se "booked" dikhte hain, baqi tumhari booking se
  function isBooked(date, mins) {
    const key = dateKey(date) + "|" + mins;
    return getBooked().includes(key) || hash(key) % 100 < 30;
  }

  function isAvailableDay(d) {
    const dow = d.getDay();
    return d >= minDate && d <= maxDate && dow !== 0 && dow !== 6;
  }

  // ----- call type -----
  function getType() {
    return document.querySelector('input[name="bk-type"]:checked').value;
  }

  function applyType() {
    const type = getType();
    const info = CALL_TYPES[type];

    typeText.textContent = info.info;
    typeIcon.className = info.icon;
    phoneField.hidden = type === "video";

    if (type === "video") {
      phoneField.classList.remove("error");
      phoneField.querySelector(".err").textContent = "";
    }
  }

  typeInputs.forEach((input) => input.addEventListener("change", applyType));

  // ----- calendar -----
  function renderCalendar() {
    const first = new Date(viewYear, viewMonth, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    calMonth.textContent = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    calDays.innerHTML = "";

    for (let i = 0; i < startDay; i++) {
      calDays.appendChild(document.createElement("span"));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day";
      btn.textContent = d;
      btn.dataset.day = d;
      btn.disabled = !isAvailableDay(date);

      if (date.getTime() === today.getTime()) btn.classList.add("today");
      if (selectedDate && date.getTime() === selectedDate.getTime()) btn.classList.add("selected");

      calDays.appendChild(btn);
    }

    calPrev.disabled = viewYear === minDate.getFullYear() && viewMonth === minDate.getMonth();
    calNext.disabled = viewYear === maxDate.getFullYear() && viewMonth === maxDate.getMonth();
  }

  calDays.addEventListener("click", (e) => {
    const btn = e.target.closest("button.day");
    if (!btn || btn.disabled) return;

    selectedDate = new Date(viewYear, viewMonth, Number(btn.dataset.day));
    selectedTime = null;
    renderCalendar();
    renderSlots();
    updateSummary();
  });

  calPrev.addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
    renderCalendar();
  });

  calNext.addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
    renderCalendar();
  });

  // ----- slots -----
  function renderSlots() {
    slotGrid.innerHTML = "";

    if (!selectedDate) {
      slotsTitle.textContent = "Available times";
      slotGrid.innerHTML = '<p class="slots-empty">Pick a date to see available times.</p>';
      return;
    }

    slotsTitle.textContent = shortDate(selectedDate);

    for (let mins = DAY_START; mins < DAY_END; mins += SLOT_STEP) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot";
      btn.textContent = timeLabel(mins);
      btn.dataset.mins = mins;
      btn.disabled = isBooked(selectedDate, mins);
      if (selectedTime === mins) btn.classList.add("selected");
      slotGrid.appendChild(btn);
    }
  }

  slotGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button.slot");
    if (!btn || btn.disabled) return;

    selectedTime = Number(btn.dataset.mins);
    renderSlots();
    updateSummary();
  });

  function updateSummary() {
    sumDate.textContent = selectedDate ? longDate(selectedDate) : "No date selected";
    sumTime.textContent = selectedTime !== null ? timeLabel(selectedTime) : "No time selected";
    continueBtn.disabled = !(selectedDate && selectedTime !== null);
  }

  // ----- steps -----
  function showStep(step) {
    stepPick.hidden = step !== "pick";
    stepForm.hidden = step !== "form";
    stepDone.hidden = step !== "done";
    bk.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  continueBtn.addEventListener("click", () => {
    document.getElementById("form-when").textContent =
      longDate(selectedDate) + " at " + timeLabel(selectedTime);
    showStep("form");
  });

  backBtn.addEventListener("click", () => showStep("pick"));

  // ----- form validation -----
  const bkRules = {
    "bk-name": (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
    "bk-email": (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    "bk-phone": (v) => {
      if (getType() === "video") return "";
      const digits = v.replace(/\D/g, "");
      const okChars = /^\+?[\d\s\-()]+$/.test(v.trim());
      return okChars && digits.length >= 7 && digits.length <= 15
        ? ""
        : "Please enter a valid phone number so we can reach you.";
    },
    "bk-topic": (v) => (v ? "" : "Please choose a topic.")
  };

  function validateBk(id) {
    const input = document.getElementById(id);
    const wrap = input.closest(".field");
    const msg = bkRules[id](input.value);
    wrap.classList.toggle("error", !!msg);
    wrap.querySelector(".err").textContent = msg;
    return !msg;
  }

  Object.keys(bkRules).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => validateBk(id));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("error")) validateBk(id);
    });
  });

  function gcalDate(d) {
    return (
      d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
      "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00"
    );
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstInvalid = null;
    Object.keys(bkRules).forEach((id) => {
      if (!validateBk(id) && !firstInvalid) firstInvalid = document.getElementById(id);
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booking...';

    setTimeout(() => {
      saveBooking(dateKey(selectedDate) + "|" + selectedTime);

      const type = getType();
      const info = CALL_TYPES[type];
      const name = document.getElementById("bk-name").value.trim().split(" ")[0];
      const email = document.getElementById("bk-email").value.trim();
      const phone = document.getElementById("bk-phone").value.trim();

      document.getElementById("done-name").textContent = name;
      document.getElementById("done-email").textContent = email;
      document.getElementById("done-date").textContent = longDate(selectedDate);
      document.getElementById("done-time").textContent = timeLabel(selectedTime);
      document.getElementById("done-type").textContent =
        type === "video" ? info.label : info.label + " on " + phone;
      document.getElementById("done-type-icon").className = info.icon;

      const start = new Date(selectedDate);
      start.setHours(Math.floor(selectedTime / 60), selectedTime % 60, 0, 0);
      const end = new Date(start.getTime() + 30 * 60000);

      const details =
        "Free 30-minute discovery call (concept project demo). Type: " + info.label +
        (type === "video" ? "" : ". Number: " + phone);

      document.getElementById("gcal-link").href =
        "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        "&text=" + encodeURIComponent("Discovery call with DevMinds.ai") +
        "&dates=" + gcalDate(start) + "/" + gcalDate(end) +
        "&details=" + encodeURIComponent(details);

      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Confirm Booking <i class="fa-solid fa-check"></i>';
      showStep("done");
    }, 1200);
  });

  document.getElementById("book-another").addEventListener("click", () => {
    form.reset();
    applyType();
    selectedDate = null;
    selectedTime = null;
    renderCalendar();
    renderSlots();
    updateSummary();
    showStep("pick");
  });

  // ----- start -----
  try {
    document.getElementById("bk-tz").textContent =
      "Times shown in " + Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {}

  applyType();
  renderCalendar();
  renderSlots();
  updateSummary();
})();
// ---------- Services tabs ----------
(function () {
  const tabs = document.querySelectorAll(".svc-tab");
  const panels = document.querySelectorAll(".svc-panel");
  if (!tabs.length) return;

  function activate(id, updateHash) {
    const tab = document.querySelector('.svc-tab[data-target="' + id + '"]');
    if (!tab) return;

    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
    });

    panels.forEach((p) => p.classList.toggle("active", p.id === "panel-" + id));

    if (updateHash) history.replaceState(null, "", "#" + id);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.target, true);

      // Phone par detail neeche hoti hai, isliye wahan scroll kar do
      if (window.innerWidth <= 900) {
        document
          .getElementById("panel-" + tab.dataset.target)
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % tabs.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;

      if (next !== null) {
        e.preventDefault();
        tabs[next].focus();
        activate(tabs[next].dataset.target, true);
      }
    });
  });

  function fromHash() {
    const h = location.hash.replace("#", "");
    return document.querySelector('.svc-tab[data-target="' + h + '"]') ? h : null;
  }

  activate(fromHash() || tabs[0].dataset.target, false);

  // Footer ke links se (jab already isi page par ho)
  window.addEventListener("hashchange", () => {
    const h = fromHash();
    if (h) activate(h, false);
  });
})();