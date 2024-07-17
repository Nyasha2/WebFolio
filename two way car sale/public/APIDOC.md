# *Nyasha Makaya's Car Sale* API Documentation
*This API stores car data in json files, which it can
fetch from and edit. It also receives edit requests to 
the orders made for the cars, and also, questions and concerns
which it log into their respective json files.*

##Endpoint 1: GET /cars
**Request Type: GET**

**Returned Data Format**: JSON Object

**Description: returns a JSON list with all the car objects stored** 

**Supported Parameters** *None*

**Example Request:** *http://localhost:8000/cars*

**Example Response:**
```json
[
    {
        "Manufacturer": "Acura",
        "Model": "Integra",
        "Sales_in_thousands": 16.919,
        "__year_resale_value": 16.36,
        "Vehicle_type": "Passenger",
        "Price_in_thousands": 21.5,
        "Engine_size": 1.8,
        "Horsepower": 140.0,
        "Wheelbase": 101.2,
        "Width": 67.3,
        "Length": 172.4,
        "Curb_weight": 2.639,
        "Fuel_capacity": 13.2,
        "Fuel_efficiency": 28.0,
        "Latest_Launch": "2/2/2012",
        "Power_perf_factor": 58.28014952
    },
    {
        "Manufacturer": "Acura",
        "Model": "TL",
        "Sales_in_thousands": 39.384,
        "__year_resale_value": 19.875,
        "Vehicle_type": "Passenger",
        "Price_in_thousands": 28.4,
        "Engine_size": 3.2,
        "Horsepower": 225.0,
        "Wheelbase": 108.1,
        "Width": 70.3,
        "Length": 192.9,
        "Curb_weight": 3.517,
        "Fuel_capacity": 17.2,
        "Fuel_efficiency": 25.0,
        "Latest_Launch": "6/3/2011",
        "Power_perf_factor": 91.37077766
    },
    {
        "Manufacturer": "Acura",
        "Model": "CL",
        "Sales_in_thousands": 14.114,
        "__year_resale_value": 18.225,
        "Vehicle_type": "Passenger",
        "Price_in_thousands": 0,
        "Engine_size": 3.2,
        "Horsepower": 225.0,
        "Wheelbase": 106.9,
        "Width": 70.6,
        "Length": 192.0,
        "Curb_weight": 3.47,
        "Fuel_capacity": 17.2,
        "Fuel_efficiency": 26.0,
        "Latest_Launch": "1/4/2012",
        "Power_perf_factor": 0
    }
]
```

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*Incorrect request url - error code 400*
*Error handling example - refresh the page*

##Endpoint 2: GET /cars/:manufacturer/:model
**Request Type: GET**

**Returned Data Format**: JSON Object

**Description: Retrieves a specific car by manufacturer and model.** 

**Supported Parameters** *List any optional/required parameters and defaults*
* /:manufacturer (required)
  * the make/brand of the car
* /:model (required)
  * the model of the car

**Example Request:** *http://localhost:8000/cars/Cadillac/Escalede*

**Example Response:**
```json
[
    {
        "Manufacturer": "Cadillac",
        "Model": "Escalade",
        "Sales_in_thousands": 14.785,
        "__year_resale_value": 0,
        "Vehicle_type": "Car",
        "Price_in_thousands": 46.225,
        "Engine_size": 5.7,
        "Horsepower": 255.0,
        "Wheelbase": 117.5,
        "Width": 77.0,
        "Length": 201.2,
        "Curb_weight": 5.572,
        "Fuel_capacity": 30.0,
        "Fuel_efficiency": 15.0,
        "Latest_Launch": "4/17/2012",
        "Power_perf_factor": 109.5091165
    }
]
```

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*car not found - code 400*
*Error handling example - choose another car brand*

##Endpoint 3: GET /cars/:manufacturer/
**Request Type: GET**

**Returned Data Format**: JSON Object

**Description: Retrieves a specific car by manufacturer.** 

**Supported Parameters** *List any optional/required parameters and defaults*
* /:manufacturer (required)
  * the make/brand of the car


**Example Request:** *http://localhost:8000/cars/Cadillac*

