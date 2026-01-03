let contacts = [];

const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");
const search = document.getElementById("search");
const contactIdField = document.getElementById("contactId");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = contactIdField.value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    alert("Please fill all the fields");
    return;
  }

  if (id) {
    const contact = contacts.find(c => c.id == id);

    if (contact) {
      // Updateing contact
      contact.name = name;
      contact.phone = phone;
    } else {
      contacts.push({
        id: Date.now(),
        name,
        phone
      });
    }
  } else {
    contacts.push({
      id: Date.now(),
      name,
      phone
    });
  }

  form.reset();
  contactIdField.value = "";
  loadContacts(contacts);
});

// load contact list
function loadContacts(data) {
  list.innerHTML = "";
  data.forEach(contact => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${contact.name} - ${contact.phone}</span>
      <div class="actions">
        <button class="edit" onclick="editContact(${contact.id})">Edit</button>
        <button class="delete" onclick="deleteContact(${contact.id})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}
function editContact(id) {
  const contact = contacts.find(c => c.id === id);
  if (!contact) return;

  contactIdField.value = contact.id;
  document.getElementById("name").value = contact.name;
  document.getElementById("phone").value = contact.phone;
}

function deleteContact(id) {
  contacts = contacts.filter(c => c.id !== id);
  if (contactIdField.value == id) {
    form.reset();
    contactIdField.value = "";
  }

  loadContacts(contacts);
}


search.addEventListener("input", function () {
  const value = search.value.toLowerCase();

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(value) ||
    contact.phone.includes(value)
  );

  loadContacts(filtered);
});
