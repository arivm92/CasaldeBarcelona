// Components comuns reutilitzables

// Calcular base URL basada en la ubicació del propi script (això fa que funcioni des de subcarpetes)
const _scriptEl = (function(){
    if (document.currentScript) return document.currentScript;
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.match(/components\.js$/)) return scripts[i];
    }
    return null;
})();
const scriptBase = _scriptEl ? _scriptEl.src.substring(0, _scriptEl.src.lastIndexOf('/') + 1) : './';

function makeUrl(rel) {
    // Retorna una URL absoluta basada en la ubicació del script
    try {
        return new URL(rel, scriptBase).href;
    } catch (e) {
        // fallback
        return scriptBase + rel;
    }
}

// Generar HTML dinàmicament utilitzant makeUrl
function getHeaderHTML() {
    return `
<header>
    <img src="${makeUrl('escutXIV.jpg')}" alt="Escut del Casal de Barcelona" class="logo">
    <h1>El Casal de Barcelona</h1>
</header>
`;
}

function getNavHTML() {
    return `
<nav>
    <a href="${makeUrl('index.html')}" class="nav-link" data-page="index">Inici</a>
    <a href="${makeUrl('elCasal.html')}" class="nav-link" data-page="elCasal">El Casal</a>
    <a href="${makeUrl('personatges.html')}" class="nav-link" data-page="personatges">Personatges</a>
    <a href="${makeUrl('liniaT.html')}" class="nav-link" data-page="liniaT">Línia del temps</a>
    <a href="${makeUrl('recursos.html')}" class="nav-link" data-page="recursos">Recursos</a>
    <a href="${makeUrl('sobremi.html')}" class="nav-link" data-page="sobremi">Sobre mi</a>
</nav>
`;
}

function getFooterHTML() {
    return `
<footer>
    © 2025 — Projecte històric del Casal de Barcelona
</footer>
`;
}

// Funció per injectar els componentes
function loadComponents() {
    const body = document.body;

    // Header
    const headerDiv = document.createElement('div');
    headerDiv.innerHTML = getHeaderHTML();
    body.insertBefore(headerDiv.firstElementChild, body.firstChild);

    // Nav
    const navDiv = document.createElement('div');
    navDiv.innerHTML = getNavHTML();
    body.insertBefore(navDiv.firstElementChild, body.querySelector('section') || body.querySelector('footer'));

    // Footer
    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = getFooterHTML();
    body.appendChild(footerDiv.firstElementChild);

    // Marcar enllaç actiu comparant nom de fitxer
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        try {
            const linkFilename = new URL(link.href).pathname.split('/').pop();
            if (linkFilename === currentPage) link.classList.add('active');
        } catch (e) {
            // si falla, fer fallback comparant href original
            const href = link.getAttribute('href') || '';
            if (href.endsWith(currentPage)) link.classList.add('active');
        }
    });
}

// Executar quan el DOM estigui carregat
document.addEventListener('DOMContentLoaded', loadComponents);
