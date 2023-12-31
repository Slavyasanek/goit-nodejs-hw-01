const contacts = require('./contacts');
const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then(r => console.log(r))
      break;
    case 'get':
      const contact = await contacts.getContactById(id)
      console.log(contact);
      break;
    case 'add':
      const addOne = await contacts.addContact(name, email, phone);
      console.log(addOne);
      break;
    case 'remove':
      const removedOne = await contacts.removeContact(id);
      console.log(removedOne);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);