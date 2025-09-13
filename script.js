// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const mobilePanel = document.getElementById('mobile-nav');

menuBtn?.addEventListener('click', () => {
  const open = mobilePanel.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

mobilePanel?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// IntersectionObserver para revelar seções
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => io.observe(el));

// Botão Voltar ao topo
const toTop = document.getElementById('toTop');
const toggleTop = () => {
  const show = window.scrollY > 600;
  toTop.style.opacity = show ? 1 : 0;
  toTop.style.pointerEvents = show ? 'auto' : 'none';
  toTop.style.transform = show ? 'none' : 'translateY(6px)';
};

window.addEventListener('scroll', toggleTop, { passive: true });

toTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Validação do formulário com regras simples
const form = document.getElementById('form-contato');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    if (!nome.value.trim()) {
      nome.focus();
      alert('Por favor, informe seu nome.');
      return;
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.focus();
      alert('Por favor, informe um e-mail válido.');
      return;
    }

    if (!mensagem.value.trim()) {
      mensagem.focus();
      alert('Por favor, escreva sua mensagem.');
      return;
    }

    // Simulação de envio
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
  });
}
