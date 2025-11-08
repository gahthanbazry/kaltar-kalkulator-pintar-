// Ambil elemen penting
const historyDisplay = document.querySelector('.output h3');
const resultDisplay = document.querySelector('.output h2');
const buttons = document.querySelectorAll('.btn');

let currentInput = ''; // Menyimpan input pengguna
let history = ''; // Menyimpan riwayat perhitungan

// Fungsi utama untuk update tampilan
function updateDisplay() {
    resultDisplay.textContent = currentInput || '';
    historyDisplay.textContent = currentInput || '0';
}

// Fungsi untuk evaluasi ekspresi
function calculate() {
    try {
        let expression = currentInput.replace(/x/g, '*').replace(/,/g, '.');
        expression = expression.replace(/%/g, '/100');
        const result = eval(expression);
        history = currentInput;
        resultDisplay.textContent = result;
        historyDisplay.textContent = history;
        currentInput = result.toString();
    } catch {
        resultDisplay.textContent = 'Error';
    }
}

// Event listener untuk tombol kalkulator
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        // Tombol AC → reset semua
        if (value === 'AC') {
            currentInput = '';
            history = '';
            resultDisplay.textContent = '';
            historyDisplay.textContent = '0';
        }

        // Tombol hapus (ikon panah kiri)
        else if (button.querySelector('i')) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        }

        // Tombol sama dengan (=)
        else if (value === '=') {
            calculate();
        }

        // Tambahkan input biasa
        else {
            currentInput += value;
            updateDisplay();
        }
    });
});

// ==== Keyboard Shortcuts ====

// Event keyboard global
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Angka, operator dasar, koma
    if (/[0-9+\-*/%,.]/.test(key)) {
        currentInput += key === '*' ? 'x' : key; // ubah * jadi x biar konsisten
        updateDisplay();
    }

    // Backspace → hapus satu angka
    else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    // Enter atau = → hitung
    else if (key === 'Enter' || key === '=') {
        calculate();
    }

    // Escape → reset semua
    else if (key === 'Escape') {
        currentInput = '';
        history = '';
        resultDisplay.textContent = '';
        historyDisplay.textContent = '0';
    }
});
