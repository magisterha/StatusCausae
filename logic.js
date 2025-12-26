// Importamos los módulos de contenido que generamos anteriormente
import { content_es } from './prompts_es.js';
import { content_en } from './prompts_en.js';
import { content_zh } from './prompts_zh.js';

// Mapeo de idiomas
const contents = {
    'es': content_es,
    'en': content_en,
    'zh': content_zh
};

// Elementos del DOM
const titleEl = document.getElementById('app-title');
const descEl = document.getElementById('app-desc');
const promptEl = document.getElementById('prompt-output');
const copyBtn = document.getElementById('copy-btn');
const langButtons = document.querySelectorAll('.lang-btn');

let currentLang = 'es'; // Idioma por defecto

// Función para actualizar la interfaz
function updateUI(lang) {
    const data = contents[lang];
    
    // Actualizar Textos
    titleEl.textContent = data.title;
    descEl.innerHTML = data.description; // Usamos innerHTML para permitir las negritas y párrafos
    promptEl.textContent = data.promptText;
    copyBtn.textContent = data.copyButtonText;

    // Actualizar estado de botones
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    currentLang = lang;
}

// Función de Copiado
async function copyToClipboard() {
    const textToCopy = contents[currentLang].promptText;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Feedback visual
        const originalText = copyBtn.textContent;
        copyBtn.textContent = (currentLang === 'zh') ? "已複製!" : "Copied!";
        copyBtn.style.backgroundColor = "#27ae60"; // Verde éxito
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = ""; // Volver al color original
        }, 2000);
        
    } catch (err) {
        console.error('Error al copiar: ', err);
        alert('No se pudo copiar el texto automáticamente.');
    }
}

// Event Listeners
langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const selectedLang = e.target.dataset.lang;
        updateUI(selectedLang);
    });
});

copyBtn.addEventListener('click', copyToClipboard);

// Inicializar
updateUI('es');
