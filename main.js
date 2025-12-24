// Ambil elemen display
const previewDisplay = document.querySelector('.output h3'); // PREVIEW
const resultDisplay = document.querySelector('.output h2');  // HASIL
const historyList = document.querySelector('.history-list'); // HISTORY
const buttons = document.querySelectorAll('.btn');

// State
let currentInput = '';
let histories = [];

// Ambil nilai tombol (support <h3> & icon)
function getButtonValue(button) {
    const h3 = button.querySelector('h3');
    if (h3) return h3.textContent.trim();
    if (button.querySelector('i')) return 'BACK';
    return '';
}

// Update preview & hasil
function updateDisplay() {
    previewDisplay.textContent = currentInput;
    resultDisplay.textContent = currentInput || '0';
}

// Hitung & simpan history
function calculate() {
    if (!currentInput) return;

    try {
        const expression = currentInput
            .replace(/x/g, '*')
            .replace(/,/g, '.')
            .replace(/%/g, '/100');

        const result = eval(expression);

        // Tambah ke history
        const li = document.createElement('li');
        li.textContent = `${currentInput} = ${result}`;
        historyList.prepend(li); // tampilkan di atas

        histories.push(`${currentInput} = ${result}`); // simpan ke array juga

        // Tampilkan hasil
        resultDisplay.textContent = result;

        // Kosongkan preview
        previewDisplay.textContent = '';

        // Input jadi hasil
        currentInput = result.toString();

    } catch {
        resultDisplay.textContent = 'Error';
    }
}

// Event klik tombol
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = getButtonValue(button);

        // AC
        if (value === 'AC') {
            currentInput = '';
            histories = [];
            previewDisplay.textContent = '';
            resultDisplay.textContent = '0';
            historyList.innerHTML = ''; // hapus semua history di layar
            return;
        }

        // Backspace
        if (value === 'BACK') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
            return;
        }

        // Sama dengan
        if (value === '=') {
            calculate();
            return;
        }

        // Input biasa
        currentInput += value;
        updateDisplay();
    });
});

// ===== Keyboard Support =====
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (/[0-9+\-*/%,.]/.test(key)) {
        currentInput += key === '*' ? 'x' : key;
        updateDisplay();
    }

    else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    else if (key === 'Enter' || key === '=') {
        calculate();
    }

    else if (key === 'Escape') {
        currentInput = '';
        histories = [];
        previewDisplay.textContent = '';
        resultDisplay.textContent = '0';
        historyList.innerHTML = '';
    }
});
