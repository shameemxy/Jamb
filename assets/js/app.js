// ==========================================
// DATA & UI ROUTING
// ==========================================
const subjectDatabase = {
    latex: typeof LATEX_PROGRAMS !== 'undefined' ? LATEX_PROGRAMS : [],
    ada: typeof ADA_PROGRAMS !== 'undefined' ? ADA_PROGRAMS : [],
    dbms: typeof DBMS_PROGRAMS !== 'undefined' ? DBMS_PROGRAMS : [],
    mc: typeof MC_PROGRAMS !== 'undefined' ? MC_PROGRAMS : []
};

let isCodeView = true;
const listModal = document.getElementById('programListModal');
const codeModal = document.getElementById('codeModal');
const programListContainer = document.getElementById('programListContainer');
const subjectTitle = document.getElementById('subjectTitle');

function openSubject(subjectKey) {
    const programs = subjectDatabase[subjectKey];
    subjectTitle.innerText = subjectKey.toUpperCase() + " Programs";
    programListContainer.innerHTML = '';

    if (programs.length === 0) {
        programListContainer.innerHTML = `<p class="text-gray-500 font-light text-center py-8">Programs coming soon...</p>`;
    } else {
        programs.forEach((prog) => {
            const card = document.createElement('div');
            card.className = "bg-white/5 border border-white/10 p-4 rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all group flex justify-between items-center";
            card.innerHTML = `
                <span class="font-light tracking-wide text-gray-200 group-hover:text-white truncate pr-4">${prog.title}</span>
                <i class="ph ph-code text-xl text-gray-500 group-hover:text-white transition-colors flex-shrink-0"></i>
            `;
            // Pass the data safely
            card.onclick = () => openCodeViewer(prog, subjectKey);
            programListContainer.appendChild(card);
        });
    }

    listModal.classList.remove('hidden');
    setTimeout(() => listModal.classList.remove('opacity-0'), 10);
}

function closeListModal() {
    listModal.classList.add('opacity-0');
    setTimeout(() => listModal.classList.add('hidden'), 300);
}

function openCodeViewer(prog, subjectKey) {
    // Populate Code
    document.getElementById('modalTitle').innerText = prog.title;
    const codeArea = document.getElementById('codeArea');
    codeArea.textContent = prog.code;
    
    // Set highlighting language
    let lang = 'language-clike';
    if(subjectKey === 'latex') lang = 'language-latex';
    if(subjectKey === 'dbms') lang = 'language-sql';
    codeArea.className = `${lang} line-numbers`;

    // Populate Guide
    const extraInfoArea = document.getElementById('extraInfoArea');
    let infoHTML = '';
    const formatText = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br>');

    if (prog.executionSteps) infoHTML += `<div class="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">${formatText(prog.executionSteps)}</div>`;
    if (prog.manualSteps) infoHTML += `<div class="mb-8 p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">${formatText(prog.manualSteps)}</div>`;
    if (prog.ioData) infoHTML += `<div class="p-6 bg-black/50 rounded-xl border border-white/10 font-mono text-xs text-green-400">${formatText(prog.ioData)}</div>`;
    
    if (infoHTML === '') {
        infoHTML = '<p class="text-center text-gray-500 mt-10">No specific guide required for this program.</p>';
    }
    extraInfoArea.innerHTML = infoHTML;

    // Reset View to Code View
    isCodeView = true;
    updateToggleUI();

    // Reset copy button
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.innerHTML = '<i class="ph ph-copy"></i> <span class="hidden sm:inline">Copy Code</span>';
    copyBtn.classList.remove('text-green-400', 'border-green-400/30');

    // Show Modal
    codeModal.classList.remove('hidden');
    setTimeout(() => codeModal.classList.remove('opacity-0'), 10);
    Prism.highlightElement(codeArea);
}

function closeCodeModal() {
    codeModal.classList.add('opacity-0');
    setTimeout(() => codeModal.classList.add('hidden'), 300);
}

// ==========================================
// TOGGLE GUIDE LOGIC
// ==========================================
function toggleGuide() {
    isCodeView = !isCodeView;
    updateToggleUI();
}

function updateToggleUI() {
    const codeView = document.getElementById('codeView');
    const guideView = document.getElementById('guideView');
    const btnText = document.getElementById('guideBtnText');
    const guideBtn = document.getElementById('guideBtn');
    const copyBtn = document.getElementById('copyBtn');

    if (isCodeView) {
        codeView.style.transform = 'translateX(0)';
        guideView.style.transform = 'translateX(100%)';
        btnText.innerText = 'Output Guide';
        guideBtn.classList.replace('bg-white/10', 'bg-purple-500/20');
        guideBtn.classList.replace('text-white', 'text-purple-300');
        copyBtn.style.display = 'flex';
    } else {
        codeView.style.transform = 'translateX(-100%)';
        guideView.style.transform = 'translateX(0)';
        btnText.innerText = 'Back to Code';
        guideBtn.classList.replace('bg-purple-500/20', 'bg-white/10');
        guideBtn.classList.replace('text-purple-300', 'text-white');
        copyBtn.style.display = 'none';
    }
}

function copyCode() {
    const code = document.getElementById('codeArea').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.innerHTML = '<i class="ph ph-check"></i> <span class="hidden sm:inline">Copied!</span>';
        copyBtn.classList.add('text-green-400', 'border-green-400/30');
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="ph ph-copy"></i> <span class="hidden sm:inline">Copy Code</span>';
            copyBtn.classList.remove('text-green-400', 'border-green-400/30');
        }, 2000);
    });
}

// ==========================================
// PRANKS & EASTER EGGS
// ==========================================
function checkPromo() {
    const input = document.getElementById('promoInput').value.trim().toLowerCase();
    const error = document.getElementById('promoError');
    const container = document.getElementById('promoContainer');
    const reveal = document.getElementById('promoReveal');

    if (input === 'saif10') {
        error.style.opacity = '0';
        container.classList.add('hidden');
        reveal.classList.remove('hidden');
        reveal.classList.add('flex');
    } else {
        error.style.opacity = '1';
    }
}

const excuses = [
    "It worked perfectly on my machine.",
    "Did you try turning it off and on again?",
    "It's a feature, not a bug.",
    "The server must be down.",
    "Must be a cache issue. Try hard refreshing.",
    "I think someone changed the API.",
    "You're holding it wrong."
];

function generateExcuse() {
    const display = document.getElementById('excuseDisplay');
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    
    display.style.opacity = '0';
    setTimeout(() => {
        display.innerText = `"${randomExcuse}"`;
        display.style.opacity = '1';
    }, 300);
}