/* Name: Nyasha Makaya
 * CS 132 Final Project
 *
 * This file contains all the global utility functions
 * that are used by more than one of the pages in the 
 * 2 way car sale website.
 */

//The API for the car imagery API where car images are gotten from
const API_BASE_URL = "http://www.carimagery.com/api.asmx/GetImageUrl";

/**
 * Returns the first element that matches the given CSS selector.
 * @param {string} selector - CSS query selector string.
 * @returns {object} first element matching the selector in the DOM tree
 * (null if none)
 */
function qs(selector) {
    return document.querySelector(selector);
}

/**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} selector - CSS query selector
 * @returns {object[]} array of DOM objects matching the query (empty if none).
 */
function qsa(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Returns a new element with the given tagName
 * @param {string} tagName - name of element to create and return
 * @returns {object} new DOM element with the given tagName (null if none)
 */
function gen(tagName) {
    return document.createElement(tagName);
}

/**
     * Helper function to return the Response data if successful, otherwise
     * returns an Error that needs to be caught.
     * @param {object} response - response with status to check for success/error.
     * @returns {object} - The Response object if successful, otherwise an Error that
     * needs to be caught.
     */
function checkStatus(response) {
    if (!response.ok) { // response.status >= 200 && response.status < 300
        throw Error(`Error in request: ${response.statusText}`);
    } // else, we got a response back with a good status code (e.g. 200)
    return response; // A resolved Response object.
}

/**
* This function changes the views between the view1 and
* view2 by changing one of the view's classes to hidden, 
* and removing the hidden class from the other view.
* @param {string} view1
* @param {string} view2
*/
function toggleView(view1, view2) {
    firstView = qs(view1);
    secondView = qs(view2);
    
    if (firstView.className === "hidden"){
        firstView.classList.remove("hidden");
        secondView.classList.add("hidden");
    }
    else{
        firstView.classList.add("hidden");
        secondView.classList.remove("hidden"); 
    }
}

/**
     * This function fetches the information about a car given 
     * its make and model (i.e makeModel)
     * @param {string} make
     * @param {string} model
     */
function getCar(makeModel) {
    let params = makeModel.split(" ");
    let make = params[0];
    let model = params[1];
    let url = LOCAL_BASE_URL + `/cars/${make}/${model}`;
    fetch(url)
    .then(checkStatus)
    .then(function (response) {
        return response.json();
    })
    .then(displayCar)
    .catch(error => console.log('Error:', error));
}

/**
 * This function fetches an image of a car from the imagery
 * API given its make and Model 
 * @param {string} makeModel 
 * @returns a car image url
 */
async function getCarImageUrl(makeModel) {
    const url = `${API_BASE_URL}?searchTerm=${encodeURIComponent(makeModel)}`;
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const textResponse = await response.text();
        // Extract the URL from the XML response : From Car Imagery API Documentation
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textResponse, 'text/xml');
        const imageUrl = xmlDoc.getElementsByTagName('string')[0].textContent;
        return imageUrl;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
}