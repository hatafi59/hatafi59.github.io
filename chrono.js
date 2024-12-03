document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById('signUp');
    const signUpButtonNav = document.getElementById('signUpNav');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const chronoDisplay = document.getElementById('chrono');

    let chronoInterval;
    let totalSeconds = getCookie('totalSeconds') ? parseInt(getCookie('totalSeconds'), 10) : 0;
    let isLoggedIn = getCookie('isLoggedIn') === 'true';

    // Initialiser l'affichage
    if (isLoggedIn) {
        signUpButtonNav.innerText = 'Vous êtes connecté(e)';
        startChrono();
    } else {
        signUpButtonNav.innerText = 'Vous êtes déconnecté(e)';
        chronoDisplay.style.display = 'none';
    }

    // Démarrer le chrono
    function startChrono() {
        chronoInterval = setInterval(() => {
            totalSeconds++;
            setCookie('totalSeconds', totalSeconds, 1);  // Le cookie expirera dans 1 jour
            updateChronoDisplay();
        }, 1000);
        chronoDisplay.style.display = 'block';
    }

    // Arrêter le chrono
    function stopChrono() {
        clearInterval(chronoInterval);
        alert(`Vous êtes resté connecté pendant : ${formatTime(totalSeconds)}`);
        totalSeconds = 0;
        setCookie('totalSeconds', totalSeconds, 1);
        chronoDisplay.innerText = `Temps en ligne : 00:00:00`;
        chronoDisplay.style.display = 'none';
    }

    // Formater le temps en format hh:mm:ss
    function formatTime(totalSeconds) {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Mettre à jour l'affichage du chrono
    function updateChronoDisplay() {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        chronoDisplay.innerText = `Temps en ligne : ${hours}:${minutes}:${seconds}`;
    }

    // Fonction de connexion/déconnexion
    function toggleLogin(button) {
        isLoggedIn = !isLoggedIn;
        setCookie('isLoggedIn', isLoggedIn, 1);  // Le cookie expirera dans 1 jour
        if (isLoggedIn) {
            button.innerText = 'Vous êtes connecté(e)';
            startChrono();
        } else {
            button.innerText = 'Vous êtes déconnecté(e)';
            stopChrono();
        }
    }

    // Gérer les événements de connexion/déconnexion
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
        toggleLogin(signUpButtonNav);
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
        toggleLogin(signUpButtonNav);
    });

    // Fonction pour obtenir la valeur d'un cookie par son nom
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Fonction pour définir un cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Date d'expiration
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Fonction pour supprimer un cookie
    function deleteCookie(name) {
        setCookie(name, "", -1);
    }
});
