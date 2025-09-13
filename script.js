// ===== JS principal para Águas Planalto =====
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-btn');
  const panel = document.getElementById('mobile-nav');

  // Garante que o backdrop exista
  let backdrop = document.getElementById('mobile-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'mobile-backdrop';
    backdrop.className = 'mobile-backdrop';
    (document.querySelector('nav.navbar') || document.body).appendChild(backdrop);
  }

  // Abre menu mobile
  const openMenu = () => {
    if (!panel) return;
    panel.classList.add('open');
    document.documentElement.classList.add('menu-open');
    btn?.setAttribute('aria-expanded', 'true');
    backdrop.style.display = 'block';
  };

  // Fecha menu mobile
  const closeMenu = () => {
    if (!panel) return;
    panel.classList.remove('open');
    document.documentElement.classList.remove('menu-open');
    btn?.setAttribute('aria-expanded', 'false');
    backdrop.style.display = 'none';
  };

  // Alterna menu
  const toggleMenu = () =>
    panel?.classList.contains('open') ? closeMenu() : openMenu();

  // Substitui botão para evitar múltiplos listeners
  if (btn) {
    const clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
    clone.addEventListener('click', e => {
      e.preventDefault();
      toggleMenu();
    });
  }

  // Fecha menu ao clicar em links
  panel?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Fecha menu ao clicar no backdrop ou pressionar ESC
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Fecha menu ao redimensionar para desktop
  const handleResize = () => { if (window.innerWidth >= 861) closeMenu(); };
  window.addEventListener('resize', handleResize);
  handleResize();

  // --- Animação de revelação de seções ---
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  // --- Botão voltar ao topo ---
  const toTop = document.getElementById('toTop');
  const toggleTop = () => {
    if (!toTop) return;
    const show = window.scrollY > 600;
    toTop.style.opacity = show ? '1' : '0';
    toTop.style.pointerEvents = show ? 'auto' : 'none';
    toTop.style.transform = show ? 'none' : 'translateY(6px)';
  };
  window.addEventListener('scroll', toggleTop, { passive: true });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggleTop();

  // --- Validação simples do formulário ---
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nome = form.querySelector('#nome');
      const email = form.querySelector('#email');
      const mensagem = form.querySelector('#mensagem');
      const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

      if (!nome?.value.trim()) {
        nome?.focus();
        alert('Por favor, informe seu nome.');
        return;
      }
      if (!emailOk(email?.value)) {
        email?.focus();
        alert('Por favor, informe um e-mail válido.');
        return;
      }
      if (!mensagem?.value.trim()) {
        mensagem?.focus();
        alert('Por favor, escreva sua mensagem.');
        return;
      }

      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset();
    });
  }
});
