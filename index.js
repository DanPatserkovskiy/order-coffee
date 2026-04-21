const beveragesList = document.getElementById('beverages-list');
const addButton = document.querySelector('.add-button');
const orderForm = document.getElementById('order-form');
const modal = document.getElementById('modal-overlay');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.querySelector('.close-modal');


function getWordForm(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) 
        return 'напитков';
    else if (lastDigit === 1) 
        return 'напиток';
    else if (lastDigit >= 2 && lastDigit <= 4) 
        return 'напитка';
    return 'напитков';
}

function updateIndexes() {
    const beverages = document.querySelectorAll('.beverage');
    beverages.forEach((bev, index) => {
        const num = index + 1;
        bev.querySelector('.beverage-count').textContent = `Напиток №${num}`;
        const inputs = bev.querySelectorAll('input');
        inputs.forEach(input => {
            const baseName = input.name.split('-')[0];
            input.name = `${baseName}-${num}`;
        });
    });
}


addButton.addEventListener('click', () => {
    const beverages = document.querySelectorAll('.beverage');
    const lastBeverage = beverages[beverages.length - 1];
    const newBeverage = lastBeverage.cloneNode(true);
    newBeverage.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    newBeverage.querySelector('select').selectedIndex = 1;
    newBeverage.querySelectorAll('input[type="radio"]').forEach(cb => cb.checked = false);
    beveragesList.appendChild(newBeverage);
    updateIndexes();
});

beveragesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const beverages = document.querySelectorAll('.beverage');
        if (beverages.length > 1) {
            event.target.closest('.beverage').remove();
            updateIndexes();
        }
    }
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const count = document.querySelectorAll('.beverage').length;
    modalMessage.textContent = `Вы заказали ${count} ${getWordForm(count)}`;
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});