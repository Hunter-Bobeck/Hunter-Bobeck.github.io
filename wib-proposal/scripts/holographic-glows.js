function initializeHolographicGlows() {
    const container = document.querySelector('.container');
    const overlay = document.querySelector('.holographic-overlay');

    container.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        overlay.style.background = `
            radial-gradient(
                circle at ${x * 100}% ${y * 100}%,
                rgba(0, 255, 242, 0.05) 0%,
                transparent 50%
            ),
            linear-gradient(
                45deg,
                transparent 65%,
                rgba(0, 255, 242, 0.08) 100%
            )
        `;
    });
} 