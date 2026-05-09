function updateCalc() {
    const type = document.getElementById('calcCase').value;
    let html = '<div class="section-grid">';
    
    if (type === 'direct') {
        html += `<div class="input-group"><label>P (N)</label><input type="number" class="input" id="p" value="50000"></div>
                 <div class="input-group"><label>A (mm²)</label><input type="number" class="input" id="a" value="1000"></div>
                 <div class="input-group"><label>L (mm)</label><input type="number" class="input" id="l" value="2000"></div>
                 <div class="input-group"><label>E (GPa)</label><input type="number" class="input" id="e" value="200"></div>`;
    } else if (type === 'restrained') {
        html += `<div class="input-group"><label>A (mm²)</label><input type="number" class="input" id="tA" value="1000"></div>
                 <div class="input-group"><label>E (GPa)</label><input type="number" class="input" id="tE" value="200"></div>
                 <div class="input-group"><label>α (×10⁻⁶)</label><input type="number" class="input" id="tAlpha" value="12"></div>
                 <div class="input-group"><label>ΔT (°C)</label><input type="number" class="input" id="tDT" value="50"></div>`;
    } else if (type === 'yielding') {
        html += `<div class="input-group"><label>A (mm²)</label><input type="number" class="input" id="tA" value="1000"></div>
                 <div class="input-group"><label>L (mm)</label><input type="number" class="input" id="tL" value="2000"></div>
                 <div class="input-group"><label>E (GPa)</label><input type="number" class="input" id="tE" value="200"></div>
                 <div class="input-group"><label>α (×10⁻⁶)</label><input type="number" class="input" id="tAlpha" value="12"></div>
                 <div class="input-group"><label>ΔT (°C)</label><input type="number" class="input" id="tDT" value="50"></div>
                 <div class="input-group"><label>Yield Δ (mm)</label><input type="number" class="input" id="tDelta" value="0.5"></div>`;
    } else if (type === 'stepped') {
        html += `<div class="input-group"><label>A₁ (mm²)</label><input type="number" class="input" id="tA1" value="400"></div>
                 <div class="input-group"><label>L₁ (mm)</label><input type="number" class="input" id="tL1" value="500"></div>
                 <div class="input-group"><label>A₂ (mm²)</label><input type="number" class="input" id="tA2" value="600"></div>
                 <div class="input-group"><label>L₂ (mm)</label><input type="number" class="input" id="tL2" value="200"></div>
                 <div class="input-group"><label>E (GPa)</label><input type="number" class="input" id="tE" value="200"></div>
                 <div class="input-group"><label>α (×10⁻⁶)</label><input type="number" class="input" id="tAlpha" value="12"></div>
                 <div class="input-group"><label>ΔT (°C)</label><input type="number" class="input" id="tDT" value="15"></div>`;
    } else if (type === 'composite' || type === 'withLoad') {
        html += `<div class="input-group"><label>Material 1: A₁ (mm²)</label><input type="number" class="input" id="tA1" value="500"></div>
                 <div class="input-group"><label>E₁ (GPa)</label><input type="number" class="input" id="tE1" value="200"></div>
                 <div class="input-group"><label>α₁ (×10⁻⁶)</label><input type="number" class="input" id="tAlpha1" value="12"></div>
                 <div class="input-group"><label>Material 2: A₂ (mm²)</label><input type="number" class="input" id="tA2" value="1000"></div>
                 <div class="input-group"><label>E₂ (GPa)</label><input type="number" class="input" id="tE2" value="100"></div>
                 <div class="input-group"><label>α₂ (×10⁻⁶)</label><input type="number" class="input" id="tAlpha2" value="19"></div>
                 <div class="input-group"><label>ΔT (°C)</label><input type="number" class="input" id="tDT" value="60"></div>`;
        if (type === 'withLoad') {
            html += `<div class="input-group"><label>External Load P (N)</label><input type="number" class="input" id="tP" value="50000"></div>`;
        }
    } else if (type === 'rodTube') {
        html += `<div class="input-group"><label>Rod Dia (mm)</label><input type="number" class="input" id="tRodD" value="20"></div>
                 <div class="input-group"><label>E_rod (GPa)</label><input type="number" class="input" id="tRodE" value="100"></div>
                 <div class="input-group"><label>α_rod (×10⁻⁶)</label><input type="number" class="input" id="tRodAlpha" value="10"></div>
                 <div class="input-group"><label>Tube OD (mm)</label><input type="number" class="input" id="tTubeOD" value="30"></div>
                 <div class="input-group"><label>Tube ID (mm)</label><input type="number" class="input" id="tTubeID" value="25"></div>
                 <div class="input-group"><label>E_tube (GPa)</label><input type="number" class="input" id="tTubeE" value="200"></div>
                 <div class="input-group"><label>α_tube (×10⁻⁶)</label><input type="number" class="input" id="tTubeAlpha" value="6"></div>
                 <div class="input-group"><label>ΔT (°F)</label><input type="number" class="input" id="tDT" value="200"></div>`;
    }
    html += '</div>';
    document.getElementById('calcInputs').innerHTML = html;
}

