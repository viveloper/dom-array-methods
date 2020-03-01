const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const showMillionairesBtn = document.getElementById('show-millionaires');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

function doubleMoney() {
  data = data.map(item => ({
    ...item,
    money: item.money * 2
  }));
  updateDOM();
}

function showMillionaires() {
  data = data.filter(item => item.money > 1000000);
  updateDOM();
}

function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calculateWealth() {
  if (!main.querySelector('.entire-wealth')) {
    const entireWealth = data.reduce((total, item) => total + item.money, 0);
    const wealthEl = document.createElement('div');
    wealthEl.classList.add('entire-wealth');
    wealthEl.innerHTML = `
      <h3>Total Wealth: <strong>${formatMoney(entireWealth)}</strong></h3>
    `;
    main.appendChild(wealthEl);
  }
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  // while (main.lastElementChild.tagName.toLowerCase() !== 'h2') {
  //   main.removeChild(main.lastChild);
  // }
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach(item => {
    const person = document.createElement('p');
    person.className = 'person';
    person.innerHTML = `
      <strong>${item.name}</strong> ${formatMoney(item.money)}
    `;
    main.appendChild(person);
  });
}

function formatMoney(number) {
  return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();
