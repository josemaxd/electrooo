/* ============================================================
   scrip.js — ELECTROMEC
   Lógica compartida entre páginas.
   ============================================================ */

/* ── CARRUSEL ──────────────────────────────────────────────── */
(function initCarrusel() {
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');
    if (!slides.length) return;

    let idx = 0;
    let timer;

    function irSlide(n) {
        slides[idx].classList.remove('active');
        if (dots[idx]) dots[idx].classList.remove('active');
        idx = (n + slides.length) % slides.length;
        slides[idx].classList.add('active');
        if (dots[idx]) dots[idx].classList.add('active');
        clearInterval(timer);
        timer = setInterval(siguiente, 5000);
    }
    function siguiente() { irSlide(idx + 1); }
    window.irSlide = irSlide;
    timer = setInterval(siguiente, 5000);
})();

/* ── MENÚ LATERAL ──────────────────────────────────────────── */
window.abrirMenu = function () {
    document.getElementById('panelMenu')?.classList.add('activo');
    document.getElementById('menuOverlay')?.classList.add('activo');
    document.body.style.overflow = 'hidden';
};
window.cerrarMenu = function () {
    document.getElementById('panelMenu')?.classList.remove('activo');
    document.getElementById('menuOverlay')?.classList.remove('activo');
    document.body.style.overflow = '';
};

/* ── COTIZAR POR WHATSAPP ──────────────────────────────────── */
window.cotizarWhatsApp = function (producto, precio) {
    const msg = `Hola ELECTROMEC, quiero cotizar: ${producto} (precio referencial S/ ${precio}). ¿Tienen disponibilidad?`;
    window.open(`https://wa.me/51971022550?text=${encodeURIComponent(msg)}`, '_blank');
};

/* ── FORMULARIO DE CONTACTO → WHATSAPP ────────────────────── */
(function initFormContacto() {
    const form = document.getElementById('formContacto');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre   = document.getElementById('fc-nombre')?.value.trim()   ?? '';
        const telefono = document.getElementById('fc-telefono')?.value.trim() ?? '';
        const email    = document.getElementById('fc-email')?.value.trim()    ?? '';
        const servicio = document.getElementById('fc-servicio')?.value        ?? '';
        const mensaje  = document.getElementById('fc-mensaje')?.value.trim()  ?? '';

        let txt = 'Hola ELECTROMEC, les escribo desde su página web:\n\n';
        txt += `*Nombre:* ${nombre}\n*Teléfono:* ${telefono}\n`;
        if (email)    txt += `*Correo:* ${email}\n`;
        if (servicio) txt += `*Servicio:* ${servicio}\n`;
        txt += `\n*Mensaje:*\n${mensaje}`;

        window.open(`https://wa.me/51971022550?text=${encodeURIComponent(txt)}`, '_blank');
        form.reset();
    });
})();

/* ── SCROLL ANIMATIONS ─────────────────────────────────────── */
(function initAnimaciones() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        }),
        { threshold: 0.1 }
    );
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));
})();
