// ───────── THEME ─────────
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', target);
    localStorage.setItem('theme', target);
    if (typeof updateChartsTheme === 'function') {
        updateChartsTheme(target);
    }
}

// ───────── MODALS ─────────
function openModal(type, id) {
    const overlay = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDesc');
    if (!overlay || !title || !desc) return;

    if(type === 'cert') {
        const certs = {
            1: ["Karol & Setha Training", "Intensive soft-skills training focused on communication, leadership, and professional integrity provided by Enfants du Mékong."],
            2: ["Mathematics Honor Roll", "Awarded for achieving top-tier academic results during the 2023-2024 academic year at the Royal University of Phnom Penh."],
            3: ["English B1 Intermediate", "Certification of linguistic proficiency in English, demonstrating ability to handle complex academic texts and professional communication."]
        };
        title.innerText = certs[id] ? certs[id][0] : "Certificate Detail";
        desc.innerText = certs[id] ? certs[id][1] : "";
    } else {
        title.innerText = "Project Detail";
        desc.innerText = "A detailed overview of the mathematical initiative, methodology, and student outcomes.";
    }

    overlay.classList.add('open');
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('open');
}

// ───────── RESOURCES FILTER ─────────
let currentResFilter = 'all';

function setResourceFilter(f) {
    currentResFilter = f;
    document.querySelectorAll('.rfilter').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(f) || (f === 'all' && btn.innerText === 'All'));
    });
    filterResources();
}

function filterResources() {
    const searchInput = document.getElementById('resSearch');
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const rows = document.querySelectorAll('.res-row');

    rows.forEach(row => {
        const nameEl = row.querySelector('.res-name');
        const text = nameEl ? nameEl.innerText.toLowerCase() : "";
        const cats = row.getAttribute('data-cat') || "";
        const matchesQuery = text.includes(query);
        const matchesFilter = currentResFilter === 'all' || cats.includes(currentResFilter);

        row.style.display = (matchesQuery && matchesFilter) ? 'flex' : 'none';
    });
}

// ───────── BLOG HANDLERS ─────────
function showBlogPost(id) {
    const list = document.getElementById('blog-list-view');
    const post = document.getElementById('blog-post-view');
    const content = document.getElementById('blog-post-content');
    if (!list || !post || !content) return;

    const posts = {
        1: `<h3>Logical Foundations</h3><p>Mathematics in Cambodia often suffers from a "formula-first" approach. My research into pedagogy suggests that when students understand <em>why</em> a derivation works, they retain the knowledge 10x longer than through simple memorization...</p><p>We must transition classrooms toward inquiry-based learning where the teacher acts as a facilitator of discovery.</p>`,
        2: `<h3>The AI Frontier</h3><p>Artificial Intelligence is not the enemy of the math teacher. When used correctly, tools like Photomath or ChatGPT can provide immediate feedback that a single teacher in a room of 40 students cannot...</p><h3>Best Practices</h3><ul><li>Use AI to explain steps, not just give answers.</li><li>Verify AI outputs using first principles.</li></ul>`
    };

    content.innerHTML = posts[id] || "";
    list.style.display = 'none';
    post.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideBlogPost() {
    const list = document.getElementById('blog-list-view');
    const post = document.getElementById('blog-post-view');
    if (list && post) {
        list.style.display = 'block';
        post.style.display = 'none';
    }
}

// ───────── CONTACT ─────────
function handleContactSubmit(e) {
    e.preventDefault();
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
    }
    e.target.reset();
}

// ───────── COVER LETTER ─────────
function updateCoverLetterDate() {
    const dateEl = document.getElementById('cl-date');
    if (dateEl) {
        const now = new Date();
        dateEl.innerText = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
}

// ───────── INITIALIZATION ─────────
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    // Initializations are now handled by loadSections().then() in index.html
    // to account for modular section loading.
});
