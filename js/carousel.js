// Premium app-preview carousel: swipe, arrows, dots, light autoplay.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var viewport = root.querySelector('.pc-viewport');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.pc-slide'));
    if (!viewport || slides.length < 2) return;

    var dotsWrap = root.querySelector('.pc-dots');
    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pc-dot';
      b.setAttribute('aria-label', 'Go to preview ' + (i + 1));
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    var current = 0;
    var autoplayMs = 4500;
    var timer = null;

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      viewport.scrollTo({ left: slides[current].offsetLeft, behavior: 'smooth' });
      setActive(current);
    }
    function setActive(i) {
      dots.forEach(function (d, idx) { d.setAttribute('aria-selected', idx === i ? 'true' : 'false'); });
    }

    var prevBtn = root.querySelector('.pc-prev');
    var nextBtn = root.querySelector('.pc-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { stop(); goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stop(); goTo(current + 1); });

    // Keep dots in sync with manual swipe/scroll.
    var scrollTimeout;
    viewport.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var closest = 0, best = Infinity;
        slides.forEach(function (s, i) {
          var d = Math.abs(s.offsetLeft - viewport.scrollLeft);
          if (d < best) { best = d; closest = i; }
        });
        current = closest;
        setActive(current);
      }, 100);
    }, { passive: true });

    function start() {
      stop();
      timer = setInterval(function () { goTo(current + 1); }, autoplayMs);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('touchstart', stop, { passive: true });
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
  });
});
