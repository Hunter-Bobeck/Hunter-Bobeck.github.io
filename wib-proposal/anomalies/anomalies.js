let isAuthenticated = false;

function initializeAnomalies(starsContainer) {
    // Animation timing constants
    const ANIMATION_DURATION = 5500;
    const DELAY_SETTINGS = {
        min: 10000,    // 10 seconds
        max: 180000,   // 3 minutes
        initialMin: 60000,  // 1 minute
        initialMax: 120000  // 2 minutes
    };

    // Generic function to handle animations
    function createAnimatedElement(className) {
        const element = document.createElement('div');
        element.className = className;
        starsContainer.appendChild(element);
        return element;
    }

    function scheduleAnimation(element, animationFunction) {
        const initialDelay = Math.random() * 
            (DELAY_SETTINGS.initialMax - DELAY_SETTINGS.initialMin) + 
            DELAY_SETTINGS.initialMin;
        
        setTimeout(() => animationFunction(element), initialDelay);
    }

    function playAnimation(element) {
        element.classList.add('animate');
        
        setTimeout(() => {
            element.classList.remove('animate');
            
            // Schedule next animation
            const nextDelay = Math.random() * 
                (DELAY_SETTINGS.max - DELAY_SETTINGS.min) + 
                DELAY_SETTINGS.min;
            setTimeout(() => playAnimation(element), nextDelay);
        }, ANIMATION_DURATION);
    }

    // Create and schedule animations
    const shooter = createAnimatedElement('shooter');
    const streaker = createAnimatedElement('streaker');

    // Create flashbulb with special handling
    const flashbulb = createAnimatedElement('flashbulb');

    function playFlashbulbAnimation() {
        // Randomize position
        const randomLeft = Math.random() * 98 + 1;  // 1-99%
        const randomTop = Math.random() * 98 + 1;   // 1-99%
        flashbulb.style.left = `${randomLeft}%`;
        flashbulb.style.top = `${randomTop}%`;

        flashbulb.classList.add('animate');
        
        setTimeout(() => {
            flashbulb.classList.remove('animate');
            
            // Schedule next animation with random delay (20s-120s)
            const nextDelay = Math.random() * 100000 + 20000;
            setTimeout(playFlashbulbAnimation, nextDelay);
        }, 4330); // Match CSS duration
    }

    // Start repeating animations immediately
    scheduleAnimation(shooter, playAnimation);
    scheduleAnimation(streaker, playAnimation);
    setTimeout(playFlashbulbAnimation, Math.random() * 100000 + 20000);

    // Create one-time elements but wait to start them
    const powerup = createAnimatedElement('powerup');
    const craft = createAnimatedElement('craft');
    const craftBody = document.createElement('div');
    craftBody.className = 'craft-body';
    const craftRing = document.createElement('div');
    craftRing.className = 'craft-ring';
    craft.appendChild(craftBody);
    craft.appendChild(craftRing);

    // Function to start one-time animations after authentication
    window.startOneTimeAnomalies = () => {
        if (!isAuthenticated) return;

        // Start craft animation after 10 seconds
        setTimeout(() => {
            craft.classList.add('animate');
        }, 10000);

        // Random delay between 10-30 seconds for powerup
        const powerupDelay = Math.random() * 20000 + 10000;
        setTimeout(() => {
            powerup.style.animationPlayState = 'running';
        }, powerupDelay);
    };
} 