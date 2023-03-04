const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransactionPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addTransactionBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.close');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');

const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
    addTransactionPanel.style.display = "flex";
}

const closePanel = () => {
    addTransactionPanel.style.display = "none";
    clearInput();
}

const checkForm = () => {
    if(nameInput.value !== "" && amountInput.value !== "" && categorySelect.value !== 'none'){
         createNewTransaction();
    }else {
        alert('Wypełnij wszystkie pola!')
    }
}

const clearInput = () => {
        nameInput.value = ""
        amountInput.value = ""
        categorySelect.selectedIndex = 0;
}

const createNewTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);

    checkCategory(selectedCategory);
    
    let cash = parseFloat(amountInput.value);

    newTransaction.innerHTML = `
        <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
        <p class="transaction-amount">${cash.toFixed(2)} 
        <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    `;

    if(amountInput.value > 0){
        incomeSection.appendChild(newTransaction) 
        newTransaction.classList.add('income')
    }else if(amountInput.value < 0){
        expensesSection.appendChild(newTransaction)
        newTransaction.classList.add('expense')
    }

    moneyArr.push(parseFloat(amountInput.value));
    countMoney(moneyArr);
    closePanel();
    ID++;
    clearInput();
}

const selectCategory = () => {
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
}

const checkCategory = transaction => {
    switch(transaction){
        case '[ + ] Przychód':
            categoryIcon = '<i class ="fas fa-money-bill-wave"></i>';
            break;
        case '[ - ] Zakupy':
            categoryIcon = '<i class ="fas fa-cart-arrow-down"></i>';
            break;
        case '[ - ] Jedzenie':
            categoryIcon = '<i class ="fas fa-hamburger"></i>';
            break;
        case '[ - ] Wyjścia':
            categoryIcon = '<i class ="fas fa-ticket"></i>';
            break;
    }
}

const countMoney = money => {
    const newMoney = money.reduce((a, b) => a + b);
    availableMoney.textContent = `${newMoney.toFixed(2)}zł`;
}

const deleteTransaction = (ID) => {
    const transactionToDelete = document.getElementById(ID);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const indexOfTransaction = moneyArr.indexOf(transactionAmount);

    moneyArr.splice(indexOfTransaction, 1)

    if(transactionToDelete.classList.contains('income')){
        incomeSection.removeChild(transactionToDelete)
    }else if (transactionToDelete.classList.contains('expense')){
        expensesSection.removeChild(transactionToDelete);
    }

    countMoney(moneyArr);
}

const deleteAll = () => {
    incomeSection.innerHTML = '<h3>Przychód:</h3>';
    expensesSection.innerHTML = '<h3>Wydatki:</h3>';
    availableMoney.textContent = '0zł';
    moneyArr = [0];
}

const changeStyleToLight = () => {
    root.style.setProperty('--first-color', '#F9F9F9')
    root.style.setProperty('--second-color', '#14161F')
    root.style.setProperty('--border-color', 'rgba(0,0,0, .2)')
}

const changeStyleToDark = () => {
    root.style.setProperty('--first-color', '#14161F')
    root.style.setProperty('--second-color', '#F9F9F9')
    root.style.setProperty('--border-color', 'rgba(255,255,255, .4)')
}

addTransactionBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAll);
lightBtn.addEventListener('click', changeStyleToLight);
darkBtn.addEventListener('click', changeStyleToDark);

