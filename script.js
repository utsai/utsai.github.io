const content = window.siteContent;

if (!content) {
  throw new Error("Missing site content.");
}

const setText = (selector, value) => {
  document.querySelectorAll(`[data-field="${selector}"]`).forEach((node) => {
    node.textContent = value;
  });
};

const setLink = (selector, href, label) => {
  document.querySelectorAll(`[data-field="${selector}"]`).forEach((node) => {
    if (!href) {
      node.style.display = "none";
      return;
    }

    node.setAttribute("href", href);
    if (label) {
      node.textContent = label;
    }
  });
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
};

const renderMetrics = () => {
  const metricsList = document.getElementById("metrics-list");

  (content.metrics || []).forEach((metric) => {
    const item = createElement("div", "metric-item");
    const value = createElement("dt", "metric-value", metric.value);
    const label = createElement("dd", "metric-label", metric.label);

    item.append(value, label);
    metricsList.appendChild(item);
  });
};

const renderQuickFacts = () => {
  const quickFactsList = document.getElementById("quick-facts-list");

  (content.quickFacts || []).forEach((fact) => {
    const item = createElement("li", "quick-fact", fact);
    quickFactsList.appendChild(item);
  });
};

const renderResearchThemes = () => {
  const researchList = document.getElementById("research-list");

  (content.researchThemes || []).forEach((theme) => {
    const card = createElement("article", "info-card reveal");
    const heading = createElement("h3", "", theme.title);
    const text = createElement("p", "", theme.text);
    const tagList = createElement("ul", "tag-list");

    (theme.tags || []).forEach((tag) => {
      tagList.appendChild(createElement("li", "", tag));
    });

    card.append(heading, text, tagList);
    researchList.appendChild(card);
  });
};

const renderPublications = () => {
  const publicationList = document.getElementById("publications-list");

  (content.publications || []).forEach((publication) => {
    const article = createElement("article", "publication-card reveal");
    const title = createElement("h3", "", publication.title);
    const authors = createElement("p", "publication-authors", publication.authors);
    const venue = createElement("p", "publication-venue", publication.venue);
    const description = createElement("p", "publication-description", publication.description);
    const links = createElement("div", "publication-links");

    (publication.links || []).filter((link) => link.url).forEach((link) => {
      const anchor = createElement("a", "text-link", link.label);
      anchor.href = link.url;
      links.appendChild(anchor);
    });

    article.append(title, authors, venue, description, links);
    publicationList.appendChild(article);
  });
};

const renderStackGroup = (targetId, items) => {
  const target = document.getElementById(targetId);

  (items || []).forEach((item) => {
    const article = createElement("article", "stack-item");
    const title = createElement("h3", "", item.title);
    const meta = createElement("p", "item-meta", item.meta);
    const text = createElement("p", "", item.text);

    article.append(title, meta, text);
    target.appendChild(article);
  });
};

const renderTimeline = () => {
  const timelineList = document.getElementById("timeline-list");

  (content.timeline || []).forEach((item) => {
    const article = createElement("article", "timeline-item reveal");
    const year = createElement("div", "timeline-year", item.year);
    const inner = createElement("div", "timeline-copy");
    const title = createElement("h3", "", item.title);
    const text = createElement("p", "", item.text);

    inner.append(title, text);
    article.append(year, inner);
    timelineList.appendChild(article);
  });
};

const renderNews = () => {
  const newsList = document.getElementById("news-list");

  (content.news || []).forEach((item) => {
    const article = createElement("article", "news-item");
    const date = createElement("p", "news-date", item.date);
    const title = createElement("h3", "", item.title);
    const text = createElement("p", "", item.text);

    article.append(date, title, text);
    newsList.appendChild(article);
  });
};

const renderContactLinks = () => {
  const contactLinks = document.getElementById("contact-links");

  (content.contactLinks || []).filter((item) => item.url).forEach((item, index) => {
    const anchor = createElement(
      "a",
      index === 0 ? "button button-primary" : "button button-secondary",
      item.label
    );

    anchor.href = item.url;
    contactLinks.appendChild(anchor);
  });
};

const setupNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
};

const setupReveal = () => {
  const revealed = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealed.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealed.forEach((item) => observer.observe(item));
};

const applyContent = () => {
  document.title = content.seoTitle;
  const description = document.querySelector('meta[name="description"]');

  if (description && content.seoDescription) {
    description.setAttribute("content", content.seoDescription);
  }

  document.getElementById("profile-image").src = content.profileImage;
  document.getElementById("profile-image").alt = `${content.fullName} portrait`;

  setText("fullName", content.fullName);
  setText("shortTag", content.shortTag);
  setText("eyebrow", content.eyebrow);
  setText("title", content.title);
  setText("heroSummary", content.heroSummary);
  setText("affiliation", content.affiliation);
  setText("affiliationSummary", content.affiliationSummary);
  setText("aboutLead", content.aboutLead);
  setText("aboutBodyOne", content.aboutBodyOne);
  setText("aboutBodyTwo", content.aboutBodyTwo);
  setText("currentFocus", content.currentFocus);
  setText("researchIntro", content.researchIntro);
  setText("experienceIntro", content.experienceIntro);
  setText("updatesIntro", content.updatesIntro);
  setText("contactHeading", content.contactHeading);
  setText("contactBody", content.contactBody);
  setText("footerNote", content.footerNote);

  setLink("primaryCtaUrl", content.primaryCtaUrl, content.primaryCtaLabel);
  setLink("secondaryCtaUrl", content.secondaryCtaUrl, content.secondaryCtaLabel);

  renderMetrics();
  renderQuickFacts();
  renderResearchThemes();
  renderPublications();
  renderStackGroup("teaching-list", content.teaching);
  renderStackGroup("projects-list", content.projects);
  renderStackGroup("service-list", content.service);
  renderTimeline();
  renderNews();
  renderContactLinks();
};

applyContent();
setupNavigation();
setupReveal();
