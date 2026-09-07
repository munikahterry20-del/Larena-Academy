/* =========================================================
   LARENA ACADEMY
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     REGISTRATION FORM HANDLER
     ===================================================== */
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      /* Get form input values */
      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const role = document.getElementById("role").value;
      const program = document.getElementById("program").value;

      /* Validate required fields */
      if (!fullName || !phone || !role || !program) {
        showFormMessage(registrationForm, "Please complete all required fields.", "error");
        return;
      }

      /* Phone number validation */
      const phonePattern = /^[0-9+\-\s()]{9,15}$/;
      if (!phonePattern.test(phone)) {
        showFormMessage(registrationForm, "Please enter a valid phone number.", "error");
        return;
      }

      /* Loading state */
      const submitButton = registrationForm.querySelector("button[type='submit']");
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      /* Web App URL from Google Apps Script */
      const scriptURL = "https://script.google.com/macros/s/AKfycbzcupCZsDzHAyLCNZcclvWeCGZQfVxsDmEgjzRBvu1wvBJUMNA3Meytw-rpWkmHl__TPQ/exec";

      /* Post data to Google Sheets */
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
     MESSAGE DISPLAY HELPER
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
