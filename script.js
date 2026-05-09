// Pomodoro Timer
let time = 25 * 60;
let timerId = null;
let sessions = 0;

function updateTime() {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    document.getElementById('time').textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
        time--;
        updateTime();
        if (time <= 0) {
            clearInterval(timerId);
            timerId = null;
            sessions++;
            document.getElementById('sessions').textContent = sessions;
            time = 25 * 60;
            updateTime();
            alert('Session complete! Take a 5 min break 💀');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    time = 25 * 60;
    updateTime();
}

// Topic checklist
function updateProgress() {
    const checks = document.querySelectorAll('.topic-check input');
    const done = Array.from(checks).filter(c => c.checked).length;
    document.getElementById('topicsDone').textContent = done;
    checks.forEach(c => {
        c.parentElement.classList.toggle('done', c.checked);
    });
}

// Load notes content with all diagrams
document.getElementById('lectureNotes').innerHTML = `
    <h3>1. DIRECT STRESS</h3>
    <h4>A. Stress</h4>
    <div class="simple-box">
        <strong>Definition:</strong> Direct stress is the internal resistance force offered by a material per unit area when external force is applied.
        <br><br>
        <strong>Formula:</strong> Stress = F / A
        <br>
        <strong>Units:</strong> N/mm² or N/m²
        <br>
        <strong>Denoted by:</strong> σ (sigma)
    </div>

    <h4>B. Strain</h4>
    <div class="simple-box">
        <strong>Definition:</strong> Strain is a measure of deformation of a material due to applied stress. It is the ratio of change in dimension to original dimension.
        <br><br>
        <strong>Formula:</strong> ε = ΔL / L
        <br>
        <strong>Denoted by:</strong> ε (epsilon)
        <br>
        <strong>Note:</strong> Strain has no unit. It is dimensionless.
    </div>

    <h3>2. Elastic Limit</h3>
    <div class="simple-box">
        The maximum value to which material returns to its original shape and size when load is withdrawn.
    </div>

    <h3>3. Hooke's Law</h3>
    <div class="simple-box">
        <strong>States:</strong> Within the proportional limit, stress is directly proportional to strain.
        <br><br>
        <strong>Therefore:</strong> σ ∝ ε → σ = Eε
        <br>
        <strong>E = Young's Modulus / Elastic Modulus</strong>
    </div>

    <h3>4. Young's Modulus (E) - Elastic Modulus</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Young Modulus is the measure of stiffness of a material. It defines the ratio of stress to strain within the elastic limit (region).
        <br><br>
        <strong>Formula:</strong> E = Stress / Strain = σ / ε = (F/A) / (ΔL/L)
        <br>
        <strong>Denoted by:</strong> E
        <br>
        <strong>Units:</strong> N/mm² or GPa
    </div>

    <h3>5. Modulus of Rigidity (G) - Shear Modulus</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Modulus of rigidity is the property of a material that measures its ability to resist shear deformation.
        <br><br>
        It is defined as the ratio of shear stress to shear strain within the elastic limit of material.
        <br><br>
        <strong>Formula:</strong> G = τ / γ
        <br>
        <strong>Where:</strong>
        <br>• G = Modulus of rigidity
        <br>• τ = Shear stress (force per unit area)
        <br>• γ = Shear strain (angular deformation)
        <br><br>
        <strong>Key Point:</strong> When a body is subjected to shear force it tends to change shape but volume remains the same.
        <br><br>
        <strong>High value of G</strong> means a material is more resistant to shear deformation.
    </div>

    <h3>6. Poisson's Ratio (ν)</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Poisson's ratio is the measure of lateral contraction (or expansion) of a material when it is stretched (or compressed) in one direction.
        <br><br>
        It is defined as the ratio of the lateral strain to longitudinal strain.
        <br><br>
        <strong>Formula:</strong> ν = - (Lateral Strain / Longitudinal Strain)
        <br><br>
        <strong>Where:</strong>
        <br>• Lateral Strain = Δd / d (Change in diameter per original diameter)
        <br>• Longitudinal Strain = ΔL / L (Change in length per original length)
        <br><br>
        <strong>Note:</strong> -ve shows that when length increases, diameter decreases.
    </div>

    <div class="example-box">
        <h5>Example 1: Poisson's Ratio Calculation</h5>
        If a steel load elongates by 0.1% in length and contracts by 0.3% in diameter:
        <br><br>
        <strong>Given:</strong>
        <br>Longitudinal strain = 0.1% = 0.001
        <br>Lateral strain = -0.3% = -0.003 (negative because contraction)
        <br><br>
        <strong>Solution:</strong>
        <br>ν = - (Lateral Strain / Longitudinal Strain)
        <br>ν = - (-0.003 / 0.001)
        <br>ν = 0.003 / 0.001 = 3
    </div>

    <h3>7. Types of Stresses</h3>
    <ul>
        <li><strong>1. Tensional Stress:</strong> Pulling apart</li>
        <li><strong>2. Compression Stress:</strong> Pushing together</li>
    </ul>

    <div class="example-box">
        <h5>Example 2: Steel Bar Elongation</h5>
        A steel load 1m long and 20mm by 20mm in cross section is subjected to a tensile force of 40kN. Determine the elongation of length if Modulus of elasticity is 200 N/mm².
        <br><br>
        <strong>Given:</strong>
        <br>L = 1m = 1000mm
        <br>Cross-section = 20mm × 20mm = 400mm²
        <br>F = 40kN = 40,000N
        <br>E = 200 N/mm²
        <br><br>
        <strong>Solution:</strong>
        <br>σ = F/A = 40000 / 400 = 100 N/mm²
        <br><br>
        ε = σ/E = 100 / 200 = 0.5
        <br><br>
        ε = ΔL/L
        <br>ΔL = L × ε = 1000 × 0.5 = 500mm
        <br><br>
        <strong>Answer: Elongation = 500mm</strong>
    </div>

    <div class="example-box">
        <h5>Example 3: Hollow Cylinder - CORRECTED</h5>
        A hollow cylinder 2m long has an outside diameter of 50mm and inside diameter of 30mm. If the cylinder is carrying a load of 25kN, find:
        <br>i) The stress in the cylinder
        <br>ii) The deformation if E = 100 N/mm²
        
        <div class="diagram">
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <text x="150" y="20" fill="#0f0" font-size="14" text-anchor="middle" font-weight="bold">Hollow Cylinder Cross-Section</text>
                <circle cx="150" cy="100" r="60" fill="none" stroke="#0f0" stroke-width="2"/>
                <circle cx="150" cy="100" r="36" fill="#0a0a0f" stroke="#0f0" stroke-width="2"/>
                <line x1="150" y1="100" x2="210" y2="100" stroke="#666" stroke-width="1" stroke-dasharray="2,2"/>
                <text x="180" y="95" fill="#999" font-size="11">D_o=50mm</text>
                <line x1="150" y1="100" x2="186" y2="100" stroke="#666" stroke-width="1" stroke-dasharray="2,2"/>
                <text x="165" y="115" fill="#999" font-size="11">D_i=30mm</text>
                <text x="150" y="180" fill="#0f0" font-size="12" text-anchor="middle">Area = π(D_o² - D_i²)/4</text>
            </svg>
        </div>
        
        <strong>Given:</strong>
        <br>L = 2m = 2000mm
        <br>D_o = 50mm, D_i = 30mm
        <br>F = 25kN = 25,000N
        <br>E = 100 N/mm²
        <br><br>
        <strong>Solution i) Stress:</strong>
        <br>Area = π/4 × (D_o² - D_i²)
        <br>A = π/4 × (50² - 30²)
        <br>A = π/4 × (2500 - 900)
        <br>A = π/4 × 1600 = 1256.64 mm²
        <br><br>
        σ = F/A = 25000 / 1256.64 = <strong>19.89 N/mm²</strong>
        <br><br>
        <strong>Solution ii) Deformation:</strong>
        <br>ε = σ/E = 19.89 / 100 = 0.1989
        <br><br>
        ΔL = L × ε = 2000 × 0.1989 = <strong>397.8 mm</strong>
        <br><br>
        <strong>Note:</strong> Hollow area formula: A = π(D_o² - D_i²)/4, NOT π(D_o - D_i)²/4
    </div>

    <h3>8. Principle of Superposition</h3>
    <div class="simple-box">
        <strong>States:</strong> In a linear system, the total response caused by several loads acting together is equal to the algebraic sum of the responses caused by each load acting separately.
        <br><br>
        <strong>Application:</strong> Sometimes a body is subjected to number of forces acting on its outer edges as well as at some other section along its length of the body.
        <br><br>
        <strong>How to use:</strong> Split the bar into individual sections. Consider each section separately. The resulting deformation of the body is equal to the algebraic sum of the deformation of the individual sections.
        <br><br>
        <strong>Formula:</strong> ΔL = FL/AE = (1/AE)[F₁L₁ + F₂L₂ + F₃L₃ + ...]
        <br><br>
        <strong>Where:</strong>
        <br>• F₁ = Force acting at section 1
        <br>• L₁ = Length of section 1
        <br>• F₂, L₂ = Corresponding values for section 2, and so on
    </div>

    <div class="example-box">
        <h5>Example 4: Stepped Bar with Multiple Forces - CORRECTED</h5>
        A steel bar of cross-section area 200mm² is loaded as shown. Find the total elongation. Take E = 200 kN/mm² = 200,000 N/mm²
        
        <div class="diagram">
            <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
                <text x="250" y="15" fill="#0f0" font-size="13" text-anchor="middle" font-weight="bold">Stepped Bar with Multiple Forces</text>
                <!-- Bar -->
                <rect x="50" y="50" width="400" height="30" fill="none" stroke="#0f0" stroke-width="2"/>
                <!-- Points -->
                <line x1="50" y1="45" x2="50" y2="85" stroke="#0f0" stroke-width="2"/>
                <text x="50" y="100" fill="#999" font-size="11" text-anchor="middle">A</text>
                <line x1="200" y1="45" x2="200" y2="85" stroke="#0f0" stroke-width="2"/>
                <text x="200" y="100" fill="#999" font-size="11" text-anchor="middle">B</text>
                <line x1="450" y1="45" x2="450" y2="85" stroke="#0f0" stroke-width="2"/>
                <text x="450" y="100" fill="#999" font-size="11" text-anchor="middle">C</text>
                <!-- Forces -->
                <defs>
                    <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#f00" />
                    </marker>
                    <marker id="arrowyellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#ff0" />
                    </marker>
                </defs>
                <line x1="50" y1="65" x2="20" y2="65" stroke="#f00" stroke-width="2" marker-end="url(#arrowred)"/>
                <text x="25" y="55" fill="#f00" font-size="11">50kN</text>
                <line x1="200" y1="65" x2="230" y2="65" stroke="#ff0" stroke-width="2" marker-end="url(#arrowyellow)"/>
                <text x="215" y="55" fill="#ff0" font-size="11">20kN</text>
                <line x1="450" y1="65" x2="480" y2="65" stroke="#ff0" stroke-width="2" marker-end="url(#arrowyellow)"/>
                <text x="465" y="55" fill="#ff0" font-size="11">30kN</text>
                <!-- Dimensions -->
                <line x1="50" y1="110" x2="200" y2="110" stroke="#666" stroke-width="1"/>
                <text x="125" y="125" fill="#999" font-size="11" text-anchor="middle">300mm</text>
                <line x1="200" y1="110" x2="450" y2="110" stroke="#666" stroke-width="1"/>
                <text x="325" y="125" fill="#999" font-size="11" text-anchor="middle">500mm</text>
            </svg>
        </div>
        
        <strong>Given:</strong>
        <br>A = 200 mm²
        <br>Section AB: L₁ = 300mm, Net force = 50 - 20 = 30kN (tension)
        <br>Section BC: L₂ = 500mm, Net force = 30kN (tension)
        <br>E = 200,000 N/mm²
        <br><br>
        <strong>Solution:</strong>
        <br>ΔL = (1/AE)[F₁L₁ + F₂L₂]
        <br>ΔL = (1/(200 × 200,000))[30,000 × 300 + 30,000 × 500]
        <br>ΔL = (1/40,000,000)[9,000,000 + 15,000,000]
        <br>ΔL = 24,000,000 / 40,000,000
        <br>ΔL = <strong>0.6 mm</strong>
        <br><br>
        <strong>Answer: Total elongation = 0.6mm</strong>
        <br><br>
        <strong>Note:</strong> Your notes had ΔL = 0.75mm. Check: E = 200 kN/mm² = 200,000 N/mm², not 20,000. 1 kN/mm² = 1000 N/mm².
    </div>

    <h3>9. Yield Strength</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Yield strength is the minimum stress at which material begins to deform plastically.
        <br><br>
        At yield stress, the material reaches its elastic limit. Any stress beyond this point subjects the material to plastic deformation.
    </div>

    <h3>10. Ultimate Stress</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Ultimate stress is the maximum stress a material can withstand before it begins to fail.
    </div>

    <h3>11. Fracture Stress</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Fracture stress is the breaking stress at which the material fails.
        <br><br>
        <strong>Formula:</strong> σ_u = F_max / A_o
        <br>
        <strong>Where:</strong>
        <br>• F_max = Maximum load applied before failure
        <br>• A_o = Original cross-section area of the material
    </div>

    <h3>12. Factor of Safety (F.O.S)</h3>
    <div class="simple-box">
        <strong>Why use it?</strong> Since materials may have hidden defects, loads or unexpected stresses may occur, engineers do not use full strength of materials. Instead they apply a Factor of Safety.
        <br><br>
        <strong>Commonly ranged:</strong> 1.5 to 3 for metals, higher for brittle materials.
    </div>

    <h3>13. Permissible / Safe Stress</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Permissible stress is the maximum stress that a material is allowed to carry safely in design.
        <br><br>
        It is always less than the yield stress or ultimate stress.
        <br><br>
        <strong>Formula:</strong> Permissible Stress = Yield Stress (or Ultimate Stress) / Factor of Safety
    </div>

    <div class="example-box">
        <h5>Example 5: Safe Stress Calculation</h5>
        If yield stress of a material is 250 N/mm² and factor of safety is 2.5, determine safe stress.
        <br><br>
        <strong>Solution:</strong>
        <br>Safe Stress = Yield Stress / Factor of Safety
        <br>= 250 / 2.5
        <br>= 100 N/mm²
        <br><br>
        <strong>So in design, the steel will only be stressed up to 100 N/mm²</strong>
    </div>

    <h3>14. Working Stress</h3>
    <div class="simple-box">
        <strong>Definition:</strong> Working stress is the actual stress produced in the material under service load.
        <br><br>
        It is the stress a structural material experiences during normal operation and it is always less than or equal to permissible stress.
        <br><br>
        <strong>Formula:</strong> Working Stress = Load Applied / Cross-sectional Area (A_o)
        <br><br>
        <strong>Rule:</strong> Working Stress ≤ Safe Stress
    </div>

    <h3>15. How Much Does It Stretch? δ = FL/AE</h3>
    <div class="simple-box">
        <strong>Formula:</strong> Deformation δ = Force × Length / Area × E
        <br><br>
        <strong>Meaning:</strong> More force = more stretch. Longer bar = more stretch. 
        <br>Bigger area or stiffer material = less stretch.
    </div>

    <h3>16. Temperature Changes Cause Stress Too</h3>
    <div class="simple-box">
        <strong>If free to expand:</strong> δ = α × L × ΔT. No stress.
        <br>
        <strong>If blocked:</strong> Stress = E × α × ΔT
        <br>
        <strong>α:</strong> How much it expands per °C. Steel α = 12×10⁻⁶
    </div>

    <h3>17. Key Numbers to Remember</h3>
    <div class="simple-box">
        <strong>Steel:</strong> E = 200 GPa, G = 80 GPa, μ = 0.3, Yield = 250 MPa
        <br>
        <strong>Concrete:</strong> E = 25 GPa, μ = 0.2
        <br>
        <strong>Aluminum:</strong> E = 70 GPa, μ = 0.33
        <br>
        <strong>Note:</strong> 1 GPa = 1000 N/mm², 1 kN/mm² = 1000 N/mm²
    </div>
`;

// Single section calculator
function calcStressStrain() {
    const F = parseFloat(document.getElementById('force').value);
    const Do = parseFloat(document.getElementById('outerDia').value);
    const Di = parseFloat(document.getElementById('innerDia').value) || 0;
    const L = parseFloat(document.getElementById('length').value);
    const E_GPa = parseFloat(document.getElementById('modulus').value);
    const G_GPa = parseFloat(document.getElementById('shearModulus').value);
    const FOS = parseFloat(document.getElementById('fos').value);
    const v = parseFloat(document.getElementById('poisson').value);
    
    if (!F || !Do || !L || !E_GPa) {
        document.getElementById('stressResult').innerHTML = '<div class="result">Fill in Force, Outer Dia, Length, and E at minimum</div>';
        return;
    }
    
    const E = E_GPa * 1000; // GPa to N/mm²
    const G = G_GPa * 1000; // GPa to N/mm²
    const A = Math.PI / 4 * (Do * Do - Di * Di);
    const stress = F / A;
    const strain = stress / E;
    const deltaL = strain * L;
    const safeStress = 250 / FOS; // Assuming steel yield = 250 MPa
    const lateralStrain = -v * strain;
    const shearStress = F / A; // Simplified
    const shearStrain = shearStress / G;
    
    let html = `<div class="result">`;
    html += `<strong>Cross-section Area:</strong> ${A.toFixed(2)} mm²<br>`;
    html += `<strong>Direct Stress σ:</strong> ${stress.toFixed(2)} N/mm²<br>`;
    html += `<strong>Strain ε:</strong> ${strain.toExponential(3)}<br>`;
    html += `<strong>Elongation ΔL:</strong> ${deltaL.toFixed(3)} mm<br>`;
    html += `<strong>Safe Stress (Steel):</strong> ${safeStress.toFixed(2)} N/mm²<br>`;
    if (stress <= safeStress) {
        html += `<strong style="color:#0f0">✓ Safe:</strong> Working stress ≤ Safe stress<br>`;
    } else {
        html += `<strong style="color:#f00">✗ UNSAFE:</strong> Working stress > Safe stress<br>`;
    }
    if (v) {
        html += `<strong>Lateral Strain:</strong> ${lateralStrain.toExponential(3)}<br>`;
    }
    if (G_GPa) {
        html += `<strong>Shear Strain γ:</strong> ${shearStrain.toExponential(3)}<br>`;
    }
    html += `</div>`;
    document.getElementById('stressResult').innerHTML = html;
}

// Multi-section superposition calculator
function calcSuperposition() {
    const A = parseFloat(document.getElementById('superArea').value);
    const E_GPa = parseFloat(document.getElementById('superE').value);
    
    if (!A || !E_GPa) {
        document.getElementById('superResult').innerHTML = '<div class="result">Fill in Area and E for superposition calc</div>';
        return;
    }
    
    const E = E_GPa * 1000; // GPa to N/mm²
    const AE = A * E;
    
    const F1 = parseFloat(document.getElementById('f1').value) || 0;
    const L1 = parseFloat(document.getElementById('l1').value) || 0;
    const F2 = parseFloat(document.getElementById('f2').value) || 0;
    const L2 = parseFloat(document.getElementById('l2').value) || 0;
    const F3 = parseFloat(document.getElementById('f3').value) || 0;
    const L3 = parseFloat(document.getElementById('l3').value) || 0;
    const F4 = parseFloat(document.getElementById('f4').value) || 0;
    const L4 = parseFloat(document.getElementById('l4').value) || 0;
    const F5 = parseFloat(document.getElementById('f5').value) || 0;
    const L5 = parseFloat(document.getElementById('l5').value) || 0;
    
    const totalFL = F1*L1 + F2*L2 + F3*L3 + F4*L4 + F5*L5;
    const deltaL = totalFL / AE;
    
    let html = `<div class="result">`;
    html += `<strong>Formula:</strong> ΔL = (1/AE)[F₁L₁ + F₂L₂ + F₃L₃ + F₄L₄ + F₅L₅]<br>`;
    html += `<strong>AE:</strong> ${A} × ${E} = ${AE.toExponential(3)} N<br>`;
    html += `<strong>Σ(F×L):</strong> ${totalFL.toExponential(3)} N·mm<br>`;
    html += `<strong>Total Elongation ΔL:</strong> ${deltaL.toFixed(4)} mm<br>`;
    html += `</div>`;
    document.getElementById('superResult').innerHTML = html;
}

// YouTube switcher
function switchVideo(videoId) {
    document.getElementById('ytPlayer').src = `https://www.youtube.com/embed/${videoId}`;
    if (videoId === 'EN4Zz0GLZpA') {
        document.getElementById('videoCredit').textContent = 'The Efficient Engineer - Understanding Stress';
    } else {
        document.getElementById('videoCredit').textContent = 'Jeff Hanson - Mechanics of Materials';
    }
}

// PDF Download
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('VOID STUDY HUB - Structures I Module 1', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Strength of Materials - Complete Notes', 105, 28, { align: 'center' });
    
    let y = 40;
    const notes = document.getElementById('lectureNotes').innerText;
    const lines = doc.splitTextToSize(notes, 180);
    
    lines.forEach(line => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(line, 15, y);
        y += 7;
    });
    
    doc.save('VOID_Structures_Module1.pdf');
}

// Init
updateTime();
