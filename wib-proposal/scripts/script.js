// Initialize password protection immediately
const passwordModal = document.getElementById('password-modal');
const passwordInput = document.getElementById('password-input');
const submitButton = document.getElementById('submit-password');

function checkPassword() {
    const password = passwordInput.value.toLowerCase();
    if (password === 'bingo') {
        passwordModal.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            passwordModal.style.display = 'none';
            isAuthenticated = true;
            window.startOneTimeAnomalies();
        }, 500);
    } else {
        passwordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

submitButton?.addEventListener('click', checkPassword);
passwordInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Ensure modal is visible and interactive immediately
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-password');

    function checkPassword() {
        const password = passwordInput.value.toLowerCase();
        if (password === 'bingo') {
            passwordModal.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                passwordModal.style.display = 'none';
                isAuthenticated = true;
                window.startOneTimeAnomalies();
            }, 500);
        } else {
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
        }
    }

    submitButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Button click sound function that creates new instance each time
    function playButtonSound() {
        const buttonSound = new Audio('https://raw.githubusercontent.com/Felewin/WB-Smith-Avatar/main/SFX/button1.ogg');
        buttonSound.volume = 0.3;
        buttonSound.play();
    }

    // Background Music
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0;  // Start at 0 volume

    // Handle visibility change
    document.addEventListener('visibilitychange', async () => {
        if (document.hidden) {
            // Keep playing when tab is not visible
            if (audioContext) {
                await audioContext.resume();
            }
            if (!bgMusic.paused) {
                await bgMusic.play();
            }
        }
    });

    // Start playing when user interacts with the page
    const startMusic = () => {
        bgMusic.play();
        // Fade in
        let volume = 0;
        const targetVolume = 0.1;  // Lower max volume to 10%
        const fadeInterval = setInterval(() => {
            volume = Math.min(volume + 0.02, targetVolume);
            bgMusic.volume = volume;
            if (volume >= targetVolume) {
                clearInterval(fadeInterval);
            }
        }, 100);  // Adjust every 100ms for a 1.5 second fade

        document.removeEventListener('click', startMusic);
    };
    document.addEventListener('click', startMusic);

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Animate tab buttons sequentially
    tabButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.animation = 'buttonFadeIn 0.8s cubic-bezier(0.34, 1.25, 0.64, 1) forwards';
        }, index * 150); // 150ms delay between each button
    });

    function switchTab(tabId) {
        // Remove active class from all tabs and contents
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        selectedButton.classList.add('active');
        selectedContent.classList.add('active');
    }

    // Add click handlers to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Don't play sound if clicking already active tab
            if (!button.classList.contains('active')) {
                playButtonSound();
            }
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Initialize audio analyzer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function drawWaveform(canvas, analyser, dataArray) {
        const canvasCtx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        function draw() {
            requestAnimationFrame(draw);
            
            analyser.getByteTimeDomainData(dataArray);
            
            canvasCtx.clearRect(0, 0, width, height);  // Clear the entire canvas
            
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = '#00fff2';
            canvasCtx.beginPath();
            
            const sliceWidth = width / bufferLength;
            let x = 0;
            
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (height / 2) + ((v - 1) * height);  // Double the amplitude
                
                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                
                x += sliceWidth;
            }
            
            canvasCtx.lineTo(width, height / 2);  // End at the center line
            canvasCtx.stroke();
        }
        
        draw();
    }

    // Audio functionality
    const audioButtons = document.querySelectorAll('.audio-button');
    let currentlyPlaying = null;

    audioButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const audioId = button.getAttribute('data-audio');
            
            if (currentlyPlaying) {
                currentlyPlaying.button.classList.remove('playing');
                // Show all buttons
                audioButtons.forEach(btn => btn.style.opacity = '1');
                currentlyPlaying.audio.pause();
                currentlyPlaying.container?.classList.remove('visible');
                // Stop any existing audio immediately
                if (currentlyPlaying.audio.stop) {
                    currentlyPlaying.audio.stop();
                }
                currentlyPlaying = null;  // Reset currentlyPlaying here
            }

            if (currentlyPlaying?.button !== button) {
                button.classList.add('playing');
                // Hide all buttons while playing
                audioButtons.forEach(btn => btn.style.opacity = '0');
                const container = button.closest('section').querySelector('.waveform-container');
                const canvas = container.querySelector('canvas');
                const audioPath = canvas.getAttribute('data-audio-src');
                
                if (audioPath) {
                    try {
                        const response = await fetch(audioPath);
                        const arrayBuffer = await response.arrayBuffer();
                        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                        
                        const audio = audioContext.createBufferSource();
                        audio.buffer = audioBuffer;
                        
                        audio.connect(analyser);
                        analyser.connect(audioContext.destination);
                        
                        audio.start(0);
                        container.classList.add('visible');
                        
                        // Remove always-show class from tooltip after first play
                        const tooltip = button.querySelector('.audio-tooltip');
                        if (tooltip.classList.contains('always-show')) {
                            tooltip.classList.remove('always-show');
                        }
                        
                        currentlyPlaying = {
                            button: button,
                            audio: audio,
                            container: container
                        };
                        
                        drawWaveform(canvas, analyser, dataArray);
                        
                        audio.onended = () => {
                            button.classList.remove('playing');
                            // Show all buttons when done
                            audioButtons.forEach(btn => btn.style.opacity = '1');
                            container.classList.remove('visible');
                            currentlyPlaying = null;
                        };
                    } catch (e) {
                        console.error('Error playing audio:', e);
                        // Show all buttons if error
                        audioButtons.forEach(btn => btn.style.opacity = '1');
                    }
                }
            } else {
                currentlyPlaying = null;
                // Show all buttons when stopping
                audioButtons.forEach(btn => btn.style.opacity = '1');
            }
        });
    });

    // Initialize holographic glows
    initializeHolographicGlows();
}); 