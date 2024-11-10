# VitalConnect instruction guide
Vital Connect is a blood bank locator website that helps users find available blood across various regions in India. Built for easy access and management of blood availability, the website features location-based search functionality and an Admin Panel for updating blood data. This project was developed for a hackathon and aims to simplify blood donation and availability tracking.

Features:-

1.  Blood Search, Location-Based Search: Users can search for available blood in their area by selecting a State. Based on the state selection, the District options automatically update, making it easy to refine the search.

How It Works:
Choose a State from the dropdown.
Select the desired District from the dynamically updated list.
This allows users to quickly find blood availability information by location.

use of admin page:

ID:672b6b97d5410b8612ea4871, 672b6b97d5410b8612ea4872, 672b6b97d5410b8612ea4873

password: securePass







2. Admin Access Secure Admin Login: Only authorized personnel can access the Admin Panel to manage blood data.
Login Requirements: Admins need a password and the organization’s unique Object ID (stored in MongoDB) to log in.

Admin Panel Access: This panel can only be accessed from the Home Page for security purposes.

3. Admin Panel Features Blood Inventory Management: Authorized admins can update the blood data as needed.

Updating Blood Data: Once logged in, admins can see the current blood inventory by clicking a green button in the panel. Pressing the button allows them to update the blood data in real-time.

4. About Us Page Blood Information & FAQs: Users can view blood-related information and frequently asked questions to better understand the importance of blood donation.

5. Donate Section (Under Development) This section is currently under development and will provide users an option to

Technologies Used :-

Frontend: HTML, CSS, EJS

Backend: Node.js, Express.js 

Database & Dependencies: MongoDB Atlas, Mongoose ,Axios, CORS ,Nodemon, MongoDB Driver

Installation :-

Clone the Repository:

bash

Copy code git clone https://github.com/yourusername/vital-connect.git

Install Dependencies:
bash
, Copy code, npm install

Set Up Environment Variables: Create a .env file and add your MongoDB Atlas connection URI and other necessary environment variables.

Run the Application: 
bash
Copy code
npm start
Usage Guide

Blood Search: 
Navigate to the homepage and use the Blood Search option in the navigation bar to select your location and find blood availability.

Admin Login: 
Use the Home Page to access the Admin Panel. Enter the password and Object ID to manage blood data.

About Us: 
Visit the About Us page for blood information and FAQs.

Contributing:
We welcome contributions! Please fork the repository, make changes, and submit a pull request.

License:
This project is licensed under the MIT License.

Vital Connect is an essential tool for locating and managing blood resources, bringing life-saving information to communities across India. Thank you for using and supporting our project!

This README.md provides clear instructions and details about your project for new users and developers alike. Let me know if you'd like further customization!


ID:672b6b97d5410b8612ea4871,
672b6b97d5410b8612ea4872,
672b6b97d5410b8612ea4873

password:
securePass


User
 |
 | Clicks 'Admin Access' or submits search form
 V
Frontend (HTML/EJS)
 |
 | Sends request to
 V
Backend (Express Server)
 |
 | Queries MongoDB Atlas
 V
MongoDB Atlas Database
 |
 | Returns data with ID/ObjectID
 V
Backend (Express Server)
 |
 | Sends response to
 V
Frontend (HTML/EJS)
 |
 | Displays data with IDs
 V
User views updated information
