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
let isStealthMode = false;
let isSelectMode = false;
let currentSubject = "";
let currentCodeString = "";
let currentLangClass = "";

const listModal = document.getElementById('programListModal');
const codeModal = document.getElementById('codeModal');
const programListContainer = document.getElementById('programListContainer');
const subjectTitle = document.getElementById('subjectTitle');

// Helper to escape HTML for raw rendering
function escapeHtml(unsafe) {
    return (unsafe || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function openSubject(subjectKey) {
    currentSubject = subjectKey;
    const programs = subjectDatabase[subjectKey];
    subjectTitle.innerText = subjectKey.toUpperCase() + " Programs";
    programListContainer.innerHTML = '';

    if (programs.length === 0) {
        programListContainer.innerHTML = `<p class="text-gray-500 font-light text-center py-8">Programs coming soon...</p>`;
    } else {
        programs.forEach((prog, index) => {
            const card = document.createElement('div');
            card.className = "bg-white/5 border border-white/10 p-3 rounded-xl flex justify-between items-center group transition-colors";
            
            // Checkbox for Condensed Print (Hidden by default)
            card.innerHTML = `
                <div class="flex items-center gap-4 w-full">
                    <input type="checkbox" data-index="${index}" class="prog-checkbox hidden w-5 h-5 accent-purple-500 cursor-pointer shrink-0">
                    <div class="flex-grow cursor-pointer flex justify-between items-center" onclick="openCodeViewer(${index}, '${subjectKey}')">
                        <span class="font-light tracking-wide text-gray-200 group-hover:text-white truncate pr-4">${prog.title}</span>
                        <i class="ph ph-code text-xl text-gray-500 group-hover:text-white transition-colors flex-shrink-0"></i>
                    </div>
                </div>
            `;
            programListContainer.appendChild(card);
        });
    }

    // Reset Selection Mode UI state every time a subject is opened
    isSelectMode = false;
    document.getElementById('selectBtn').classList.remove('hidden');
    document.getElementById('selectAllBtn').classList.add('hidden');
    document.getElementById('cancelSelectBtn').classList.add('hidden');
    document.getElementById('selectModeTitle').classList.add('hidden');
    document.getElementById('printFooter').classList.add('hidden');

    listModal.classList.remove('hidden');
    setTimeout(() => listModal.classList.remove('opacity-0'), 10);
}

function toggleSelectMode() {
    isSelectMode = !isSelectMode;
    const checkboxes = document.querySelectorAll('.prog-checkbox');
    const selectBtn = document.getElementById('selectBtn');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const cancelBtn = document.getElementById('cancelSelectBtn');
    const title = document.getElementById('selectModeTitle');
    const footer = document.getElementById('printFooter');

    if (isSelectMode) {
        checkboxes.forEach(cb => cb.classList.remove('hidden'));
        selectBtn.classList.add('hidden');
        selectAllBtn.classList.remove('hidden');
        cancelBtn.classList.remove('hidden');
        title.classList.remove('hidden');
        footer.classList.remove('hidden');
    } else {
        checkboxes.forEach(cb => {
            cb.classList.add('hidden');
            cb.checked = false; // uncheck all on cancel
        });
        selectBtn.classList.remove('hidden');
        selectAllBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        title.classList.add('hidden');
        footer.classList.add('hidden');
    }
}

function selectAllPrograms() {
    const checkboxes = document.querySelectorAll('.prog-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
}

function closeListModal() {
    listModal.classList.add('opacity-0');
    setTimeout(() => listModal.classList.add('hidden'), 300);
}

function openCodeViewer(progIndex, subjectKey) {
    const prog = subjectDatabase[subjectKey][progIndex];
    document.getElementById('modalTitle').innerText = prog.title;
    
    currentCodeString = prog.code; // Store for stealth toggling
    
    // Set highlighting language
    let lang = 'language-clike';
    if(subjectKey === 'latex') lang = 'language-latex';
    if(subjectKey === 'dbms') lang = 'language-sql';
    currentLangClass = lang;

    // Make sure stealth mode is OFF initially
    if(isStealthMode) toggleStealthMode(); 
    else renderNormalCode();

    // Populate Guide & PDF Viewer
    const extraInfoArea = document.getElementById('extraInfoArea');
    let infoHTML = '';
    const formatText = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br>');

    if (prog.executionSteps) infoHTML += `<div class="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">${formatText(prog.executionSteps)}</div>`;
    if (prog.manualSteps) infoHTML += `<div class="mb-8 p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">${formatText(prog.manualSteps)}</div>`;
    if (prog.ioData) infoHTML += `<div class="mb-8 p-6 bg-black/50 rounded-xl border border-white/10 font-mono text-xs text-green-400">${formatText(prog.ioData)}</div>`;
    
    // PDF Viewer Injection
    if (prog.pdfPath) {
        infoHTML += `
        <div class="mt-8 border-t border-white/10 pt-8">
            <div class="flex justify-between items-center mb-6">
                <h5 class="text-white text-lg font-editorial tracking-wide">Compiled PDF Output</h5>
                <a href="${prog.pdfPath}" download class="px-5 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-full text-xs transition-all flex items-center gap-2">
                    <i class="ph ph-download-simple"></i> Download PDF
                </a>
            </div>
            <div class="w-full h-[600px] border border-white/20 rounded-xl overflow-hidden bg-white">
                <iframe src="${prog.pdfPath}#toolbar=0&navpanes=0&scrollbar=0" class="w-full h-full" frameborder="0"></iframe>
            </div>
        </div>`;
    }

    if (infoHTML === '') {
        infoHTML = '<p class="text-center text-gray-500 mt-10">No specific guide required for this program.</p>';
    }
    extraInfoArea.innerHTML = infoHTML;

    // Reset View
    isCodeView = true;
    updateToggleUI();

    const copyBtn = document.getElementById('copyBtn');
    copyBtn.innerHTML = '<i class="ph ph-copy"></i> <span class="hidden sm:inline">Copy Code</span>';
    copyBtn.classList.remove('text-green-400', 'border-green-400/30');

    codeModal.classList.remove('hidden');
    setTimeout(() => codeModal.classList.remove('opacity-0'), 10);
}

function closeCodeModal() {
    codeModal.classList.add('opacity-0');
    setTimeout(() => {
        codeModal.classList.add('hidden');
        if(isStealthMode) toggleStealthMode(); // Reset stealth if closed
    }, 300);
}

// ==========================================
// STEALTH MODE & PRINTING
// ==========================================

function renderNormalCode() {
    const codeArea = document.getElementById('codeArea');
    codeArea.innerHTML = '';
    codeArea.textContent = currentCodeString;
    codeArea.className = `${currentLangClass} line-numbers font-mono`;
    Prism.highlightElement(codeArea);
}

function renderStealthCode() {
    const codeArea = document.getElementById('codeArea');
    codeArea.className = "font-mono"; // Remove Prism classes
    // Split code into lines and wrap each in a hoverable div
    const lines = currentCodeString.split('\n');
    codeArea.innerHTML = lines.map(line => `<div class="stealth-line">${escapeHtml(line) || ' '}</div>`).join('');
}

function toggleStealthMode() {
    isStealthMode = !isStealthMode;
    const btnText = document.getElementById('stealthBtnText');
    const toggleBtn = document.getElementById('stealthToggleBtn');
    const stealthToast = document.getElementById('stealthToast');

    if (isStealthMode) {
        document.body.classList.add('stealth-active');
        btnText.innerText = "Write Mode Off";
        toggleBtn.classList.add('stealth-btn-active');
        renderStealthCode();
        // Force Code View to hide Output Guide while in stealth
        if(!isCodeView) toggleGuide(); 

        // Show F11 Toast
        if(stealthToast) {
            stealthToast.classList.remove('hidden');
            setTimeout(() => stealthToast.classList.remove('opacity-0'), 10);
            
            // Hide Toast after 4 seconds
            setTimeout(() => {
                stealthToast.classList.add('opacity-0');
                setTimeout(() => stealthToast.classList.add('hidden'), 500);
            }, 4000);
        }

    } else {
        document.body.classList.remove('stealth-active');
        btnText.innerText = "Write Mode On";
        toggleBtn.classList.remove('stealth-btn-active');
        renderNormalCode();
        
        // Force hide toast if they toggle off early
        if(stealthToast) {
            stealthToast.classList.add('opacity-0');
            setTimeout(() => stealthToast.classList.add('hidden'), 500);
        }
    }
}

function printCondensed() {
    const checkboxes = document.querySelectorAll('.prog-checkbox:checked');
    if (checkboxes.length === 0) {
        alert("Please select at least one program to generate a cheatsheet.");
        return;
    }

    let printHTML = `
    <html>
    <head>
        <title>Condensed Cheatsheet</title>
        <style>
            @page { margin: 10mm; }
            body { font-family: monospace; font-size: 5pt; line-height: 1.2; color: #000; margin: 0; padding: 0; }
            .program-block { margin-bottom: 80px; page-break-inside: avoid; }
            h3 { font-size: 6pt; margin: 0 0 5px 0; border-bottom: 0.5px solid #000; padding-bottom: 2px; }
            pre { margin: 0; white-space: pre-wrap; word-break: break-all; }
        </style>
    </head>
    <body>`;

    checkboxes.forEach(cb => {
        let prog = subjectDatabase[currentSubject][cb.dataset.index];
        printHTML += `
            <div class="program-block">
                <h3>${prog.title}</h3>
                <pre>${escapeHtml(prog.code)}</pre>
            </div>`;
    });

    printHTML += `</body></html>`;

    // Open hidden window and trigger native browser print to PDF
    let printWin = window.open('', '_blank');
    printWin.document.write(printHTML);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => { 
        printWin.print(); 
    }, 250);
}

// ==========================================
// TOGGLE GUIDE LOGIC
// ==========================================
function toggleGuide() {
    if(isStealthMode) return; // Prevent switching to guide in stealth mode

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
// STEALTH GLOBAL CLIPBOARD SHORTCUTS
// ==========================================
let stealthKeyBuffer = "";
let stealthBufferTimeout;
let stealthExecuteTimeout;

document.addEventListener('keydown', (e) => {
    // Ignore keys if they are just being held down, to prevent spamming the buffer
    if (e.repeat) return;

    // Only capture single character alphanumeric keys
    if (e.key.length === 1 && /[a-z0-9]/i.test(e.key)) {
        stealthKeyBuffer += e.key.toLowerCase();
        
        clearTimeout(stealthBufferTimeout);
        clearTimeout(stealthExecuteTimeout); // Stop pending copy if user is still typing

        stealthBufferTimeout = setTimeout(() => { stealthKeyBuffer = ""; }, 1500); // 1.5s overall typing window

        // Look for the sequence: subject letter followed by numbers and an optional 'a' or 'b'
        // Example matches: a1, a3a, l12
        let match = stealthKeyBuffer.match(/(a|l|d|m)(\d{1,2}[a-z]?)$/);
        
        if (match) {
            // Increased to 750ms so user has plenty of time to type the full code
            stealthExecuteTimeout = setTimeout(() => {
                let subjectMap = { 'a': 'ada', 'l': 'latex', 'd': 'dbms', 'm': 'mc' };
                let subject = subjectMap[match[1]];
                let progId = match[2]; // e.g. "3a" or "12"

                let programs = subjectDatabase[subject];
                if (programs) {
                    // Find the exact program by checking if its title starts with the progId followed by a dot or space
                    // e.g. "3a. Floyd's Algorithm" or "12. N-Queen's Problem"
                    let targetProg = programs.find(p => p.title.toLowerCase().startsWith(progId + ".") || p.title.toLowerCase().startsWith(progId + " "));
                    
                    if (targetProg) {
                        // Silently copy the code to clipboard
                        navigator.clipboard.writeText(targetProg.code).then(() => {
                            showStealthCopyToast(`${subject.toUpperCase()} ${progId.toUpperCase()} Copied`);
                        });
                        stealthKeyBuffer = ""; // Reset buffer after successful copy
                    }
                }
            }, 750); 
        }
    }
});

function showStealthCopyToast(msg) {
    let toast = document.getElementById('stealthCopyToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'stealthCopyToast';
        toast.className = "fixed bottom-10 right-10 bg-black/80 text-gray-500 px-4 py-2 rounded-lg text-xs font-mono border border-white/5 z-[300] transition-opacity duration-300 opacity-0 pointer-events-none";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.remove('opacity-0');
    setTimeout(() => toast.classList.add('opacity-0'), 2000);
}