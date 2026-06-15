function switchTab(tabId) {
    document.querySelectorAll('.tab-nav .tab-btn').forEach(b => b.classList.remove('active'));
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) targetTab.classList.add('active');

    const sections = ['about', 'resume', 'edu', 'skills', 'proj', 'cert', 'res', 'contact', 'cl'];
    sections.forEach(s => {
        const sectionEl = document.getElementById('content-' + s);
        if (sectionEl) sectionEl.style.display = (s === tabId) ? 'block' : 'none';
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if(tabId === 'skills' || tabId === 'resume') {
        setTimeout(animateBars, 100);
    }
}

function animateBars() {
    document.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.getAttribute('data-w');
    });
}
