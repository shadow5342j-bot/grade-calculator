let currentSemester = 1;

// تعريف البيانات لكل سداسي كما في كود C
const config = {
    1: {
        title: "السداسي الأول",
        exams: ["تحليل", "جبر", "فيزياء", "كيمياء", "إعلام آلي", "أخلاقيات", "MST"],
        tds: ["تحليل TD", "جبر TD", "فيزياء TD", "كيمياء TD", "إعلام آلي TD", "تطبيقي فيزياء", "تطبيقي كيمياء"],
        divisor: 15
    },
    2: {
        title: "السداسي الثاني",
        exams: ["تحليل", "جبر", "فيزياء", "كيمياء", "إعلام آلي", "أخلاقيات", "MST", "برمجيات"],
        tds: ["تحليل TD", "جبر TD", "فيزياء TD", "كيمياء TD", "إعلام آلي TD", "برمجيات TD", "تطبيقي فيزياء", "تطبيقي كيمياء"],
        divisor: 17
    }
};

function switchSemester(s) {
    currentSemester = s;
    document.getElementById('semesterTitle').innerText = config[s].title;
    
    // تحديث شكل الأزرار النشطة
    document.getElementById('btnS1').classList.toggle('active', s === 1);
    document.getElementById('btnS2').classList.toggle('active', s === 2);
    
    renderFields();
    resetForm();
}

function renderFields() {
    const examC = document.getElementById('examFields');
    const tdC = document.getElementById('tdFields');
    
    examC.innerHTML = config[currentSemester].exams.map((sub, i) => `
        <div class="field"><label>${sub}</label><input type="number" id="ex${i}" placeholder="0.0"></div>
    `).join('');

    tdC.innerHTML = config[currentSemester].tds.map((sub, i) => `
        <div class="field"><label>${sub}</label><input type="number" id="td${i}" placeholder="0.0"></div>
    `).join('');
}

function calculate() {
    const getV = (id) => parseFloat(document.getElementById(id).value) || 0;
    
    // حساب المواد الأساسية (نفس منطق كود C)
    let A1 = (getV('ex0') * 0.6) + (getV('td0') * 0.4);
    let B2 = (getV('ex1') * 0.6) + (getV('td1') * 0.4);
    let C3 = (getV('ex2') * 0.6) + (getV('td2') * 0.4);
    let D4 = (getV('ex3') * 0.6) + (getV('td3') * 0.4);
    let E5 = (getV('ex4') * 0.6) + (getV('td4') * 0.4);
    
    let result = 0;

    if (currentSemester === 1) {
        let f = getV('ex5'), g = getV('ex6'), tpf = getV('td5'), tpc = getV('td6');
        result = (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + g + f + tpf + tpc) / 17;
    } else {
        let f = getV('ex5'), g = getV('ex6'), l = getV('ex7'), L = getV('td5'), tpf = getV('td6'), tpc = getV('td7');
        let L1 = (l * 0.6) + (L * 0.4);
        result = (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + g + f + tpf + tpc + L1) / 17;
    }

    const display = document.getElementById('finalMoyen');
    display.innerText = result.toFixed(2);
    
    const msg = document.getElementById('message');
    if (result >= 10) {
        msg.innerText = "مبروك! لقد نجحت";
        msg.style.color = "#39d353";
        display.style.color = "#39d353";
    } else {
        msg.innerText = "حاول بجد في السداسي القادم";
        msg.style.color = "#f85149";
        display.style.color = "#f85149";
    }
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('finalMoyen').innerText = "0.00";
    document.getElementById('finalMoyen').style.color = "#fff";
    document.getElementById('message').innerText = "بانتظار العلامات...";
}

// البدء عند التحميل

renderFields();
