const KEY = "students";
const form = document.getElementById("form");
const fields = ["name", "matric", "email", "phone", "age", "department", "password"];
let students = [];
try { students = JSON.parse(localStorage.getItem(KEY)) || []; } catch { students = []; }

const rules = {
  name: v => !v ? "Enter the student's full name."
    : !/^[A-Za-z][A-Za-z.'\- ]{1,}$/.test(v) || v.split(/\s+/).length < 2 ? "Enter first and last name using letters only." : "",
  matric: v => !v ? "Enter the matriculation number."
    : !/^[A-Za-z0-9\/\-]{4,20}$/.test(v) ? "Use 4–20 letters, numbers, / or -."
    : students.some(s => s.matric.toLowerCase() === v.toLowerCase()) ? "This matriculation number is already registered." : "",
  email: v => !v ? "Enter an email address."
    : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Enter a valid email, like name@example.com."
    : students.some(s => s.email.toLowerCase() === v.toLowerCase()) ? "This email address is already registered." : "",
  phone: v => !v ? "Enter a phone number."
    : !/^(\+234|0)[789][01]\d{8}$/.test(v) ? "Use a Nigerian number like 08012345678 or +2348012345678." : "",
  age: v => v === "" ? "Enter the student's age."
    : !/^\d+$/.test(v) ? "Age must be a whole number."
    : +v < 16 || +v > 60 ? "Age must be between 16 and 60." : "",
  department: v => v ? "" : "Select a department.",
  password: v => !v ? "Enter a password."
    : v.length < 8 ? "Password must be at least 8 characters."
    : !/[A-Z]/.test(v) || !/[a-z]/.test(v) || !/\d/.test(v) ? "Include an uppercase letter, a lowercase letter and a number." : ""
};

function val(id) {
  const v = document.getElementById(id).value;
  return id === "password" ? v : v.trim();
}

function check(id) {
  const msg = rules[id](val(id));
  document.getElementById(id + "-error").textContent = msg;
  document.getElementById(id).classList.toggle("invalid", !!msg);
  return !msg;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function render() {
  document.getElementById("total").textContent = students.length;
  document.getElementById("empty").hidden = students.length > 0;
  document.getElementById("rows").innerHTML = students.map((s, i) =>
    `<tr><td>${i + 1}</td><td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.matric)}</td><td>${escapeHtml(s.email)}</td><td>${escapeHtml(s.phone)}</td><td>${s.age}</td><td>${escapeHtml(s.department)}</td></tr>`
  ).join("");
}

fields.forEach(id => document.getElementById(id).addEventListener("blur", () => check(id)));

form.addEventListener("submit", e => {
  e.preventDefault();
  const success = document.getElementById("success");
  success.textContent = "";
  const results = fields.map(check);
  if (results.includes(false)) {
    document.querySelector(".invalid")?.focus();
    return;
  }
  // Password is validated but never stored or displayed in the table.
  students.push({
    name: val("name"), matric: val("matric"), email: val("email"),
    phone: val("phone"), age: +val("age"), department: val("department")
  });
  localStorage.setItem(KEY, JSON.stringify(students));
  form.reset();
  render();
  success.textContent = "Student registered.";
});

render();
