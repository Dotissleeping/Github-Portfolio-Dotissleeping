<div align="center">

# 🌿 Dotissleeping — Developer Portfolio

**A clean, editorial-style personal portfolio built with vanilla HTML, CSS, and JavaScript.**
Hosted on GitHub Pages · Powered by the GitHub REST API

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-1F4A2C?style=for-the-badge&logo=github&logoColor=white)](https://dotissleeping.github.io)
[![Made with HTML](https://img.shields.io/badge/HTML5-e34c26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Made with CSS](https://img.shields.io/badge/CSS3-563d7c?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Made with JS](https://img.shields.io/badge/JavaScript-f1e05a?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 👤 Author

 `@Dotissleeping`
Bachelor of Science in Information Technology (BSIT)
📍 Philippines · 🐙 [github.com/Dotissleeping](https://github.com/Dotissleeping)

---

## ✨ Features

- 🔗 **Live GitHub API integration** — repos, stars, forks, and languages fetched automatically, no manual updating needed
- 🖼️ **Project modal** — click any project card to open a detailed view with image preview (left), info (right)
- 🎨 **Language-colored cards** — each project card has a top border in the exact color of its primary language
- ⌨️ **Typing animation** — home title cycles through *Building / Designing / Shipping / Creating / Crafting*
- 📊 **Auto-detected skills** — language usage bars generated from your actual repo data
- 🧩 **Tech stack icon grid** — visual logo grid for your core technologies
- 🕐 **"X days ago"** — each card shows how recently the repo was updated
- 📷 **Project previews** — drop a PNG in `/previews/repo-name.png` and it auto-appears in the modal
- 📈 **Animated loading bar** — thin green progress bar at the top while repos load
- 🌾 **Grain texture overlay** — subtle paper-like noise for a premium editorial feel
- 📱 **Fully responsive** — mobile hamburger menu, stacked layouts on small screens
- 🔖 **Custom favicon** — green circle "D" lettermark matching the site's color palette

---

## 🗂️ Project Structure

```
dotissleeping.github.io/
│
├── index.html          # Main HTML — structure & sections
├── style.css           # All styling — variables, layout, components
├── script.js           # GitHub API logic, animations, interactions
│
├── favicon.ico         # Browser tab icon
├── favicon-512.png     # High-res favicon (also Apple touch icon)
│
├── previews/           # Project screenshot images (you add these)
│   ├── repo-name.png   # Named exactly after each GitHub repo
│   └── ...
│
└── README.md           # This file
```

---

## 🚀 Getting Started

### 1. Fork or clone this repo

```bash
git clone https://github.com/Dotissleeping/Dotissleeping.github.io.git
cd Dotissleeping.github.io
```

### 2. Set your GitHub username

Open `script.js` and update line 5:

```js
const GITHUB_USERNAME = 'Dotissleeping'; // ← change this to your username
```

### 3. Choose which repos to show

```js
// Show ALL public repos (default):
const PINNED_REPOS = null;

// Or pick specific ones:
const PINNED_REPOS = ['my-project', 'another-repo', 'cool-app'];
```

### 4. Add project previews *(optional)*

Take a screenshot of each project and save it as:
```
previews/exact-repo-name.png
```
The image will automatically appear in the project modal. Supports any aspect ratio — portrait, square, landscape.

### 5. Customize the tech stack icons

In `index.html`, find the **Tech Stack** section and add/remove `tech-icon-block` divs:

```html
<div class="tech-icon-block">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
  <span class="tech-icon-name">React</span>
</div>
```

Browse all available icons at [devicons.dev](https://devicons.dev).

---

## 🎨 Color Palette

| Role | Variable | Color |
|---|---|---|
| Background | `--cream` | `#EDE8DC` |
| Dark background | `--cream-dark` | `#DDD8CC` |
| Primary green | `--green` | `#1F4A2C` |
| Light green | `--green-light` | `#2D6B3F` |
| Muted green | `--green-muted` | `#4A7A5A` |
| Text | `--charcoal` | `#2A2A2A` |
| Muted text | `--muted` | `#7A7A6A` |

All colors are CSS variables in `style.css` — change one and it updates everywhere.

---

## 🛠️ Tech Used

![HTML5](https://img.shields.io/badge/HTML5-e34c26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-563d7c?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f1e05a?style=flat-square&logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub%20API-181717?style=flat-square&logo=github&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-1F4A2C?style=flat-square&logo=github&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=flat-square&logo=google&logoColor=white)
![Devicons](https://img.shields.io/badge/Devicons-000000?style=flat-square&logo=devdotto&logoColor=white)

- **Fonts** — Cormorant Garamond (serif) + Montserrat (sans-serif) via Google Fonts
- **Icons** — [Devicons](https://devicons.dev) via jsDelivr CDN
- **No frameworks** — pure vanilla HTML, CSS, and JavaScript. Zero dependencies.

---

## 📸 Sections

| # | Section | Description |
|---|---|---|
| 🏠 | **Home** | Title with typing animation, GitHub stats card (repos, stars, languages) |
| 01 | **Projects** | Auto-fetched repo cards with language colors, time ago, commit info |
| 02 | **Skills** | Tech stack icon grid + auto-detected language bars from repos |
| 03 | **Contact** | GitHub profile link (add email, LinkedIn as needed) |
| — | **Footer** | Name, year, GitHub link |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with 🌿 by **Aldrich Fernandez** · [@Dotissleeping](https://github.com/Dotissleeping)

</div>
