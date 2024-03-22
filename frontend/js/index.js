const BACKEND_API = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", async () => {
  await loadContacts();

  const form = document.getElementById("contact-form");
  form.addEventListener("submit", onFormSubmit);
});

const loadContacts = async () => {
  const req = await fetch(`${BACKEND_API}/api`, { method: "GET" });
  const data = await req.json();

  const wrapper = document.getElementById("cards");
  wrapper.innerHTML = "";

  const list = [...data]
  for (const it of list) {
    const info = it?.value || {};
    const id = it.key[1] || '';
    const cardContainer = document.createElement("div");

    cardContainer.setAttribute("class", "card");
    cardContainer.innerHTML = `
        <img src="./assets/avatar.png" />
        <div class="info">
          <h4 class="name">${info?.name}</h4>
          <h4>${info?.email}, <span>+${info?.phone}</span></h4>
          <h4>${info?.age} Years, <span>${info?.designation}</span></h4>
          <h4 class="salary">$${info?.salary}</h4>
        </div>
        <div class="delete">
          <button id=${id} data-id="${id}" class="delete-btn">X</button>
        </div>
        `;

    wrapper.appendChild(cardContainer);

    const deleteBtn = document.getElementById(id);
    deleteBtn.addEventListener('click', onDeleteContact);
  }
};

const onFormSubmit = async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const salary = document.getElementById("salary").value;
  const phone = document.getElementById("phone").value;
  const designation = document.getElementById("designation").value;

  const input = {
    name,
    age: Number(age),
    email,
    salary: Number(salary),
    phone,
    designation,
  };

  const res = await fetch(`${BACKEND_API}/api`, {
    body: JSON.stringify(input),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await res.json();
  console.log(resData);

  resetForm();
  loadContacts();
};

const onDeleteContact = async (e) => {
  const dataId = e.target.getAttribute("data-id");
  console.log(dataId);
  await fetch(`${BACKEND_API}/api/${dataId}`, { method: "DELETE" });
  
  await loadContacts();
};

const resetForm = () => {
  const form = document.getElementById("contact-form");
  form.reset();
};
