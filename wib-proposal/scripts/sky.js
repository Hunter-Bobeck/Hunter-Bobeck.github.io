function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numberOfStars = 200;

    // Initialize anomalies
    initializeAnomalies(starsContainer);

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size between 1 and 3 pixels
        const size = Math.random() * 2 + 1;
        
        // Random twinkle duration between 3 and 8 seconds
        const twinkleDuration = (Math.random() * 5 + 3) + 's';
        
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            --twinkle-duration: ${twinkleDuration};
            opacity: ${Math.random()};
        `;
        
        starsContainer.appendChild(star);
    }
}

// Add this line to auto-initialize when the script loads
document.addEventListener('DOMContentLoaded', createStars); 