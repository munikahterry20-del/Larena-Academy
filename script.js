/* =========================================================
   LARENA ACADEMY
   Main JavaScript
   ========================================================= */

/* =========================================================
   1. WAIT FOR THE PAGE TO LOAD
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     2. LEARNER / PARENT REGISTRATION FORM
     ===================================================== */
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      /* Get form values */
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const role = document.getElementById("role").value;
      const program = document.getElementById("program").value;

      /* Validate fields */
      if (!fullName || !phone || !role || !program) {
        showFormMessage(registrationForm, "Please complete all required fields.", "error");
        return;
      }

      /* Basic phone validation */
      const phonePattern = /^[0-9+\-\s()]{9,15}$/;
      if (!phonePattern.test(phone)) {
        showFormMessage(registrationForm, "Please enter a valid phone number.", "error");
        return;
      }

      /* Disable button while submitting */
      const submitButton = registrationForm.querySelector("button[type='submit']");
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      /* Google Apps Script Web App URL */
      const scriptURL = "https://script.google.com/macros/s/AKfycbzcupCZsDzHAyLCNZcclvWeCGZQfVxsDmEgjzRBvu1wvBJUMNA3Meytw-rpWkmHl__TPQ/exec";

      /* Submit data to Google Sheets */
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          phone: phone,
          role: role,
          program: program
        })
      })
      .then(() => {
        showFormMessage(registrationForm, "Registration submitted successfully!", "success");
        registrationForm.reset();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        showFormMessage(registrationForm, "Something went wrong. Please try again.", "error");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
    });
  }

  /* =====================================================
     3. HELPER FUNCTION TO DISPLAY MESSAGES
     ===================================================== */
  function showFormMessage(formElement, message, type) {
    let messageContainer = formElement.querySelector(".form-message");

    if (!messageContainer) {
      messageContainer = document.createElement("div");
      messageContainer.className = "form-message";
      formElement.appendChild(messageContainer);
    }

    messageContainer.textContent = message;
    messageContainer.style.marginTop = "15px";
    messageContainer.style.padding = "10px";
    messageContainer.style.borderRadius = "5px";
    messageContainer.style.fontWeight = "bold";

    if (type === "error") {
      messageContainer.style.backgroundColor = "#f8d7da";
      messageContainer.style.color = "#721c24";
    } else {
      messageContainer.style.backgroundColor = "#d4edda";
      messageContainer.style.color = "#155724";
    }
  }

});
