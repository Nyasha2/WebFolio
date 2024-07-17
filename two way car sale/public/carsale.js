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
    const LOCAL_BASE_URL = "http://localhost:" + PORT_NUMBER;
    let CART = [];

    /**
     * This function initializes the operations necessary for the shop
     * view page of the 2 way motor sales. It add event listeners to all the
     * buttons included, and the order submission form. It also runs initMain
     * to initialize the initial page.
     */
    function init() {
        initMain();
        initSearchBar();
        
        qs("#back-to-shop").addEventListener("click", () => {
            toggleView("#cart-view", "#shop-view");
        });

        qs("#place-order").addEventListener("click", () => {
            checkOut();
            toggleView("#cart-view", "#check-out");
        });

        qs("#back-to-cart").addEventListener("click", () => {
            toggleView("#check-out", "#cart-view");
            qs("#order").innerHTML = "";
        });

        qs("#checkout-form").addEventListener("submit", function(event) {
            event.preventDefault();
            placeOrder();
        });

        qs("#cart-img").addEventListener("click", ()=> {
            toggleView("#shop-view", "#cart-view");
            if (qs("#cart-view").className !== "hidden"){
                qs("#cart-img").classList.add("success");
            }
            else {
                qs("#cart-img").classList.remove("success");
            }
        });

        qs("#filter-view button").addEventListener("click", () => {
            qs("#filter-view div").innerHTML = "";
            toggleView("#filter-view", "#shop-view");
        });

        qs("#search").addEventListener("click", viewSelected);
    }

    /**
     * This function displays all the cars on the front page of the
     * shop, with the help of load cars
     */
    function initMain(){
        let url = LOCAL_BASE_URL + "/cars";
        fetch(url)
        .then(checkStatus)
        .then(function(response){
            return response.json();
        })
        .then((response) => {
            loadCars(response, "#shop-view");
        })
        .catch(error => console.log('Error:', error));
    }

    /**
     * This function receives a json file of car data, parse
     * it and display the cars on the front page of the shop view.
     * @param {object} data 
     */
    function loadCars(data, section){
        count = 0;
        for (const car of data) {
            let makeModel = car.Manufacturer + " " + car.Model;
            getCarImageUrl(makeModel)
            .then(imageUrl => {
                if (imageUrl) {
                    let imgContainter = gen("div");

                    let carLabel = gen("p");
                    carLabel.textContent = makeModel;
                    imgContainter.appendChild(carLabel);

                    let carImg = gen("img");
                    carImg.src = imageUrl;
                    carImg.alt = makeModel + " img";
                    imgContainter.appendChild(carImg);

                    imgContainter.classList.add("img-container");
                    imgContainter.addEventListener("click", () =>{
                        let makeModel = imgContainter.children[0].textContent;
                        getCar(makeModel);
                    });
                    qs(section).appendChild(imgContainter);
                } else {
                    console.log('Could not fetch the car image URL.');
                }
            });
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
     * This function receives a car object and display the image
     * and the information of that car in a single view section.
     * @param {object} car 
     */
    function displayCar(car) {
        //add the label
        let makeModel = car.Manufacturer + ' ' + car.Model;

        //add the image
        getCarImageUrl(makeModel)
        .then(imgUrl => {
            viewCar(imgUrl, makeModel, car);
        })
        .catch(error => console.log('Error:', error));
    }

    /**
     * This function displays all the information of a car on
     * a single-view page given the image url of the car
     * @param {string} imgUrl 
     * @param {string} makeModel
     * @param {object} car
     */
    function viewCar(imgSrc, makeModel, car) {
        let imgContainer = gen("div");
        //add the label
        let labelDiv = gen("div");
        labelDiv.classList.add("label");

        let label = gen("h2");
        label.textContent = makeModel;
        labelDiv.appendChild(label);

        let priceTag = gen("h2");
        priceTag.textContent = "$ " + car.Price_in_thousands * 1000;
        labelDiv.appendChild(priceTag);

        imgContainer.appendChild(labelDiv);

        let carImg = gen("img");
        carImg.src = imgSrc;
        carImg.alt = makeModel + "image";
        imgContainer.appendChild(carImg);

        //add the info
        let info = gen("div");
        const details = Object.keys(car);
        details.forEach(detail  => {
            let line = document.createElement("p");
            line.textContent = detail + ":" + car[detail];
            info.appendChild(line);
        });
        info.classList.add("info");
        imgContainer.appendChild(info);

        //add to cart button
        let btnDiv = gen("div");
        let backBtn = gen("button");
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", () => {
            qs("#single-view").removeChild(imgContainer);
            toggleView("#single-view", "#shop-view");
        });
        btnDiv.appendChild(backBtn);

        let addBtn = gen("button");
        addBtn.textContent = "Add To Cart";
        addBtn.addEventListener("click", () => {
            qs("#single-view").removeChild(imgContainer);
            addToCart(imgSrc, makeModel, priceTag.textContent, car);
        });

        btnDiv.appendChild(addBtn);
        imgContainer.appendChild(btnDiv);
        qs("#single-view").appendChild(imgContainer);
        toggleView("#shop-view", "#single-view"); 
    }

    /**
     * Given an image source url, car model, car object and its price
     * this function adds the given car to the cart
     * @param {string} imgSrc 
     * @param {*string} makeModel 
     * @param {*number} price 
     * @param {*object} car 
     */
    function addToCart(imgSrc, makeModel, price, car) {
        let imgContainter = gen("div");
        let label = gen("h2");
        label.textContent = makeModel;
        imgContainter.appendChild(label);

        // car image
        let carImg = gen("img");
        carImg.src = imgSrc;
        carImg.alt = makeModel + "image";
        imgContainter.appendChild(carImg);

        //price tag
        let priceTag = gen("h2");
        priceTag.textContent = price;
        imgContainter.appendChild(priceTag);

        //remove from cart button
        let removeBtn = gen("button");
        removeBtn.textContent = "Remove From Cart";
        removeBtn.addEventListener("click", () => {
            qs("#carted").removeChild(imgContainter);
            CART.pop(car);
        });

        imgContainter.appendChild(removeBtn);
        qs("#carted").appendChild(imgContainter);
        toggleView("#single-view", "#cart-view"); 
        CART.push(car);
    }

    /**
     * This function transitions to the checkout page for the
     * final process before checking the order
     */
    function checkOut(){
        let totalPrice = 0;
        CART.forEach(car => {
            if (car){
                let price = car.Price_in_thousands * 1000;
                totalPrice += price;
                let item = gen("p");
                item.textContent = car.Manufacturer + " " +car.Model + "  :  $" + price;
                qs("#order").appendChild(item);
            }
        });
        let total = gen("h3");
        total.textContent = "Total  :  $" + totalPrice;
        qs("#order").appendChild(total);
    }

    /**
     * This function completes the palce order function by taking
     * all the parameters from the checkout form and logging them
     * to the orders json file, and returning a success or failure message
     */
    function placeOrder(){
        let params = new FormData(qs("#checkout-form"));
        let order = [];
        let orderList = qs("#order");
        let children = Array.from(orderList.children);
        children.forEach(child => {
            let details = child.textContent;
            details = details.split(' ');
            order.push(details[0] + " " + details[1]);
        });

        order.pop();
        params.append("order", order);

        url = LOCAL_BASE_URL + "/order";
        fetch(url, {
            method : "POST",
            body: params
        })
        .then(checkStatus)
        .then(successMessage)
        .catch(error => console.log('Error:', error));
    }

    /**
     * This function displays a success message when an order is
     * successfully made. It also takes the user back to the main
     * shopping page afterwards.
     */
    function successMessage(){
        let msgContainer = gen("div");
        msgContainer.classList.add("success");
        let msg = gen("h3");
        msg.textContent = "Order delivered successfully";
        msgContainer.appendChild(msg);
        qs("#check-out").appendChild(msgContainer);
        setTimeout(() => {
            qs("#check-out").removeChild(msgContainer);
            CART = [];
            qs("#carted").innerHTML = "";
            qs("#checkout-form").reset();
            toggleView("#check-out", "#shop-view");
        }, 2000);
    }

    /**
     * This function gets all car brands or makes, and call
     * loadNames to put those names as a drop down list in the 
     * search bar
     */
    function initSearchBar(){
        url = LOCAL_BASE_URL + "/car-names";
        fetch(url)
        .then(checkStatus)
        .then(function (response) {
            return response.json();
        })
        .then(loadNames)
        .catch(error => console.log('Error:', error));
    }

    /**
     * This function given car names, create HTML elements and add them
     * to the drop down menu on the search bar
     * @param {object} names the list of names of cars
     */
    function loadNames(names) {
        names.forEach(name => {
            let optionTag = document.createElement("option");
            optionTag.value = name;
            optionTag.textContent = name;
            qs("#select").appendChild(optionTag);
        });
    }

    /**
     * This function only displays a selected brand when the
     * search button is clicked.
     */
    function viewSelected(){
        let selector = document.getElementById("select");
        let name = selector.options[selector.selectedIndex].value;
        let url = LOCAL_BASE_URL + `/cars/${name}`;
        fetch(url)
        .then(checkStatus)
        .then(function(response){
            return response.json();
        })
        .then((response) => {
            loadCars(response, "#filter-view div");
        })
        .catch(error => console.log('Error:', error));

        toggleView("#shop-view", "#filter-view");
        console.log("Hey");
    }

    init();
})();