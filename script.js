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

    const registrationForm =
        document.getElementById("registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            /* Get form values */
            const fullName =
                document.getElementById("fullName").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const role =
                document.getElementById("role").value;

            const program =
                document.getElementById("program").value;


            /* Validate fields */

            if (!fullName || !phone || !role || !program) {

                showFormMessage(
                    registrationForm,
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            /* Basic phone validation */

            const phonePattern =
                /^[0-9+\-\s()]{9,15}$/;

            if (!phonePattern.test(phone)) {

                showFormMessage(
                    registrationForm,
                    "Please enter a valid phone number.",
                    "error"
                );

                return;
            }


            /* Show loading state */

            const submitButton =
                registrationForm.querySelector(
                    ".btn-submit"
                );

            const originalText =
                submitButton.textContent;

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";


            /* Simulate submission */

            setTimeout(function () {

                showFormMessage(
                    registrationForm,
                    "Registration submitted successfully! Larena Academy will contact you soon.",
                    "success"
                );


                /* Reset form */

                registrationForm.reset();


                /* Restore button */

                submitButton.disabled = false;

                submitButton.textContent =
                    originalText;

            }, 1000);

        });

    }


    /* =====================================================
       3. SPONSOR / PARTNER FORM
       ===================================================== */

    const sponsorForm =
        document.getElementById("sponsorForm");

    if (sponsorForm) {

        sponsorForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /* Get form values */

            const organization =
                document.getElementById(
                    "organization"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const partnership =
                document.getElementById(
                    "partnership"
                ).value;

            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            /* Validate required fields */

            if (
                !organization ||
                !email ||
                !partnership
            ) {

                showFormMessage(
                    sponsorForm,
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showFormMessage(
                    sponsorForm,
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            /* Show loading state */

            const submitButton =
                sponsorForm.querySelector(
                    ".btn-submit"
                );

            const originalText =
                submitButton.textContent;

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";


            /* Simulate submission */

            setTimeout(function () {

                showFormMessage(
                    sponsorForm,
                    "Thank you for your interest in partnering with Larena Academy. We will contact you soon.",
                    "success"
                );


                /* Reset form */

                sponsorForm.reset();


                /* Restore button */

                submitButton.disabled = false;

                submitButton.textContent =
                    originalText;

            }, 1000);

        });

    }


    /* =====================================================
       4. FORM MESSAGE FUNCTION
       ===================================================== */

    function showFormMessage(form, message, type) {

        /* Remove existing message */

        const existingMessage =
            form.querySelector(".form-success");

        if (existingMessage) {
            existingMessage.remove();
        }


        /* Create message */

        const messageElement =
            document.createElement("div");

        messageElement.classList.add(
            "form-success"
        );


        /* Error styling */

        if (type === "error") {

            messageElement.style.backgroundColor =
                "#FEE2E2";

            messageElement.style.color =
                "#991B1B";

            messageElement.style.borderColor =
                "#FCA5A5";
        }


        /* Success styling */

        else {

            messageElement.style.backgroundColor =
                "#DCFCE7";

            messageElement.style.color =
                "#166534";

            messageElement.style.borderColor =
                "#86EFAC";
        }


        messageElement.textContent =
            message;


        /* Add message after form */

        form.appendChild(messageElement);


        /* Scroll message into view */

        messageElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });


        /* Automatically remove after 6 seconds */

        setTimeout(function () {

            if (messageElement) {
                messageElement.remove();
            }

        }, 6000);

    }


    /* =====================================================
       5. SMOOTH SCROLLING FOR NAVIGATION LINKS
       ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            /* Ignore empty "#" links */

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       6. PACKAGE CARD HOVER EFFECT
       ===================================================== */

    const packageCards =
        document.querySelectorAll(
            ".package-card"
        );

    packageCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.style.transform =
                    "translateY(-8px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.style.transform =
                    "translateY(-5px)";

            }
        );

    });


    /* =====================================================
       7. SERVICE CARD INTERACTION
       ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );

    serviceCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {

                this.style.borderTopColor =
                    "#F2B705";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                this.style.borderTopColor =
                    "#0B1B3D";

            }
        );

    });


    /* =====================================================
       8. CURRENT YEAR IN FOOTER
       ===================================================== */

    const footerText =
        document.querySelector(
            ".footer-bottom p"
        );

    if (footerText) {

        const currentYear =
            new Date().getFullYear();

        footerText.innerHTML =
            `&copy; ${currentYear} Larena Academy. Your future starts with learning today.`;

    }


    /* =====================================================
       9. PHONE NUMBER FORMATTING
       ===================================================== */

    const phoneInput =
        document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                /* Remove unwanted characters */

                this.value =
                    this.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       10. PREVENT MULTIPLE CLICKS ON BUTTONS
       ===================================================== */

    const submitButtons =
        document.querySelectorAll(
            ".btn-submit"
        );

    submitButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    this.disabled
                ) {
                    return;
                }

            }
        );

    });

});