let currentSemester = 1;

const config = {
    1: { title: "السداسي الأول", exams: ["تحليل", "جبر", "فيزياء", "كيمياء", "إعلام آلي", "أخلاقيات", "MST"], tds: ["تحليل TD", "جبر TD", "فيزياء TD", "كيمياء TD", "إعلام آلي TD", "تطبيقي فيزياء", "تطبيقي كيمياء"] },
    2: { title: "السداسي الثاني", exams: ["تحليل", "جبر", "فيزياء", "كيمياء", "إعلام آلي", "أخلاقيات", "MST", "برمجيات"], tds: ["تحليل TD", "جبر TD", "فيزياء TD", "كيمياء TD", "إعلام آلي TD", "برمجيات TD", "تطبيقي فيزياء", "تطبيقي كيمياء"] }
};

function switchSemester(s) {
    currentSemester = s;
    document.getElementById('semesterTitle').innerText = config[s].title;
    document.getElementById('btnS1').classList.toggle('active', s === 1);
    document.getElementById('btnS2').classList.toggle('active', s === 2);
    renderFields();
    resetForm();
}

function renderFields() {
    const examC = document.getElementById('examFields');
    const tdC = document.getElementById('tdFields');
    examC.innerHTML = config[currentSemester].exams.map((sub, i) => `<div class="field"><label>${sub}</label><input type="number" id="ex${i}" placeholder="0"></div>`).join('');
    tdC.innerHTML = config[currentSemester].tds.map((sub, i) => `<div class="field"><label>${sub}</label><input type="number" id="td${i}" placeholder="0"></div>`).join('');
}

function calculate() {
    const getV = (id) => parseFloat(document.getElementById(id).value) || 0;
    let A1 = (getV('ex0') * 0.6) + (getV('td0') * 0.4);
    let B2 = (getV('ex1') * 0.6) + (getV('td1') * 0.4);
    let C3 = (getV('ex2') * 0.6) + (getV('td2') * 0.4);
    let D4 = (getV('ex3') * 0.6) + (getV('td3') * 0.4);
    let E5 = (getV('ex4') * 0.6) + (getV('td4') * 0.4);
    
    let result = (currentSemester === 1) 
        ? (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + getV('ex5') + getV('ex6') + getV('td5') + getV('td6')) / 17
        : (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + getV('ex5') + getV('ex6') + getV('td6') + getV('td7') + ((getV('ex7')*0.6)+(getV('td5')*0.4))) / 19;

    document.getElementById('finalMoyen').innerText = result.toFixed(2);
    let msg = document.getElementById('message');
    msg.innerText = result >= 10 ? "ناجح بمعدل جيد" : "تحتاج للتعويض";
    msg.style.color = result >= 10 ? "#39d353" : "#f85149";
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('finalMoyen').innerText = "0.00";
}

renderFields();
