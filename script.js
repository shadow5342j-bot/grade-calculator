// --- STATE MANAGEMENT ---
let state = {
    isDark: true, // Default to dark mode state
    currentLang: 'en',
    currentSem: '1',
    calcResult: null
};

const translations = {
    en: {
        title: "AVG Calculator",
        chooseSem: "Select Your Semester",
        sem1Short: "S1",
        sem2Short: "S2",
        td: "TD Note",
        exam: "Exam Note",
        tp: "TP Note",
        examOnly: "Final Note",
        subjAnalyse: "Analyse",
        subjAlgebra: "Algebra",
        subjPhysics: "Physics",
        subjChemistry: "Chemistry",
        subjInfo: "Informatique",
        subjEthique: "Ethique",
        subjMetiers: "Les métiers",
        subjFreeSoft: "Free Software",
        btnCalc: "Calculate Final Average",
        resultPassTitle: "Congratulations!",
        resultFailTitle: "Keep Trying!",
        resultMsg: "Your final average for this semester is:",
        avgLabel: "Average"
    },
    ar: {
        title: "حاسبة المعدل",
        chooseSem: "اختر الفصل الدراسي",
        sem1Short: "ف١",
        sem2Short: "ف٢",
        td: "علامة TD",
        exam: "علامة الامتحان",
        tp: "علامة TP",
        examOnly: "العلامة",
        subjAnalyse: "التحليل (Analyse)",
        subjAlgebra: "الجبر (Algebra)",
        subjPhysics: "الفيزياء",
        subjChemistry: "الكيمياء",
        subjInfo: "الإعلام الآلي",
        subjEthique: "الأخلاقيات (Ethique)",
        subjMetiers: "المهن",
        subjFreeSoft: "برمجيات حرة",
        btnCalc: "احسب المعدل النهائي",
        resultPassTitle: "ألف مبروك!",
        resultFailTitle: "حظ أوفر!",
        resultMsg: "معدلك النهائي لهذا الفصل هو:",
        avgLabel: "المعدل"
    }
};

// --- UTILITIES ---
const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;
const updateActiveToggle = (parent, activeId) => {
    parent.querySelectorAll('.toggle-option').forEach(el => el.classList.remove('active'));
    document.getElementById(activeId).classList.add('active');
};

// --- UI INTERACTION FUNCTIONS ---
function toggleTheme() {
    state.isDark = !state.isDark;
    if (state.isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateActiveToggle(document.getElementById('theme-toggle'), 'theme-dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        updateActiveToggle(document.getElementById('theme-toggle'), 'theme-light');
    }
}

function toggleLang() {
    state.currentLang = state.currentLang === 'en' ? 'ar' : 'en';
    document.body.dir = state.currentLang === 'ar' ? 'rtl' : 'ltr';
    updateActiveToggle(document.getElementById('lang-toggle'), `lang-${state.currentLang}`);
    updateLanguage();
}

function toggleSemester() {
    state.currentSem = state.currentSem === '1' ? '2' : '1';
    updateActiveToggle(document.getElementById('sem-toggle'), `sem${state.currentSem}`);
    
    if (state.currentSem === '1') {
        document.getElementById('sem1-only').classList.remove('hidden');
        document.getElementById('sem2-only').classList.add('hidden');
    } else {
        document.getElementById('sem1-only').classList.add('hidden');
        document.getElementById('sem2-only').classList.remove('hidden');
    }
    
    // Clear old result on semester change
    state.calcResult = null;
    document.getElementById('result-panel').classList.remove('show', 'result-pass', 'result-fail');
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = translations[state.currentLang][el.getAttribute('data-i18n')];
    });
    
    if (state.calcResult !== null) displayResult(state.calcResult);
}

// --- CALCULATION & RESULT ---
function calculate() {
    const sa = getVal('a_td') * 0.4 + getVal('a_ex') * 0.6;
    const sg = getVal('g_td') * 0.4 + getVal('g_ex') * 0.6;
    const sph = getVal('ph_td') * 0.4 + getVal('ph_ex') * 0.6;
    const sch = getVal('ch_td') * 0.4 + getVal('ch_ex') * 0.6;
    const sin = getVal('in_td') * 0.4 + getVal('in_ex') * 0.6;
    
    const tpph = getVal('tpph');
    const tpch = getVal('tpch');

    let savg = 0;

    if (state.currentSem === '1') {
        savg = (sa*3 + sg*2 + sin*2 + sph*3 + sch*3 + tpph + tpch + getVal('et') + getVal('l')) / 17;
    } else {
        const sf = getVal('f_td') * 0.4 + getVal('f_ex') * 0.6;
        savg = (sa*3 + sg*2 + sin*2 + sph*3 + sch*3 + tpph + tpch + sf*2) / 17;
    }

    state.calcResult = savg.toFixed(2);
    displayResult(state.calcResult);
}

function displayResult(avgValue) {
    const passed = avgValue >= 10;
    const panel = document.getElementById('result-panel');
    
    panel.className = 'result-panel show ' + (passed ? 'result-pass' : 'result-fail');
    document.getElementById('result-title').innerText = translations[state.currentLang][passed ? 'resultPassTitle' : 'resultFailTitle'];
    document.getElementById('final-avg-value').innerText = avgValue;
}

// --- INITIALIZATION ---
updateLanguage();