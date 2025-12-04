// ============================================
// INTERATIVIDADE E EVENTOS
// ============================================

/**
 * Função para lidar com clique no botão "Ver Projetos"
 * AGORA REDIRECIONA PARA O PORTFÓLIO: https://agenor-portifolio1.vercel.app/
 */
function handleProjectsClick() {
    console.log('Botão "Ver Projetos" clicado! Redirecionando para o portfólio externo.');
    // Abre o URL desejado em uma nova aba.
    window.open('https://agenor-portifolio1.vercel.app/', '_blank');
}

/**
 * Adiciona interatividade ao container de imagem
 */
document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('imageContainer');
    const rightColumn = document.getElementById('rightColumn');
    
    if (imageContainer) {
        // Efeito de hover na imagem (mantido no JS, mas há regras CSS também)
        imageContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Adiciona suporte a toque em dispositivos móveis
    if (rightColumn) {
        rightColumn.addEventListener('touchstart', function() {
            if (imageContainer) {
                imageContainer.style.transform = 'scale(1.03)';
            }
        });

        rightColumn.addEventListener('touchend', function() {
            if (imageContainer) {
                imageContainer.style.transform = 'scale(1)';
            }
        });
    }

    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.log(`Seção ${targetId} ainda não implementada`);
                }
            }
        });
    });

    // Animação de entrada para elementos
    animateElementsOnScroll();
});

/**
 * Anima elementos quando entram na viewport
 */
function animateElementsOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observa as colunas do hero
    const heroColumns = document.querySelectorAll('.hero-column');
    heroColumns.forEach(column => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(20px)';
        column.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        observer.observe(column);
    });
}

/**
 * Adiciona efeito de parallax ao scroll (opcional)
 */
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const elements = document.querySelectorAll('.hero-column');
    
    elements.forEach((element, index) => {
        // Aplica um efeito de parallax suave
        element.style.transform = `translateY(${scrollTop * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`;
    });
});

/**
 * Função para detectar modo escuro do sistema
 */
function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Modo escuro detectado');
    }
}

// Executa ao carregar
detectDarkMode();

// Monitora mudanças de preferência de tema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        console.log('Mudou para modo escuro');
    } else {
        console.log('Mudou para modo claro');
    }
});
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


  ttq.load('D4EKTU3C77UF4SPAJHV0');
  ttq.page();
}(window, document, 'ttq');

