// FAQ acordeón: al tocar la pregunta se despliega/oculta la respuesta
document.addEventListener('DOMContentLoaded', function () {
  const accordion = document.querySelector('.faq-accordion');
  if (!accordion) return;

  const questions = accordion.querySelectorAll('.faq-question');
  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
