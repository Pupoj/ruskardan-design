// Вкладки прайса и заявка на звонок (статический сайт: письмо через почтовый клиент).
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  });
});

document.querySelectorAll('.request-form').forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const status = form.querySelector('.form-status');
    const d = new FormData(form);
    if (!d.get('name') || !d.get('phone')) { status.textContent = 'Укажите имя и телефон — по нему мастер перезвонит.'; return; }
    if (!d.get('consent')) { status.textContent = 'Отметьте согласие на обработку данных, чтобы отправить заявку.'; return; }
    const body = `Имя: ${d.get('name')}\nТелефон: ${d.get('phone')}\nМашина: ${d.get('class')}\nУслуга: ${d.get('service') || 'консультация'}\n\n${d.get('comment') || ''}`;
    location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent('Заказ звонка с сайта')}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Открываем почту с готовым письмом. Если не открылась — позвоните нам.';
  });
});
