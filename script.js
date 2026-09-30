// ===== MENU MOBILE =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL ATIVO NO MENU =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== ANIMAÇÃO FADE-IN =====
const fadeElements = document.querySelectorAll(
    '.servico-card, .card-info, .diferencial-item, .empresa-card, .contato-item, .sobre-text, .sobre-cards'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===== FORMULÁRIO DE CONTATO =====
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !email || !telefone || !assunto || !mensagem) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Monta mensagem para o WhatsApp
    const texto = `*Nova mensagem do site Mara Flower Transportes*%0A%0A` +
        `*Nome:* ${nome}%0A` +
        `*E-mail:* ${email}%0A` +
        `*Telefone:* ${telefone}%0A` +
        `*Assunto:* ${assunto}%0A` +
        `*Mensagem:* ${mensagem}`;

    const whatsappUrl = `https://wa.me/5566997229806?text=${texto}`;

    // Abre WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');

    showNotification('Mensagem enviada! Você será redirecionado para o WhatsApp.', 'success');
    contatoForm.reset();
});

// ===== NOTIFICAÇÃO =====
function showNotification(message, type) {
    // Remove notificação anterior se existir
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) oldNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Estilos inline para garantir funcionamento
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        color: '#fff',
        fontWeight: '600',
        fontSize: '0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '9999',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        transform: 'translateX(400px)',
        transition: 'transform 0.4s ease',
        maxWidth: '350px',
        background: type === 'success' ? '#25D366' : '#FF6B35'
    });

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// ===== MÁSCARA DE TELEFONE =====
const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})$/, '($1');
    }

    e.target.value = value;
});

// ===== SMOOTH SCROLL PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== LOG DE BOAS-VINDAS =====
console.log('%c🚛 Mara Flower Transportes', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cTransporte rodoviário de carga com segurança e agilidade!', 'color: #004E89; font-size: 14px;');
console.log('%c📞 (66) 99722-9806 | 📧 marahflower.17@hotmail.com', 'color: #25D366; font-size: 12px;');
