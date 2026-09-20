document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PROJECT DATA
  ========================= */

  const projects = [
    {
      title: "Student Performance Prediction",
      description:
        "A beginner machine learning project exploring how different student-related factors can be used to predict academic performance.",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      status: "learning",
      githubUrl: "#",
      demoUrl: "#"
    },

    {
      title: "House Price Prediction",
      description:
        "A regression-based machine learning project built to understand data preprocessing, feature selection, model training, and evaluation.",
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn"],
      status: "learning",
      githubUrl: "#",
      demoUrl: "#"
    },

    {
      title: "Iris Classification",
      description:
        "A beginner classification project using the Iris dataset to understand supervised learning and model evaluation.",
      tech: ["Python", "Scikit-learn", "Pandas"],
      status: "learning",
      githubUrl: "#",
      demoUrl: "#"
    }
  ];


  /* =========================
     PROJECT CARDS
  ========================= */

  const projectGrid = document.getElementById("projectGrid");

  const projectIcon = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3"/>
      <circle cx="4" cy="6" r="2"/>
      <circle cx="20" cy="6" r="2"/>
      <circle cx="4" cy="18" r="2"/>
      <circle cx="20" cy="18" r="2"/>

      <path d="
        M9.8 10.2 5.6 7.2
        M14.2 10.2l4.2-3
        M9.8 13.8l-4.2 3
        M14.2 13.8l4.2 3
      "/>
    </svg>
  `;


  if (projectGrid) {

    projectGrid.innerHTML = projects.map(project => {

      let status = "";

      if (project.status === "learning") {
        status = `<span class="badge badge-soon">Learning Project</span>`;
      }

      if (project.status === "soon") {
        status = `<span class="badge badge-soon">Coming Soon</span>`;
      }

      return `
        <article class="project-card glass reveal">

          <div class="project-thumb">
            ${projectIcon}
          </div>

          <div class="project-body">

            <div class="project-head">

              <h3>${project.title}</h3>

              ${status}

            </div>

            <p>
              ${project.description}
            </p>

            <div class="project-tags">

              ${project.tech
                .map(tech => `<span class="tag">${tech}</span>`)
                .join("")}

            </div>

            <div class="project-links">

              <a
                href="${project.githubUrl}"
                target="_blank"
                rel="noopener"
              >
                GitHub →
              </a>

              <a
                href="${project.demoUrl}"
                target="_blank"
                rel="noopener"
              >
                Live Demo →
              </a>

            </div>

          </div>

        </article>
      `;

    }).join("");
  }


  /* =========================
     NAVBAR
  ========================= */

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  const navLinkElements =
    document.querySelectorAll(".nav-link");


  /* Navbar shadow on scroll */

  if (navbar) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 12) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

    });

  }


  /* Mobile hamburger */

  if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("open");

      hamburger.classList.toggle(
        "open",
        isOpen
      );

      hamburger.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  /* Close mobile menu after clicking link */

  navLinkElements.forEach(link => {

    link.addEventListener("click", () => {

      if (navLinks) {
        navLinks.classList.remove("open");
      }

      if (hamburger) {

        hamburger.classList.remove("open");

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  });


  /* =========================
     ACTIVE NAV LINK
  ========================= */

  const sections =
    Array.from(
      document.querySelectorAll(
        "main section[id]"
      )
    );


  function setActiveLink() {

    if (!sections.length) {
      return;
    }

    const scrollPosition =
      window.scrollY + 120;

    let current =
      sections[0].id;

    sections.forEach(section => {

      if (
        section.offsetTop <=
        scrollPosition
      ) {
        current = section.id;
      }

    });


    navLinkElements.forEach(link => {

      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${current}`
      );

    });

  }


  window.addEventListener(
    "scroll",
    setActiveLink
  );

  setActiveLink();


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(
      `
      .section-title,
      .section-eyebrow,
      .section-sub,
      .learning-card,
      .skill-card,
      .reveal,
      .building-card,
      .education-card,
      .roadmap-node,
      .c-projects
      `
    );


  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(element => {
      element.classList.add("in-view");
    });

  } else {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in-view"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {
      observer.observe(element);
    });

  }


  /* =========================
     TIMELINE
  ========================= */

  const timelineItems =
    document.querySelectorAll(
      ".timeline-item"
    );


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    timelineItems.forEach(item => {
      item.classList.add("in-view");
    });

  } else {

    const timelineObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in-view"
              );

              timelineObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.3
        }
      );


    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });

  }


  /* =========================
     NEURAL NETWORK SVG
  ========================= */

  const neuralSVG =
    document.querySelector(
      ".neural-svg"
    );


  if (
    neuralSVG &&
    !prefersReducedMotion
  ) {

    const edges =
      neuralSVG.querySelector(
        ".nn-edges"
      );

    const nodes =
      neuralSVG.querySelector(
        ".nn-nodes"
      );


    if (edges && nodes) {

      const layers = [
        3,
        4,
        3,
        2
      ];

      const width = 420;
      const height = 420;

      const layerGap =
        width /
        (layers.length + 1);

      const positions = [];


      layers.forEach(
        (count, layerIndex) => {

          const x =
            layerGap *
            (layerIndex + 1);

          const gap =
            height /
            (count + 1);

          const column = [];


          for (
            let i = 0;
            i < count;
            i++
          ) {

            column.push({
              x: x,
              y: gap * (i + 1)
            });

          }


          positions.push(column);

        }
      );


      let edgeHTML = "";


      for (
        let layer = 0;
        layer <
        positions.length - 1;
        layer++
      ) {

        positions[layer].forEach(
          firstNode => {

            positions[layer + 1].forEach(
              secondNode => {

                edgeHTML += `
                  <path
                    d="
                      M${firstNode.x},
                      ${firstNode.y}
                      L${secondNode.x},
                      ${secondNode.y}
                    "
                    opacity="0.18"
                  />
                `;

              }
            );

          }
        );

      }


      edges.innerHTML =
        edgeHTML;


      let nodeHTML = "";


      positions
        .flat()
        .forEach(
          (node, index) => {

            nodeHTML += `
              <circle
                cx="${node.x}"
                cy="${node.y}"
                r="5"
                fill="#0a0c11"
                stroke="url(#edgeGrad)"
                stroke-width="1.5"
              >

                <animate
                  attributeName="r"
                  values="4;6;4"
                  dur="${3 + (index % 4)}s"
                  repeatCount="indefinite"
                />

              </circle>
            `;

          }
        );


      nodes.innerHTML =
        nodeHTML;

    }

  } else if (neuralSVG) {

    neuralSVG.style.display =
      "none";

  }


  /* =========================
     CONTACT FORM
  ========================= */

  const contactForm =
    document.getElementById(
      "contactForm"
    );

  const formStatus =
    document.getElementById(
      "formStatus"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          contactForm
            .querySelector(
              '[name="name"]'
            )?.value.trim() || "";


        const email =
          contactForm
            .querySelector(
              '[name="email"]'
            )?.value.trim() || "";


        const message =
          contactForm
            .querySelector(
              '[name="message"]'
            )?.value.trim() || "";


        if (
          !name ||
          !email ||
          !message
        ) {

          if (formStatus) {

            formStatus.textContent =
              "Please fill in every field before sending.";

          }

          return;

        }


        if (formStatus) {

          formStatus.textContent =
            "Message ready — connect Formspree or EmailJS to send it for real.";

        }


        contactForm.reset();

      }
    );

  }

});