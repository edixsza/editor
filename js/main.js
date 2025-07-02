document.addEventListener('DOMContentLoaded', () => {
    // Detecta idioma e tema preferido
    let lang = localStorage.getItem('lang') || ((navigator.language || navigator.userLanguage).toLowerCase().startsWith('en') ? 'en' : 'pt');
    const texts = {
        pt: {
            themeToggle: "Alternar tema",
            headerTitle: "edixsza",
            navSobre: "Sobre",
            navLong: "Vídeos Longos",
            navShorts: "Shorts",
            navContato: "Contato",
            sobreTitle: "Sobre Mim",
            sobreText: "Sou um editor de vídeo de 17 anos. Comecei a editar por diversão aos 11, e agora estou dando meus primeiros passos profissionais na área. Trabalho com edições de gameplays, vlogs e reels/shorts.",
            sobreTextExtra: "Skills:",
            sobreList: [
                "• Decupagem",
                "• Zooms simples/dinâmicos",
                "• Legendas",
                "• Pequenos motion graphics"
            ],
            projetosTitle: "Projetos em Destaque",
            longVideosLabel: "Vídeos Longos:",
            shortsLabel: "Shorts:",
            contatoTitle: "Contato",
            footerText: "© 2025 edixsza. Todos os direitos reservados."
        },
        en: {
            themeToggle: "Toggle theme",
            headerTitle: "edixsza",
            navSobre: "About",
            navLong: "Long Videos",
            navShorts: "Shorts",
            navContato: "Contact",
            sobreTitle: "About Me",
            sobreText: "I'm a 17-year-old video editor. I started editing for fun at 11, and now I'm taking my first professional steps in the field. I work with gameplay edits, vlogs, and reels/shorts.",
            sobreTextExtra: "Skills:",
            sobreList: [
                "• Footage breakdown and trimming",
                "• Simple/dynamic zooms",
                "• Subtitles",
                "• Light motion graphics"
            ],
            projetosTitle: "Featured Projects",
            longVideosLabel: "Long Videos:",
            shortsLabel: "Shorts:",
            contatoTitle: "Contact",
            footerText: "© 2025 edixsza. All rights reserved."
        }
    };

    function setLang() {
        document.getElementById('header-title').innerHTML = `
<span class="name-wrapper">
  <span class="artistic-name">edixsza</span>
  <span class="real-name">Edi</span>
</span>
  `;

        document.getElementById('nav-sobre').textContent = texts[lang].navSobre;
        document.getElementById('nav-long').textContent = texts[lang].navLong;
        document.getElementById('nav-shorts').textContent = texts[lang].navShorts;
        document.getElementById('nav-contato').textContent = texts[lang].navContato;
        document.getElementById('sobre-title').textContent = texts[lang].sobreTitle;
        document.getElementById('sobre-text').textContent = texts[lang].sobreText;

        const languagesPara = document.createElement('p');
        languagesPara.id = "languages-para";
        languagesPara.textContent = lang === 'en' ?
            'Languages: Portuguese (native), English (intermediary B1-B2).' :
            'Idiomas: Português (nativo), Inglês (intermediário B1-B2).';
        languagesPara.style.marginTop = '0';
        languagesPara.style.lineHeight = '1.3';
        languagesPara.style.color = 'var(--accent)';
        languagesPara.style.fontStyle = 'italic';

        const oldPara = document.getElementById('languages-para');
        if (oldPara) oldPara.remove();

        document.getElementById('sobre-text').insertAdjacentElement('afterend', languagesPara);

        const extraText = texts[lang].sobreTextExtra;
        document.getElementById('sobre-text-extra').innerHTML = `
    <h2 style="margin-top: 1rem;">${extraText}</h2>
    <p style="margin-top: 0.5rem;">${texts[lang].sobreList.join('<br>')}</p>
  `;

        document.getElementById('projetos-title').textContent = texts[lang].projetosTitle;
        document.getElementById('long-videos-label').textContent = texts[lang].longVideosLabel;
        document.getElementById('shorts').textContent = texts[lang].shortsLabel;
        document.getElementById('contato-title').textContent = texts[lang].contatoTitle;
        document.getElementById('footer-text').textContent = texts[lang].footerText;

        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) langBtn.textContent = lang === 'en' ? '🇬🇧' : '🇧🇷';
    }

    setLang();

    // Botão para trocar idioma manualmente
    document.getElementById('lang-toggle').addEventListener('click', () => {
        lang = lang === 'pt' ? 'en' : 'pt';
        localStorage.setItem('lang', lang);
        setLang();
    });

    // Modal da imagem de perfil
    const profilePic = document.getElementById('profile-pic');
    const modal = document.getElementById('img-modal');
    const modalImg = modal.querySelector('img');

    modalImg.addEventListener('contextmenu', (e) => e.preventDefault());
    modalImg.setAttribute('draggable', 'false');

    profilePic.addEventListener('click', () => {
        modalImg.src = profilePic.src;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.focus();
    });

    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modalImg.src = '';
    });

    // Botão de Tema Claro/Escuro
    const toggleBtn = document.getElementById('theme-toggle');
    const prefersLight = localStorage.getItem('theme') === 'light';

    if (prefersLight) {
        document.documentElement.classList.add('light-theme');
        toggleBtn.textContent = '🌞';
    } else {
        toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
        const html = document.documentElement;
        html.classList.toggle('light-theme');
        const isLight = html.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌞' : '🌙';
    });

    // Modal ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
        }
    });
});
