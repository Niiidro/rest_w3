import { v4 as uuidv4 } from "uuid";
class User {
  constructor(body) {
    this.id = uuidv4();
    this.name = body.name;
    this.nachname = body.nachname;
    this.email = body.email;
  }
}

let users = [
  {
    id: "1", //uuidv4(),
    name: "Joerg",
    nachname: "Meier",
    email: "jmeier@hf-ict.info",
  },
  {
    id: uuidv4(),
    name: "Valentin",
    nachname: "Amstutz",
    email: "vamstutz@hf-ict.info",
  },
];

function createUser(body) {
  const user = new User(body);
  users.push(user);
  return users;
}
function getAllUsers() {
  return users;
}
function getUserById(id) {
  return users.find((x) => x.id === id);
}
function updateUser(id, method) {
  //method = Put oder Patch
}
function deleteUser(id) {}

export default {
  users,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