function calculate() {
    const type = document.getElementById('calcCase').value;
    let html = '<div class="result">';
    
    if (type === 'direct') {
        const P = parseFloat(document.getElementById('p').value);
        const A = parseFloat(document.getElementById('a').value);
        const L = parseFloat(document.getElementById('l').value);
        const E = parseFloat(document.getElementById('e').value) * 1000;
        const sigma = P / A;
        const epsilon = sigma / E;
        const deltaL = epsilon * L;
        html += `<strong>Stress σ:</strong> ${sigma.toFixed(2)} N/mm² ${sigma > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>Strain ε:</strong> ${epsilon.toExponential(3)}<br>`;
        html += `<strong>Elongation ΔL:</strong> ${deltaL.toFixed(3)} mm`;
        
    } else if (type === 'restrained') {
        const A = parseFloat(document.getElementById('tA').value);
        const E = parseFloat(document.getElementById('tE').value) * 1000;
        const alpha = parseFloat(document.getElementById('tAlpha').value) * 1e-6;
        const DT = parseFloat(document.getElementById('tDT').value);
        const sigma = E * alpha * DT;
        const F = A * sigma;
        html += `<strong>Thermal Stress:</strong> ${sigma.toFixed(2)} N/mm² ${DT > 0 ? '(Compression)' : '(Tension)'}<br>`;
        html += `<strong>Restraining Force:</strong> ${F.toFixed(0)} N = ${(F/1000).toFixed(2)} kN`;
        
    } else if (type === 'yielding') {
        const A = parseFloat(document.getElementById('tA').value);
        const L = parseFloat(document.getElementById('tL').value);
        const E = parseFloat(document.getElementById('tE').value) * 1000;
        const alpha = parseFloat(document.getElementById('tAlpha').value) * 1e-6;
        const DT = parseFloat(document.getElementById('tDT').value);
        const Delta = parseFloat(document.getElementById('tDelta').value);
        const sigma = E * (alpha * DT - Delta / L);
        const F = A * sigma;
        html += `<strong>Stress:</strong> ${sigma.toFixed(2)} N/mm² ${DT > 0 ? '(Compression)' : '(Tension)'}<br>`;
        html += `<strong>Force:</strong> ${F.toFixed(0)} N<br>`;
        html += `<strong>Reduction:</strong> ${((1 - sigma/(E*alpha*DT))*100).toFixed(1)}% vs fixed`;
        
    } else if (type === 'stepped') {
        const A1 = parseFloat(document.getElementById('tA1').value);
        const L1 = parseFloat(document.getElementById('tL1').value);
        const A2 = parseFloat(document.getElementById('tA2').value);
        const L2 = parseFloat(document.getElementById('tL2').value);
        const E = parseFloat(document.getElementById('tE').value) * 1000;
        const alpha = parseFloat(document.getElementById('tAlpha').value) * 1e-6;
        const DT = parseFloat(document.getElementById('tDT').value);
        const P = E * alpha * DT * (L1 + L2) / (L1/A1 + L2/A2);
        const sigma1 = P / A1;
        const sigma2 = P / A2;
        html += `<strong>Thermal Force P:</strong> ${P.toFixed(0)} N<br>`;
        html += `<strong>σ₁:</strong> ${sigma1.toFixed(2)} N/mm² ${DT > 0 ? '(Compression)' : '(Tension)'}<br>`;
        html += `<strong>σ₂:</strong> ${sigma2.toFixed(2)} N/mm² ${DT > 0 ? '(Compression)' : '(Tension)'}<br>`;
        html += `<strong>Rule:</strong> Smaller area has higher stress`;
        
    } else if (type === 'composite') {
        const A1 = parseFloat(document.getElementById('tA1').value);
        const E1 = parseFloat(document.getElementById('tE1').value) * 1000;
        const alpha1 = parseFloat(document.getElementById('tAlpha1').value) * 1e-6;
        const A2 = parseFloat(document.getElementById('tA2').value);
        const E2 = parseFloat(document.getElementById('tE2').value) * 1000;
        const alpha2 = parseFloat(document.getElementById('tAlpha2').value) * 1e-6;
        const DT = parseFloat(document.getElementById('tDT').value);
        const denom = A1*E2 + A2*E1;
        const sigma1 = E1*E2*A2*(alpha2 - alpha1)*DT / denom;
        const sigma2 = -A1*sigma1/A2;
        html += `<strong>σ₁:</strong> ${sigma1.toFixed(2)} N/mm² ${sigma1 > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>σ₂:</strong> ${sigma2.toFixed(2)} N/mm² ${sigma2 > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>Check:</strong> ${(A1*sigma1 + A2*sigma2).toFixed(0)} ≈ 0 ✓`;
        
    } else if (type === 'withLoad') {
        const A1 = parseFloat(document.getElementById('tA1').value);
        const E1 = parseFloat(document.getElementById('tE1').value) * 1000;
        const alpha1 = parseFloat(document.getElementById('tAlpha1').value) * 1e-6;
        const A2 = parseFloat(document.getElementById('tA2').value);
        const E2 = parseFloat(document.getElementById('tE2').value) * 1000;
        const alpha2 = parseFloat(document.getElementById('tAlpha2').value) * 1e-6;
        const DT = parseFloat(document.getElementById('tDT').value);
        const P = parseFloat(document.getElementById('tP').value);
        const denom = A1*E2 + A2*E1;
        const sigma1 = (P*E1 + E1*E2*A2*(alpha2 - alpha1)*DT) / denom;
        const sigma2 = (P*E2 + E1*E2*A1*(alpha1 - alpha2)*DT) / denom;
        html += `<strong>σ₁:</strong> ${sigma1.toFixed(2)} N/mm² ${sigma1 > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>σ₂:</strong> ${sigma2.toFixed(2)} N/mm² ${sigma2 > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>Check:</strong> ${(A1*sigma1 + A2*sigma2).toFixed(0)} N = ${P} N ✓`;
        
    } else if (type === 'rodTube') {
        const D_rod = parseFloat(document.getElementById('tRodD').value);
        const E_rod = parseFloat(document.getElementById('tRodE').value) * 1000;
        const alpha_rod = parseFloat(document.getElementById('tRodAlpha').value) * 1e-6;
        const OD = parseFloat(document.getElementById('tTubeOD').value);
        const ID = parseFloat(document.getElementById('tTubeID').value);
        const E_tube = parseFloat(document.getElementById('tTubeE').value) * 1000;
        const alpha_tube = parseFloat(document.getElementById('tTubeAlpha').value) * 1e-6;
        const DT = parseFloat(document.getElementById('tDT').value);
        const A_rod = Math.PI * D_rod * D_rod / 4;
        const A_tube = Math.PI * (OD*OD - ID*ID) / 4;
        const denom = A_rod*E_tube + A_tube*E_rod;
        const sigma_rod = E_rod*E_tube*A_tube*(alpha_tube - alpha_rod)*DT / denom;
        const sigma_tube = -A_rod*sigma_rod/A_tube;
        html += `<strong>Rod Area:</strong> ${A_rod.toFixed(2)} mm²<br>`;
        html += `<strong>Tube Area:</strong> ${A_tube.toFixed(2)} mm²<br>`;
        html += `<strong>σ_rod:</strong> ${sigma_rod.toFixed(2)} N/mm² ${sigma_rod > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>σ_tube:</strong> ${sigma_tube.toFixed(2)} N/mm² ${sigma_tube > 0 ? '(Tension)' : '(Compression)'}<br>`;
        html += `<strong>Check:</strong> ${(A_rod*sigma_rod + A_tube*sigma_tube).toFixed(0)} ≈ 0 ✓`;
    }
    
    html += '</div>';
    document.getElementById('calcResult').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    updateCalc();
});
