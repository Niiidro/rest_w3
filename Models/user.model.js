import { v4 as uuidv4 } from "uuid";

let users = {
  1: {
    id: uuidv4(),
    name: "Joerg",
    nachname: "Meier",
    email: "jmeier@hf-ict.info",
  },
  2: {
    id: uuidv4(),
    name: "Valentin",
    nachname: "Amstutz",
    email: "vamstutz@hf-ict.info",
  },
};

function createUser() {}
function getAllUsers() {}
function getUserById(id) {}
function updateUser(id, method) {
  //method = Put oder Patch
}
function deleteUser(id) {}

export default {
  users,
};
