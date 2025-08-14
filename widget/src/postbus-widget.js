(function(){
  function h(tag, props={}, children=[]) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k,v]) => {
      if (k === 'class') el.className = v; else el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (typeof c === 'string') el.appendChild(document.createTextNode(c));
      else if (c) el.appendChild(c);
    });
    return el;
  }

  async function fetchJSON(url, opts) {
    const r = await fetch(url, opts);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  const Widget = {
    init(opts) {
      const container = document.querySelector(opts.container);
      if (!container) return;

      const state = {
        fromStop: opts.fromStop || '',
        toStop: opts.toStop || '',
        date: opts.checkinDate || new Date().toISOString().slice(0,10),
        adults: opts.adults || 1
      };

      const ui = render();

      container.appendChild(ui);

      async function onCheck() {
        const url = `${opts.deepLinkBase}/availability?from=${state.fromStop}&to=${state.toStop}&date=${state.date}`;
        btnCheck.disabled = true;
        try {
          const data = await fetchJSON(url);
          result.textContent = `Disponibilité: véhicules ${data.vehicles_available}, conducteurs ${data.drivers_available}`;
          bookBtn.style.display = 'inline-block';
        } catch(e) {
          result.textContent = 'Erreur de disponibilité';
        } finally {
          btnCheck.disabled = false;
        }
      }

      function onBook() {
        const q = new URLSearchParams({
          from: state.fromStop, to: state.toStop,
          date: state.date, adults: state.adults,
          partner: (opts.partner || ''),
        });
        window.location.href = `${opts.deepLinkBase}/trips/offer?${q.toString()}`;
      }

      const dateInput = ui.querySelector('input[type=date]');
      const adultsInput = ui.querySelector('input[type=number]');
      const btnCheck = ui.querySelector('button[data-role=check]');
      const bookBtn = ui.querySelector('button[data-role=book]');
      const result = ui.querySelector('[data-role=result]');

      dateInput.addEventListener('change', e => state.date = e.target.value);
      adultsInput.addEventListener('change', e => state.adults = parseInt(e.target.value,10) || 1);
      btnCheck.addEventListener('click', onCheck);
      bookBtn.addEventListener('click', onBook);

      function render() {
        return h('div', { class: 'postbus-widget' }, [
          h('div', { class: 'pbw-row' }, [
            h('label', {}, 'Date '),
            h('input', { type: 'date', value: state.date })
          ]),
          h('div', { class: 'pbw-row' }, [
            h('label', {}, 'Adultes '),
            h('input', { type: 'number', min: '1', value: String(state.adults) })
          ]),
          h('div', { class: 'pbw-row' }, [
            h('button', { 'data-role': 'check' }, 'Vérifier'),
            h('button', { 'data-role': 'book', style: 'display:none;margin-left:8px;' }, 'Réserver')
          ]),
          h('div', { 'data-role': 'result', style: 'margin-top:8px;' }, '')
        ]);
      }
    }
  };

  window.PostBusWidget = Widget;
})();
