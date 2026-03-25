// Data routing based on subject clicked
const subjectDatabase = {
    latex: typeof LATEX_PROGRAMS !== 'undefined' ? LATEX_PROGRAMS : [],
    ada: typeof ADA_PROGRAMS !== 'undefined' ? ADA_PROGRAMS : [],
    dbms: typeof DBMS_PROGRAMS !== 'undefined' ? DBMS_PROGRAMS : [], 
    mc: typeof MC_PROGRAMS !== 'undefined' ? MC_PROGRAMS : [] 
};

// UI Elements
const listModal = document.getElementById('programListModal');
const codeModal = document.getElementById('codeModal');
const programListContainer = document.getElementById('programListContainer');
const subjectTitle = document.getElementById('subjectTitle');

// Open the list of programs for a specific subject
function openSubject(subjectKey) {
    const programs = subjectDatabase[subjectKey];
    
    // Set title (uppercase the key)
    subjectTitle.innerText = subjectKey.toUpperCase() + " Programs";
    
    // Clear previous list
    programListContainer.innerHTML = '';

    if (programs.length === 0) {
        programListContainer.innerHTML = `<p class="text-gray-500 font-light text-center py-8">Programs coming soon...</p>`;
    } else {
        // Build cards for each program
        programs.forEach((prog, index) => {
            const card = document.createElement('div');
            card.className = "bg-white/5 border border-white/10 p-4 rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all group flex justify-between items-center";
            card.innerHTML = `
                <span class="font-light tracking-wide text-gray-200 group-hover:text-white">${prog.title}</span>
                <i class="ph ph-code text-xl text-gray-500 group-hover:text-white transition-colors"></i>
            `;
            // Attach click event to open the code viewer
            card.onclick = () => openCodeViewer(prog.title, prog.code);
            programListContainer.appendChild(card);
        });
    }

    // Show List Modal smoothly
    listModal.classList.remove('hidden');
    setTimeout(() => listModal.classList.remove('opacity-0'), 10);
}

function closeListModal() {
    listModal.classList.add('opacity-0');
    setTimeout(() => listModal.classList.add('hidden'), 300);
}

// Open the specific code inside the code viewer
function openCodeViewer(title, code) {
    const titleArea = document.getElementById('modalTitle');
    const codeArea = document.getElementById('codeArea');

    titleArea.innerText = title;
    codeArea.textContent = code;
    
    // Reset copy button text if it was changed
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.innerHTML = '<i class="ph ph-copy"></i> Copy Code';
    copyBtn.classList.remove('text-green-400', 'border-green-400/30');

    // Show Code Modal smoothly
    codeModal.classList.remove('hidden');
    setTimeout(() => codeModal.classList.remove('opacity-0'), 10);
    
    // Trigger Prism.js highlighting
    Prism.highlightElement(codeArea);
}

function closeCodeModal() {
    codeModal.classList.add('opacity-0');
    setTimeout(() => codeModal.classList.add('hidden'), 300);
}

// Copy to clipboard functionality
function copyCode() {
    const code = document.getElementById('codeArea').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.innerHTML = '<i class="ph ph-check"></i> Copied!';
        copyBtn.classList.add('text-green-400', 'border-green-400/30');
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="ph ph-copy"></i> Copy Code';
            copyBtn.classList.remove('text-green-400', 'border-green-400/30');
        }, 2000);
    });
}

// ==========================================
// THE BACK BENCH LOGIC (INDEX.HTML)
// ==========================================

// 1. Promo Code Dramatic Reveal
function checkPromo() {
    const input = document.getElementById('promoInput').value.trim().toLowerCase();
    const container = document.getElementById('promoContainer');
    const reveal = document.getElementById('promoReveal');
    const errorMsg = document.getElementById('promoError');
    
    if (input === 'saif10') {
        // Hide the input container smoothly
        container.style.opacity = '0';
        setTimeout(() => {
            container.classList.add('hidden');
            // Show the massive GIF reveal
            reveal.classList.remove('hidden');
            reveal.classList.add('flex');
        }, 500);
    } else if (input === '') {
        errorMsg.style.opacity = '0';
    } else {
        errorMsg.style.opacity = '1';
    }
}

// 2. Blame Generator
const excuses = [
    "Adnaan ate my code.",
    "Kashmiri ifaaz must have touched my keyboard.",
    "I only do trading, no coding.",
    "I think the lab computers have a virus.",
    "I forgot a semicolon. I'm dropping out of college.",
    "It's hardware issue, sir. Low quality samaan",
    "Shayyu scam cheydh, ini output kittan kazhiyilla",
    "Coding aileng endho? itt paroge ullo."
];

function generateExcuse() {
    const display = document.getElementById('excuseDisplay');
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    
    // Quick fade out and snap back in
    display.style.opacity = 0;
    display.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        display.innerText = `"${randomExcuse}"`;
        display.style.opacity = 1;
        display.style.transform = 'translateY(0)';
    }, 300);
}