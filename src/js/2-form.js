// Оголоси поза будь - якими функціями об’єкт formData з полями email та message,
// які спочатку мають порожні рядки як значення: { email: "", message: "" }.

// Використовуй метод делегування для відстеження змін у формі через подію
// input.Зберігай актуальні дані з полів email та message у formData та 
// записуй цей об’єкт у локальне сховище.Використовуй ключ
// "feedback-form-state" для зберігання даних у сховищі.
// При завантаженні сторінки перевір, чи є дані у локальному сховищі. 
// Якщо так, використовуй їх для заповнення форми та об'єкта formData. 
// Якщо ні, залиш поля форми порожніми.
// Перед відправленням форми переконайся, що обидва поля форми заповнені. 
// Якщо будь - яке з полів(властивостей об’єкта formData) порожнє,
// показуй сповіщення з текстом «Fill please all fields». 
// Якщо всі поля заповнені, виведи у консоль об’єкт formData з 
// актуальними значеннями, очисти локальне сховище, об’єкт formData і 
// поля форми.

const formData = {
  email: "",
  message: ""
};

const FEEDBACK_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

function onFormSubmit(event) {
  event.preventDefault();
  const trimEmail = formData.email.trim();
  const trimMsg = formData.message.trim();
  if (trimEmail === "" || trimMsg === "") {
    alert("Fill please all fields");
    return;
  }
  console.log({ email: trimEmail, message: trimMsg });
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData)); // Оновлення localStorage після відправки форми
  form.reset();
}

function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
}

form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', onFormInput);
});

form.addEventListener("submit", onFormSubmit);

window.addEventListener("load", () => {
  const savedFormData = JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || {};
  formData.email = savedFormData.email || "";
  formData.message = savedFormData.message || "";
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector("textarea");
  emailInput.value = formData.email;
  messageInput.value = formData.message;
});
