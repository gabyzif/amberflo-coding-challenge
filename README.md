# Front-End Engineer - Take Home Exercise

=======================================

## Objective

---

This web application is built as part of a take-home exercise. It interacts with a set of APIs to manage "meters" within the Amberflo system. The application allows users to view, create, and edit meter entries.

## Technologies Used

---

- HTML, CSS, JavaScript, React
- Optionally uses TypeScript
- Compatible with Desktop Chrome, Firefox, and Safari

## Installation and Running the App

---

To run this application:

1.  Clone the repository:

    bashCopy code

    `git clone git@github.com:gabyzif/amberflo-coding-challenge.git`

2.  Navigate to the project directory:

    bashCopy code

    `cd amberflo-challenge`

3.  Install dependencies:

    bashCopy code

    `npm install`

4.  Start the application:

    bashCopy code

    `npm start`

    This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in your browser.

## Features

- Landing Page: Displays a table of all available meters with attributes such as `display_name`, `api_name`, `active`, `used_for_billing`, and `type`. The table allows sorting by any column in either ascending or descending order.
- Create a New Meter: Users can create new meters, which are then displayed on the landing page table.
- Meter Details Page: Users can view details of each meter by clicking on a row in the landing page table. They can edit these details with the exception of the initial meters, which are read-only. Edit functionality is disabled based on the date of creation of the entries to maintain integrity.
- Error Handling: The application includes error handling for various operations to enhance user experience.

## API Endpoints

The application interacts with the following API endpoints:

- GET `https://take-home-exercise-api.herokuapp.com/meters`: Fetches an array of meters.
- POST `https://take-home-exercise-api.herokuapp.com/meters`: Creates a meter.
- PUT `https://take-home-exercise-api.herokuapp.com/meters/:id`: Updates a meter.
- DELETE `https://take-home-exercise-api.herokuapp.com/meters/:id`: Deletes a meter.

Note: Use a "Content-Type" header value of "application/json" when making these requests.

## Additional Notes

- This project is completed within the constraints of the provided requirements and time frame.
- The application's design and implementation are kept simple and user-friendly, focusing on functionality.

---
