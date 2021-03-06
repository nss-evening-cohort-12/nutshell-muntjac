import './visitor.scss';
import utils from '../../helpers/utils';
import authData from '../../helpers/data/authData';

const getVisitors = () => utils.readData('Visitor');
const getVisitorLog = () => utils.readData('visitorLog');
const allCost = [];

const printVisitor = () => {
  getVisitors()
    .then((visitors) => {
      let domString = `
      <div id="visitor-div">
        <h2 class="text-center homeH3" id="vis-heading">Visitors<h2>
        <div class="text-center mb-3" id="add-button"></div>
        <button type="button" class="btn btn-success" id="buy-something"><i class="fas fa-dollar-sign"></i>Buy Something</button>
        <button type="button" class="btn btn-warning" id="visitor-log-btn"><i class="fas fa-clipboard-list"></i>Visitor Activity</button>
        <div id="new-vis-form"></div>
        <div class="d-flex flex-wrap vis-container">`;

      visitors.forEach((visitor) => {
        domString += `
        <div id="${visitor.id}" class="card visitor" style="width: 18rem;">
            <div class="vis-card-body">
              <h4 class="vis-card-title">${visitor.name}</h4>
              <p class="attend">Total amount spent: $${visitor.amtSpent}</p>
              <div class="vis-card-buttons">
                <a href="#" class="btn btn-warning update-visitor" id="update-visitor">Edit</a>
                <a href="#" class="btn btn-danger remove-visitor" id="remove-visitor">Delete</a>
              </div>
            </div>
          </div>
              `;
      });
      domString += `
          </div>
        </div>
      <div id="visitor-activity" class="hide"></div>
       `;
      utils.printToDom('#content', domString);
      authData.checkLoginStatus();
    })
    .catch((err) => console.error('visitors broke', err));
};

const getExpenses = () => {
  getVisitorLog()
    .then((expenses) => {
      expenses.forEach((expense) => {
        const expenseNum = expense.cost;
        allCost.push(expenseNum);
      });
    })
    .catch((err) => console.error('could not add total cost', err));
};

const visitorLog = () => {
  $('#visitor-activity').toggleClass('hide');
  getVisitorLog()
    .then((visitorActivity) => {
      let domString = '<div id="sum-counter"></div>';
      visitorActivity.forEach((activity) => {
        domString += `<p>${activity.name}: ${activity.activity} - ${activity.cost}</p>`;
      });
      utils.printToDom('#visitor-activity', domString);
      authData.checkLoginStatus();
    })
    .catch((err) => console.error('could not print log', err));
  getExpenses();
  // eslint-disable-next-line no-use-before-define
  totalExpense();
};

const totalExpense = () => {
  getVisitorLog()
    .then((expenses) => {
      let domString = '';
      expenses.forEach((expense) => {
        const expenseNum = expense.cost;
        allCost.push(expenseNum);
      });
      const addStuff = (accumulator, currentVal) => accumulator + currentVal;
      const sum = allCost.reduce(addStuff, 0);
      domString += `<h5>Total Spent at the Park: ${sum}</h5>`;
      utils.printToDom('#sum-counter', domString);
      authData.checkLoginStatus();
    })
    .catch((err) => console.error('could not add total cost', err));
};

export default { printVisitor, visitorLog };
