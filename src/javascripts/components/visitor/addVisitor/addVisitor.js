import './addVisitor.scss';
import utils from '../../../helpers/utils';
import visitorData from '../../../helpers/data/visitorData';
import buildVisitors from '../visitor';
import auth from '../../../helpers/data/authData';

const showVisForm = () => {
  if (!auth.isAuthenticated()) return;
  const domString = `
    <form class="check-auth" id="vis-form">
      <div class="form-group col-sm-8">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name-val" placeholder="First & Last Name">
      </div>
      <button class="btn btn-primary" id="addVisitor">Submit</button>
    </form>
    `;
  if (!$('#vis-form').length) {
    utils.printToDom('#new-vis-form', domString);
  } else {
    $('#new-vis-form').toggleClass('hide');
  }
};

const addVisitorEvent = () => {
  if (!auth.isAuthenticated()) return;
  const newVisitor = {
    name: $('#name-val').val(),
    amtSpent: 0,
  };
  visitorData.addVisitor(newVisitor)
    .then(() => {
      buildVisitors.printVisitor();
      utils.printToDom('#new-vis-form', '');
    })
    .catch((err) => console.error('add visitor broke', err));
};
export default {
  showVisForm,
  addVisitorEvent,
};
