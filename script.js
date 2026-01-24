let currentSem = 1;
let currentLang = 'ar';

const langData = {
    ar: { s1: "السداسي 1", s2: "السداسي 2", ex1: ["تحليل", "جبر", "فيزياء", "كيمياء", "إعلام", "أخلاقيات", "MST"], ex2: ["تحليل", "جبر", "فيزياء", "كيمياء", "إعلام", "أخلاقيات", "MST", "برمجيات"], td1: ["تحليل TD", "جبر TD", "فيزياء TD", "كيمياء TD", "إعلام TD", "فيزياء TP", "كيمياء TP"], td2: ["تحليل TD", "جبر TD", "فيزياء TD", "كيمياء TD", "إعلام TD", "برمجيات TD", "فيزياء TP", "كيمياء TP"] },
    en: { s1: "Semester 1", s2: "Semester 2", ex1: ["Analysis", "Algebra", "Physics", "Chem", "Informatic", "Ethics", "MST"], ex2: ["Analysis", "Algebra", "Physics", "Chem", "IT", "Ethics", "MST", "Software"], td1: ["Analysis TD", "Algebra TD", "Phys TD", "Chem TD", "IT TD", "Phys TP", "Chem TP"], td2: ["Analysis TD", "Algebra TD", "Phys TD", "Chem TD", "IT TD", "Soft TD", "Phys TP", "Chem TP"] }
};

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.getElementById('mainHtml').dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('.lang-txt').forEach(el => el.innerText = el.getAttribute(`data-${currentLang}`));
    switchSemester(currentSem);
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    document.getElementById('themeIcon').className = document.body.classList.contains('light-theme') ? 'fas fa-moon' : 'fas fa-sun';
}

function switchSemester(s) {
    currentSem = s;
    document.getElementById('btnS1').classList.toggle('active', s === 1);
    document.getElementById('btnS2').classList.toggle('active', s === 2);
    renderFields();
}

function renderFields() {
    const exC = document.getElementById('examFields');
    const tdC = document.getElementById('tdFields');
    exC.innerHTML = langData[currentLang][`ex${currentSem}`].map((n, i) => `<div class="field"><label>${n}</label><input type="number" id="ex${i}" step="0.25"></div>`).join('');
    tdC.innerHTML = langData[currentLang][`td${currentSem}`].map((n, i) => `<div class="field"><label>${n}</label><input type="number" id="td${i}" step="0.25"></div>`).join('');
}

function calculate() {
    const gV = (id) => parseFloat(document.getElementById(id).value) || 0;
    let A1 = (gV('ex0')*0.6) + (gV('td0')*0.4), B2 = (gV('ex1')*0.6) + (gV('td1')*0.4), C3 = (gV('ex2')*0.6) + (gV('td2')*0.4), D4 = (gV('ex3')*0.6) + (gV('td3')*0.4), E5 = (gV('ex4')*0.6) + (gV('td4')*0.4);
    
    let res = (currentSem === 1) 
        ? (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + gV('ex5') + gV('ex6') + gV('td5') + gV('td6')) / 17
        : (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + gV('ex5') + gV('ex6') + gV('td6') + gV('td7') + ((gV('ex7')*0.6)+(gV('td5')*0.4))) / 19;

    document.getElementById('finalMoyen').innerText = res.toFixed(2);
    const st = document.getElementById('statusIndicator');
    st.innerText = res >= 10 ? (currentLang === 'ar' ? "ناجح" : "Passed") : (currentLang === 'ar' ? "راسب" : "Failed");
    st.style.color = res >= 10 ? "#39d353" : "#f85149";
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('finalMoyen').innerText = "0.00";
}


renderFields();
