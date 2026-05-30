/* ═══════════════════════════════════════════════════
   PORTFOLIO — script.js
═══════════════════════════════════════════════════ */

const GITHUB_USERNAME = 'Dotissleeping';
const PINNED_REPOS = ['VC-Cozy-Coffee', 'VibeCode-atmosify-App', 'Atmosify-App-Android', 'Stokku', 'StudyOS'];

const LANG_COLORS = {
  JavaScript:'#f1e05a', TypeScript:'#3178c6', Python:'#3572A5',
  HTML:'#e34c26', CSS:'#563d7c', Java:'#b07219', 'C++':'#f34b7d',
  C:'#555555', 'C#':'#178600', PHP:'#4F5D95', Ruby:'#701516',
  Go:'#00ADD8', Rust:'#dea584', Swift:'#F05138', Kotlin:'#A97BFF',
  Dart:'#00B4AB', Shell:'#89e051', PowerShell:'#012456', Vue:'#41b883',
  Svelte:'#ff3e00', Jupyter:'#DA5B0B', R:'#198CE7', SCSS:'#c6538c',
  Makefile:'#427819',
};

function getLangColor(lang) { return LANG_COLORS[lang] || '#8A8A7A'; }

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 18;
    if (width >= 90) { clearInterval(interval); width = 90; }
    bar.style.width = width + '%';
  }, 120);

  window.completeProgressBar = () => {
    clearInterval(interval);
    bar.style.width = '100%';
    bar.style.opacity = '0';
    setTimeout(() => bar.remove(), 500);
  };
}

// ── TYPING ANIMATION ─────────────────────────────────────────────────────────
function initTyping() {
  const words = ['Building', 'Designing', 'Shipping', 'Creating', 'Crafting'];
  const el = document.getElementById('typingWord');
  if (!el) return;

  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = false;

  function tick() {
    const current = words[wordIndex];
    if (deleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 60);
    } else {
      charIndex++;
      el.textContent = words[wordIndex].slice(0, charIndex);
      if (charIndex === words[wordIndex].length) {
        setTimeout(() => { deleting = true; tick(); }, 1800);
        return;
      }
      setTimeout(tick, 100);
    }
  }

  setTimeout(tick, 2000);
}

// ── TIME AGO ─────────────────────────────────────────────────────────────────
function timeAgo(iso) {
  const seconds = Math.floor((new Date() - new Date(iso)) / 1000);
  if (seconds < 60) return 'just now';
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}

// ── FETCH ─────────────────────────────────────────────────────────────────────
async function fetchUser() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
  if (!res.ok) return null;
  return res.json();
}

async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const all = await res.json();
  if (PINNED_REPOS) return all.filter(r => PINNED_REPOS.includes(r.name));
  return all.filter(r => !r.fork);
}

