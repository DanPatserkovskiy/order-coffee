const beveragesList = document.getElementById('beverages-list');
const addButton = document.querySelector('.add-button');
const orderForm = document.getElementById('order-form');
const modal = document.getElementById('modal-overlay');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.querySelector('.close-modal');

function getWordForm(n) {
    if (n % 100 >= 11 && n % 100 <= 14) return 'напитков';
    if (n % 10 === 1) return 'напиток';
    if (n % 10 >= 2 && n % 10 <= 4) return 'напитка';
    return 'напитков';
}

function updateTitles() {
    document.querySelectorAll('.beverage').forEach((item, i) => {
        item.querySelector('.beverage-count').textContent = `Напиток №${i + 1}`;
    });
}

addButton.addEventListener('click', () => {
    const items = document.querySelectorAll('.beverage');
    const copy = items[items.length - 1].cloneNode(true);
    copy.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        }
    });

    copy.querySelector('select').selectedIndex = 0;
    beveragesList.appendChild(copy);
    updateTitles();
});

beveragesList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('remove-button'))
        return;
    const items = document.querySelectorAll('.beverage');
    if (items.length === 1)
        return;
    e.target.closest('.beverage').remove();
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const count = document.querySelectorAll('.beverage').length;
    modalMessage.textContent = `Вы заказали ${count} ${getWordForm(count)}`;
    modal.classList.remove('hidden');
});


closeModal.addEventListener('click', close);

function close() {
    modal.classList.add('hidden');
}