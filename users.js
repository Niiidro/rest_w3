import { v4 as uuidv4 } from "uuid";

// Klasse User
class User {
  constructor(body,id) {
    this.name = body.name;
    this.nachname = body.nachname;
    this.email = body.email;
    this.id = uuidv4();
  }
}

// Beispiel daten initialisieren
let users = [
  {
    id: uuidv4(), // Random ID verwenden
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
  // Neues User Objekt erstellen mit dem body 
  const user = new User(body,null);
  users.push(user); // neues Objekt zum Array hinzufügen
  return users;
}
function getAllUsers() {
  return users;
}
function getUserById(id) {
  // Sucht den Benutzer ung gibt diesen zurück
  return users.find((x) => x.id === id);
}
function updateUser(id,body,method) {
  //method = Put oder Patch
  let currentUser = users.find((x) => x.id === id);
  // put Objekt ersetzen wenn Felder leer sind Objekt ohne diese Felder generieren
  if(method == 'put'){
      currentUser.name = body.name
      currentUser.nachname = body.nachname
      currentUser.email = body.email
  // patch nur Felder anpassen welche geändert haben
  }else if(method == 'patch'){
    // auf null prüfen damit leere Felder übersprungen werden
    if (body.name != null){ 
      currentUser.name = body.name
    }
    if (body.nachname != null){
      currentUser.nachname = body.nachname
    }
    if (body.email != null){
      currentUser.email = body.email
    }
  }
  return users

}
function deleteUser(id) {
  // User Index (stelle im Array) suchen
  let index = users.findIndex(x => x.id === id);
  users.splice(index,1); // Eintrag löschen ,1 = 1 Element löschen
  return users
}

// Export der funktionen
export default {
  users,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
