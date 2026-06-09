(function () {
  const scene = document.getElementById('hero-scene');
  const items = document.querySelectorAll('.float-item');
  if (!scene || !items.length) return;

  const state = {
    mouseX: 0,
    mouseY: 0,
    sceneRect: null,
  };

  function updateSceneRect() {
    state.sceneRect = scene.getBoundingClientRect();
  }

  updateSceneRect();
  window.addEventListener('resize', updateSceneRect);

  document.addEventListener('mousemove', (e) => {
    state.mouseX = e.clientX;
    state.mouseY = e.clientY;
    applyParallax();
  });

  document.addEventListener('touchmove', (e) => {
    if (!e.touches.length) return;
    state.mouseX = e.touches[0].clientX;
    state.mouseY = e.touches[0].clientY;
    applyParallax();
  }, { passive: true });

  function applyParallax() {
    const rect = state.sceneRect;
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (state.mouseX - centerX) / (rect.width / 2);
    const relY = (state.mouseY - centerY) / (rect.height / 2);

    items.forEach((item) => {
      const depth = parseFloat(item.dataset.depth) || 0.05;
      const itemRect = item.getBoundingClientRect();
      const itemCX = itemRect.left + itemRect.width / 2;
      const itemCY = itemRect.top + itemRect.height / 2;

      const dx = state.mouseX - itemCX;
      const dy = state.mouseY - itemCY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 280;
      const proximity = Math.max(0, 1 - dist / maxDist);

      const moveX = relX * depth * 120 + (dx / maxDist) * proximity * 18;
      const moveY = relY * depth * 120 + (dy / maxDist) * proximity * 18;
      const tiltX = -relY * depth * 12 + (dy / maxDist) * proximity * 6;
      const tiltY = relX * depth * 12 + (dx / maxDist) * proximity * 6;
      const scale = 1 + proximity * 0.08;

      item.style.transform = `
        translate(${moveX}px, ${moveY}px)
        perspective(600px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale(${scale})
      `;

      item.classList.toggle('is-near', proximity > 0.3);
    });
  }

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.style.zIndex = '30';
    });
    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '10';
    });
  });
})();
