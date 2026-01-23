function calculate() {
    const val = (id) => parseFloat(document.getElementById(id).value) || 0;

    let A1 = (val('a') * 0.6) + (val('A_td') * 0.4);
    let B2 = (val('b') * 0.6) + (val('B_td') * 0.4);
    let C3 = (val('c') * 0.6) + (val('C_td') * 0.4);
    let D4 = (val('d') * 0.6) + (val('D_td') * 0.4);
    let E5 = (val('e') * 0.6) + (val('E_td') * 0.4);
    
    let f = val('f'), g = val('g'), tpc = val('tpc'), tpf = val('tpf');

    let result = (A1*3 + B2*2 + C3*3 + D4*3 + E5*2 + g + f + tpf + tpc) / 17;

    const display = document.getElementById('finalMoyen');
    const msg = document.getElementById('message');
    
    // Animate the number
    display.innerText = result.toFixed(2);
    
    if (result >= 10) {
        msg.innerText = "S1 Validated Successfully";
        msg.style.color = "#39d353";
        display.style.color = "#39d353";
    } else {
        msg.innerText = "Below Threshold - Improvement Needed";
        msg.style.color = "#f85149";
        display.style.color = "#f85149";
    }
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.getElementById('finalMoyen').innerText = "0.00";
    document.getElementById('finalMoyen').style.color = "white";
    document.getElementById('message').innerText = "Enter notes to calculate";
}