const backgroundMusic = document.getElementById('background-music');
const toggleMusicButton = document.getElementById('toggle-music');
const prevTrackButton = document.getElementById('prev-track');
const nextTrackButton = document.getElementById('next-track');
const trackCover = document.getElementById('track-cover');

const tracks = [
    {
        src: 'music/Kishlak_-_Gryaznyjj_kajjf_76945519.mp3',
        cover: 'video/загружено.jpg'
    },
    {
        src: 'music/Kishlak_-_Ugu_73002998.mp3',
        cover: 'video/VurjbcaOYJ9vQKLeuKSpY3cU7AJTgYCuJLdtUZXcZqM3ariFE-ZtcYHwdTZTNHsaT8-3sCwP6Tc35M-b5ZivQUuY (1).jpg'
    }
];

let currentTrackIndex = 0;

// Устанавливаем обложку и трек при загрузке страницы
trackCover.src = tracks[currentTrackIndex].cover;
backgroundMusic.src = tracks[currentTrackIndex].src;

// Включение/выключение музыки
toggleMusicButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        backgroundMusic.pause();
        toggleMusicButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Переключение на предыдущий трек
prevTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    backgroundMusic.src = tracks[currentTrackIndex].src;
    trackCover.src = tracks[currentTrackIndex].cover;
    backgroundMusic.play(); // Автоматически воспроизводим новый трек
    toggleMusicButton.innerHTML = '<i class="fas fa-pause"></i>';
});

// Переключение на следующий трек
nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    backgroundMusic.src = tracks[currentTrackIndex].src;
    trackCover.src = tracks[currentTrackIndex].cover;
    backgroundMusic.play(); // Автоматически воспроизводим новый трек
    toggleMusicButton.innerHTML = '<i class="fas fa-pause"></i>';
});

// Спиннер
const spinner = document.querySelector('.spinner');
let spinAmount = 0;
let isSpinning = false;
let lastAngle = 0;
let velocity = 0;

spinner.addEventListener('mousedown', (e) => {
    isSpinning = true;
    lastAngle = e.clientY;

    const onMouseMove = (event) => {
        const deltaY = event.clientY - lastAngle;
        velocity = deltaY * 1.5; // Увеличиваем чувствительность
        spinAmount += velocity;
        spinner.style.transform = `rotate(${spinAmount}deg)`;
        lastAngle = event.clientY;
    };

    const onMouseUp = () => {
        isSpinning = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
});

// Анимация вращения с инерцией
function animate() {
    if (!isSpinning && Math.abs(velocity) > 0) {
        spinAmount += velocity;
        velocity *= 0.98; // Уменьшаем скорость более плавно
        spinAmount += (Math.random() - 0.5) * 2; // Добавляем случайные колебания
        spinner.style.transform = `rotate(${spinAmount}deg)`;
    }
    requestAnimationFrame(animate);
}

animate();
