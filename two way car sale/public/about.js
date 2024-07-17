/* Name: Nyasha Makaya
 * CS 132 Final Project
 *
 * Overview: This file contains javascript code for the 
 * Two way car sal website. It contains functionality required
 * To access, fetch and display image data, car information, and
 * also place orders and add things into the cart
 */

(function () {
    "use script";
    const PORT_NUMBER = 8000;
    const BASE_URL = "http://localhost:" + PORT_NUMBER;
    const SUCCESS = "Message Submitted Successfully";
    const FAQS = "Frequently Asked Questions";

    /**
     * This function initializes the js functions for the about page,
     * including adding event listeners to the message input form, the 
     * FAQs button
     */
    function init(){
        qs("#input-form").addEventListener("submit", function(event) {
            event.preventDefault();
            submitMessage();
        });

        qs("#faq-btn").addEventListener("click", () => {
            if (qs("#faqs").innerHTML === ""){
                viewFaqs();
            }
            toggleView("#message-view", "#faqs");
        });
    }

    /**
     * This function log a delivered message into the messages
     * json file when a user clicks submit.
     */
    function submitMessage(){
        const params = new FormData(qs("#input-form"));
        url = BASE_URL + "/message";
        fetch(url, {
            method : "POST",
            body: params
        })
        .then(checkStatus)
        .then(successMessage)
        .catch(error => console.log('Error:', error));
    }

    /**
     * This is the message displayed on the screen when a
     * message has been successfully received and logged into
     * the json file.
     */
    function successMessage(){
        let msgContainer = gen("div");
        msgContainer.classList.add("success");
        let msg = gen("h3");
        msg.textContent = SUCCESS;
        msgContainer.appendChild(msg);
        qs("#message-view").appendChild(msgContainer);
        setTimeout(() => {
            qs("#message-view").removeChild(msgContainer);
            qs("#input-form").reset();
        }, 2000);
    }

    /**
     * This function fetches FAQs from the json file they are stored
     * in and passes them to the displayFAQs function.
     */
    function viewFaqs(){
        url = BASE_URL + "/faqs";
        fetch(url)
        .then(checkStatus)
        .then(function(response) {
            return response.json();
        })
        .then(displayFaqs)
        .catch(error => console.log('Error:', error));
    }

    /**
     * This function receives all the faqs as a json object
     * and displays them on the screen
     * @param {object} data 
     */
    function displayFaqs(data){
        let heading = gen("h2");
        heading.textContent = FAQS;
        qs("#faqs").appendChild(heading);

        data.forEach(questionItem => {
            let qnContainer = gen("div");
            let qn = gen("h3");
            qn.textContent = questionItem.question;
            qnContainer.appendChild(qn);

            let ans = gen("p");
            ans.textContent = questionItem.answer;
            qnContainer.appendChild(ans);
            qs("#faqs").appendChild(qnContainer);
        });

        let backBtn = gen("button");
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", () => {
            toggleView("#faqs", "#message-view");
            qs("#faqs").innerHTML = "";
        });
        qs("#faqs").appendChild(backBtn);
    }

    init();
})();