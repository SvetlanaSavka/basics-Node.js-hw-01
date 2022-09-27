const { Command } = require("commander");
const program = new Command();

const contacts = require("./contacts");
console.log(contacts);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
//console.log(process.argv);

//invokeAction({ action: "listContacts" });
//invokeAction({ action: "getContactById", id: "3" });
/* invokeAction({
  action: "addContact",
  name: "Savka Svitlana",
  email: "savkasa@ukr.net",
  phone: "(542) 451-6666",
}); */
//invokeAction({ action: "remove"})

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();
console.log(options);
invokeAction(options);
