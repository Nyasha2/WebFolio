/* Name: Nyasha Makaya
 * CS 132 Final Project
 *
 * Overview: This file contains javascript code for the 
 * home page of the Two way car sale. It's main purpose is
 * to implement functions that allow car images to be displayed
 * and animated.
 */

(function () {
    "use script";

    const SCREEN_SAVERS = ["Chevrolet Camaro", "Cadillac Escalade", "Nissan Altima" ,"Dodge Ram Pickup"];
    const IMG_SRCS = [ 
        "http://www.regcheck.org.uk/image.aspx/@Tmlzc2FuIEFsdGltYQ==", 
        "http://www.regcheck.org.uk/image.aspx/@Q2hldnJvbGV0IENhbWFybw==",
        "http://www.regcheck.org.uk/image.aspx/@Q2FkaWxsYWMgRXNjYWxhZGU=",
        "http://www.regcheck.org.uk/image.aspx/@RG9kZ2UgUmFtIFBpY2t1cA==",
        "imgs/car.png" 
    ];
    //Img source: https://pngtree.com/element/down?id=MTQ1MDU1MDI%3D&type=1&time=1716440896&token=NjJjNjJhZjlmYTAxYmZhY2YxMDcwMWJjOGQ0MmUyYjU%3D&t=0
    //Img source: Car Imagery API: https://www.regcheck.org.uk/image/aspx


    let CARS = [];
    let CUR_IDX = 0;

    /**
     * This function initializes the resources of the home page by 
     * Adding an event listener to the main section to initiate the
     * slide slow of display images
     */
    function init() {
        createCars();
        display();
        qs("#main-view").addEventListener("mouseover", startSlide);
    }

    /**
     * This function initiates the slide show of display images on the
     * main home page. It also removes the event listener from the main page
     */
    function startSlide(){
        qs("#main-view").removeEventListener("mouseover", startSlide);
        setInterval(changeSlide, 3000);
    }

    /**
     * This function create car objects from the image source
     * url stored in the IMG_SRCS list
     */
    function createCars() {
        IMG_SRCS.forEach(imgSrc => {
            let img = gen("img");
            img.src = imgSrc;
            img.alt = "display image";
            CARS.push(img);
        });
    }

    /**
     * This function inialize the main page by displaying the
     * first car of the display list
     */
    function display() {
        qs("#main-view").appendChild(CARS[0]);
    }

    /**
     * This function changes the slide to another car after some time
     * by changing the main section content from one image to another
     */
    function changeSlide() {
        let nextIdx = CUR_IDX + 1;
        if (nextIdx >= CARS.length) {
            nextIdx = 0;
        }
        qs("#main-view").innerHTML = "";
        qs("#main-view").appendChild(CARS[nextIdx]);
        CUR_IDX = nextIdx;
    }
 
    init();
})();