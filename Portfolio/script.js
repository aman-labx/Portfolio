/* ============================================================
   PORTFOLIO SCRIPT
   Sections:
   1. Project data (edit here to add/update projects)
   2. Navbar (sticky shadow, active link, mobile menu)
   3. Smooth scroll (native + offset correction)
   4. Scroll-reveal animations
   5. Timeline reveal
   6. Neural network hero visual (canvas-free, pure SVG)
   7. Contact form (frontend-only, ready for Formspree/EmailJS)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. PROJECT DATA
     Add a new project by copying an object in this array.
     status: "live" | "learning" | "soon"
     githubUrl / demoUrl: leave as "#" if not ready yet.
     ============================================================ */
  const projects = [
    {
      title: 'Student Performance Prediction',
      description: 'A beginner machine learning project exploring how different student-related factors can be used to predict academic performance.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      status: 'learning',
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'House Price Prediction',
      description: 'A regression-based machine learning project built to understand data preprocessing, feature selection, model training, and evaluation.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
      status: 'learning',
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'Iris Classification',
      description: 'A beginner classification project using the Iris dataset to understand supervised learning and model evaluation.',
      tech: ['Python', 'Scikit-learn', 'Pandas'],
      status: 'learning',
      githubUrl: '#',
      demoUrl: '#'
    }
  ];

  const statusLabel = {
    live: null,
    learning: 'Learning Project',
    soon: 'Coming Soon'
  };

  const projectIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M9.8 10.2 5.6 7.2M14.2 10.2l4.2-3M9.8 13.8l-4.2 3M14.2 13.8l4.2 3"/></svg>`;

  const grid = document.getElementById('projectGrid');
  if (grid) {
    grid.innerHTML = projects.map(p => `
      <article class="project-card glass reveal">
        <div class="project-thumb">${projectIcon}</div>
        <div class="project-body">
          <div class="project-head">
            <h3>${p.title}</h3>
            ${statusLabel[p.status] ? `<span class="badge badge-soon">${statusLabel[p.status]}</span>` : ''}
          </div>
          <p>${p.description}</p>
          <div class="project-tags">
            ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${p.githubUrl}" target="_blank" rel="noopener">GitHub →</a>
            <a href="${p.demoUrl}" target="_blank" rel="noopener">Live Demo →</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  /* ============================================================
     2. NAVBAR
     ============================================================ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    let current = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= scrollPos) current = s.id;
    }
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ============================================================
     4. SCROLL REVEAL
     ============================================================ */
  const revealTargets = document.querySelectorAll(
    '.section-title, .section-eyebrow, .section-sub, .learning-card, .skill-card, .reveal, .building-card, .education-card, .roadmap-node, .c-projects'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('in-view'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  /* ============================================================
     5. TIMELINE REVEAL (staggered)
     ============================================================ */
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (reduceMotion) {
    timelineItems.forEach(el => el.classList.add('in-view'));
  } else {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 60);
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    timelineItems.forEach(el => timelineObserver.observe(el));
  }

  /* ============================================================
     6. NEURAL NETWORK HERO VISUAL (pure SVG, generated once)
     ============================================================ */
  const svg = document.querySelector('.neural-svg');
  if (svg && !reduceMotion) {
    const nsEdges = svg.querySelector('.nn-edges');
    const nsNodes = svg.querySelector('.nn-nodes');
    const layers = [3, 4, 3, 2];
    const width = 420, height = 420;
    const layerGap = width / (layers.length + 1);
    const nodePositions = [];

    layers.forEach((count, li) => {
      const x = layerGap * (li + 1);
      const gap = height / (count + 1);
      const col = [];
      for (let i = 0; i < count; i++) {
        col.push({ x, y: gap * (i + 1) });
      }
      nodePositions.push(col);
    });

    let edgeHTML = '';
    for (let l = 0; l < nodePositions.length - 1; l++) {
      nodePositions[l].forEach(a => {
        nodePositions[l + 1].forEach(b => {
          edgeHTML += `<path d="M${a.x},${a.y} L${b.x},${b.y}" opacity="0.18"/>`;
        });
      });
    }
    nsEdges.innerHTML = edgeHTML;

    let nodeHTML = '';
    nodePositions.flat().forEach((n, i) => {
      nodeHTML += `<circle cx="${n.x}" cy="${n.y}" r="5" fill="#0a0c11" stroke="url(#edgeGrad)" stroke-width="1.5">
        <animate attributeName="r" values="4;6;4" dur="${3 + (i % 4)}s" repeatCount="indefinite" />
      </circle>`;
    });
    nsNodes.innerHTML = nodeHTML;
  } else if (svg) {
    svg.style.display = 'none';
  }

  /* ============================================================
     7. CONTACT FORM (frontend-only)
     To connect a real backend:
       Formspree: set the form's action to your Formspree endpoint
                  and change the fetch below to a normal form submit,
                  or POST to https://formspree.io/f/YOUR_ID.
       EmailJS:   include the EmailJS SDK, then replace the
                  simulated submit below with emailjs.sendForm(...).
     ============================================================ */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in every field before sending.';
        return;
      }

      // ---- Placeholder submit logic ----
      // Replace this block with a real request once a backend/service is connected.
      status.textContent = 'Message ready — connect Formspree or EmailJS to send it for real.';
      form.reset();
    });
  }

  /* ============================================================
     GITHUB STATS (optional)
     No live stats are hard-coded. To show real GitHub activity,
     you can call the public GitHub API from the client, e.g.:

       fetch('https://api.github.com/users/YOUR_USERNAME')
         .then(res => res.json())
         .then(data => { ... render data.public_repos, etc ... });

     This is left disabled by default so no fake numbers ever show.
     ============================================================ */
});
