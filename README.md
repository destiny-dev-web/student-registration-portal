# Student Registration and Admission Portal

A simple web portal for registering students and viewing everyone who has been registered. Built with HTML, CSS and vanilla JavaScript.

## Features

- Validates name, matriculation number, email, phone number, age, department and password
- Prevents duplicate matriculation numbers and email addresses
- Shows registered students in a table
- Shows the total number of registered students
- Displays clear error messages beside the input that needs fixing

## Validation rules

| Field | Rule |
|---|---|
| Name | First and last name, letters only |
| Matric number | 4–20 characters (letters, numbers, `/` or `-`), must be unique |
| Email | Valid email format, must be unique |
| Phone | Nigerian number, e.g. `08012345678` or `+2348012345678` |
| Age | Whole number from 16 to 60 |
| Department | Must be selected from the list |
| Password | At least 8 characters with an uppercase letter, a lowercase letter and a number |

## How to run

1. Download or clone this repository.
2. Open `index.html` in any browser.

No installation or build step is needed.

## Notes

- Student records are saved in the browser's `localStorage`, so they remain after a page refresh but are specific to one browser.
- Passwords are validated but never stored or displayed.

## Live demo

Add your GitHub Pages link here after publishing.

## Author

Sunday Destiny Bassey
