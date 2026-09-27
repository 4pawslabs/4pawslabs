/* ============ 4PawsLabs - site nav (mobile toggle + dropdown) ============ */
(function () {
  function closeDrop(drop) {
    drop.classList.remove('open');
    var btn = drop.querySelector('.nav-drop-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('.site-head').forEach(function (head) {
    var toggle = head.querySelector('.nav-toggle');
    var nav = head.querySelector('.site-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) head.querySelectorAll('.nav-drop.open').forEach(closeDrop);
      });

      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    head.querySelectorAll('.nav-drop').forEach(function (drop) {
      var btn = drop.querySelector('.nav-drop-btn');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = drop.classList.contains('open');
        head.querySelectorAll('.nav-drop').forEach(closeDrop);
        if (!isOpen) {
          drop.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-drop.open').forEach(function (drop) {
      if (!drop.contains(e.target)) closeDrop(drop);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-drop.open').forEach(closeDrop);
    }
  });
})();