**Example Response:**
```json
[
    {
        "Manufacturer": "Cadillac",
        "Model": "Catera",
        "Sales_in_thousands": 11.185,
        "__year_resale_value": 18.225,
        "Vehicle_type": "Passenger",
        "Price_in_thousands": 31.01,
        "Engine_size": 3.0,
        "Horsepower": 200.0,
        "Wheelbase": 107.4,
        "Width": 70.3,
        "Length": 194.8,
        "Curb_weight": 3.77,

        "Fuel_capacity": 18.0,
        "Fuel_efficiency": 22.0,
        "Latest_Launch": "9/28/2011",
        "Power_perf_factor": 83.48309358
    },
    {
        "Manufacturer": "Cadillac",
        "Model": "Escalade",
        "Sales_in_thousands": 14.785,
        "__year_resale_value": 0,
        "Vehicle_type": "Car",
        "Price_in_thousands": 46.225,
        "Engine_size": 5.7,
        "Horsepower": 255.0,
        "Wheelbase": 117.5,
        "Width": 77.0,
        "Length": 201.2,
        "Curb_weight": 5.572,
        "Fuel_capacity": 30.0,
        "Fuel_efficiency": 15.0,
        "Latest_Launch": "4/17/2012",
        "Power_perf_factor": 109.5091165
    }
]

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*car not found - code 400*
*Error handling example - choose another car brand*

##Endpoint 4: GET /cars-names
**Request Type: GET**

**Returned Data Format**: JSON Object

**Description: Retrieves a list of all car manufacturers.** 

**Supported Parameters** None

**Example Request:** *http://localhost:8000/cars/names**

**Example Response:**
```json
[Chevrolet, Cadillac, BMW]
```

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*Error handling example - refresh the page*

##Endpoint 4: GET /cars-names
**Request Type: GET**

**Returned Data Format**: JSON Object

**Description: Retrieves a list of all car manufacturers.** 

**Supported Parameters** None

**Example Request:** *http://localhost:8000/cars/names**

**Example Response:**
```json
[Chevrolet, Cadillac, BMW]
```

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*Error handling example - refresh the page*


##Endpoint 5: GET /faqs
**Request Type: GET**

**Returned Data Format**: JSON Object

**Description:** Retrieves a list of FAQs.

**Supported Parameters** None

**Example Request:** *http://localhost:8000/faqs**

**Example Response:**
```json
[
    {
        "question": "What documents do I need to bring when purchasing a car?",
        "answer": "You will need to bring a valid driver’s license, proof of insurance, proof of income, and any trade-in documentation if applicable."
    },
    {
        "question": "Do you offer extended warranties?",
        "answer": "Yes, we offer extended warranty plans for additional peace of mind. Please speak to our finance team for more details."
    },
    {
        "question": "Can I buy a car online?",
        "answer": "Yes, you can browse our inventory and purchase a car online. Our team is available to assist you through the entire process."
    }
]
```

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*Error handling example - refresh the page*

##Endpoint 6: POST /message
**Request Type: POSt**

**Returned Data Format**: text

**Description: Submits a message fro a customer** 

**Supported Parameters** *List any optional/required parameters and defaults*
* name (required)
  * name of the person sending the message
* email (required)
  * email of the person sending the message
* message (required)
  * the message to be logged

**Example Request:** *http://localhost:8000/message -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "message": "You suck"}'**

**Example Response:** "SUCCESS!"

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*Error handling example - refresh the page*

##Endpoint 7: POST /order
**Request Type: POST**

**Returned Data Format**: text

**Description: Retrieves a list of all car manufacturers.** 

**Supported Parameters** *List any optional/required parameters and defaults*
* name (required)
  * name of the person sending the message
* email (required)
  * email of the person sending the message
* address (required)
  * the delivery address
* zip (required)
  * the zip code of the customer
* order (required)
  * the list of things being ordered
* credit (required)
  * credit card number


**Example Request:** *http://localhost:8000/order -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "address": "Panapa", "credit": 1001, "zip": 11011}'**

**Example Response:** "SUCCESS!"

**Error Handling:**
*Failure to fetch error: There was a problem with the server - error code 500*
*Error handling example - refresh the page*