async function fetchLanguages(repoName) {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`);
    if (!res.ok) return {};
    return res.json();
  } catch { return {}; }
}

// ── CARD ──────────────────────────────────────────────────────────────────────
function buildCard(repo, langs) {
  const card = document.createElement('div');
  card.className = 'project-card reveal';

  const primaryLang = repo.language || Object.keys(langs)[0] || 'Unknown';
  const langColor = getLangColor(primaryLang);

  const langBadges = Object.keys(langs).slice(0, 4).map(l => `
    <span class="lang-badge">
      <span class="lang-badge-dot" style="background:${getLangColor(l)}"></span>${l}
    </span>`).join('');

  card.innerHTML = `
    <div class="project-card-inner" style="--card-lang-color: ${langColor}">
      <div class="project-card-header">
        <span class="lang-dot" style="background:${langColor}"></span>
        <span class="project-lang">${primaryLang}</span>
        <span class="project-updated">${timeAgo(repo.updated_at)}</span>
      </div>
      <div class="project-name">${repo.name.replace(/-/g, ' ')}</div>
      <p class="project-desc">${repo.description || 'No description provided.'}</p>
      <div class="project-langs-row">${langBadges || `<span class="lang-badge"><span class="lang-badge-dot" style="background:${langColor}"></span>${primaryLang}</span>`}</div>
      <div class="project-footer">
        <span class="project-stat">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
          ${repo.stargazers_count}
        </span>
        <span class="project-stat">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>
          ${repo.forks_count}
        </span>
      </div>
    </div>`;

  card.addEventListener('click', () => openModal(repo, langs));
  return card;
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(repo, langs) {
  const modal = document.getElementById('modal');
  const primaryLang = repo.language || Object.keys(langs)[0] || 'Unknown';

  document.getElementById('modalLangDot').style.background = getLangColor(primaryLang);
  document.getElementById('modalLang').textContent = primaryLang;
  document.getElementById('modalTitle').textContent = repo.name.replace(/-/g, ' ');
  document.getElementById('modalDesc').textContent = repo.description || 'No description provided.';
  document.getElementById('modalStars').textContent = repo.stargazers_count;
  document.getElementById('modalForks').textContent = repo.forks_count;
  document.getElementById('modalUpdated').textContent = `${formatDate(repo.updated_at)} (${timeAgo(repo.updated_at)})`;
  document.getElementById('modalLink').href = repo.html_url;

  const modalImgWrap = document.getElementById('modalImgWrap');
  const modalImg = document.getElementById('modalImg');
  modalImgWrap.classList.remove('hidden');
  modalImg.src = `previews/${repo.name}.png`;
  modalImg.onerror = function() {
    this.onerror = null;
    this.src = `previews/${repo.name}.jpg`;
    this.onerror = () => modalImgWrap.classList.add('hidden');
  };

  const total = Object.values(langs).reduce((a, b) => a + b, 0);
  document.getElementById('modalLanguages').innerHTML = Object.entries(langs).map(([lang, bytes]) => {
    const pct = total ? Math.round((bytes / total) * 100) : 0;
    return `<span class="lang-badge"><span class="lang-badge-dot" style="background:${getLangColor(lang)}"></span>${lang} ${pct}%</span>`;
  }).join('');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function renderSkills(langTotals) {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  const sorted = Object.entries(langTotals).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;
  grid.innerHTML = sorted.map(([lang, bytes]) => {
    const pct = Math.round((bytes / max) * 100);
    return `<div class="skill-lang-block">
      <div class="skill-lang-name">${lang}</div>
      <div class="skill-lang-bar-wrap"><div class="skill-lang-bar" data-pct="${pct}" style="width:0%"></div></div>
      <div class="skill-lang-pct">${pct}% relative usage</div>
    </div>`;
  }).join('');
  setTimeout(() => {
    grid.querySelectorAll('.skill-lang-bar').forEach(b => b.style.width = b.dataset.pct + '%');
  }, 300);
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function animateNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  const numEl = el.querySelector('.stat-num');
  if (!numEl) return;
  const start = performance.now();
  const duration = 1200;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    numEl.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── MAIN INIT ─────────────────────────────────────────────────────────────────
async function init() {
  initProgressBar();
  initTyping();

  // Fetch GitHub user for bio
  const user = await fetchUser();
  if (user) {
    const bioEl = document.getElementById('ghBio');
    if (bioEl) bioEl.textContent = user.bio || '';
  }

  const grid = document.getElementById('projectsGrid');
  const loading = document.getElementById('projectsLoading');
  const errorEl = document.getElementById('projectsError');
  const pinnedNotice = document.getElementById('pinnedNotice');

  try {
    const repos = await fetchRepos();
    if (repos.length === 0) {
      loading.classList.add('hidden');
      errorEl.classList.remove('hidden');
      return;
    }

    const langResults = await Promise.all(repos.map(r => fetchLanguages(r.name)));

    const langTotals = {};
    langResults.forEach(langs => {
      Object.entries(langs).forEach(([lang, bytes]) => {
        langTotals[lang] = (langTotals[lang] || 0) + bytes;
      });
    });

    const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
    animateNum('statRepos', repos.length);
    animateNum('statStars', totalStars);
    animateNum('statLangs', Object.keys(langTotals).length);

    loading.classList.add('hidden');
    grid.classList.remove('hidden');

    repos.forEach((repo, i) => grid.appendChild(buildCard(repo, langResults[i])));
    if (PINNED_REPOS) pinnedNotice.classList.remove('hidden');

    renderSkills(langTotals);
    window.completeProgressBar?.();
    setTimeout(observeReveal, 100);

  } catch (err) {
    loading.classList.add('hidden');
    errorEl.classList.remove('hidden');
    window.completeProgressBar?.();
    console.error(err);
  }
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── ACTIVE NAV ────────────────────────────────────────────────────────────────
function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`)?.classList.add('active');
      }
    });
  }, { threshold: 0.4 }).observe;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector(`.nav-link[href="#${entry.target.id}"]`)?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.section').forEach(s => io.observe(s));
}

// ── HAMBURGER ─────────────────────────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  btn.addEventListener('click', () => { btn.classList.toggle('open'); sidebar.classList.toggle('open'); });
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    btn.classList.remove('open'); sidebar.classList.remove('open');
  }));
}

// ── MODAL EVENTS ──────────────────────────────────────────────────────────────
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.getElementById('showAllBtn')?.addEventListener('click', () => alert('Set PINNED_REPOS = null in script.js to show all repos.'));

// ── BOOT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  init();
  observeReveal();
  initActiveNav();
  initHamburger();
});
