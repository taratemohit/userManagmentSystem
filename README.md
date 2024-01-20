 
 # User Management System

This project is an Angular application for managing users. It includes features such as adding, updating, and deleting users, along with basic validation and styling. The application uses Bootstrap for styling and interacts with a JSON-Server API to fetch and persist user data.

## Setup

### Prerequisites

Ensure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [JSON-Server](https://www.npmjs.com/package/json-server)

- Angular version - version 12.2.18.
- bootstrap version - version 4.6.0.

### Installation

1. Clone the repository:

     
    git clone https://github.com/taratemohit/userManagmentSystem.git
    cd user-management-system
    

2. Install dependencies:

    npm install
     

3. Start JSON-Server to simulate the API:

    json-server --watch db.json
    

4. In a separate terminal, start the Angular application:

    ng serve
     

5. Open your browser and navigate to `http://localhost:4200/` to view the application.

## Modules and Features

### 1. User Module

#### 1.1 User-Upsert Component

- Reactive form with fields: FirstName, LastName, Address, Email, Phone.
- Validation for required fields, email format, and 10-digit phone numbers.
- Save data to the list and perform add or update actions.

#### 1.2 User-List Component

- Display users in a grid with columns: Name, Email, Phone, Action.
- Action column includes Edit and Delete buttons.
- Edit button sends user details to the User-Upsert Component.
- Delete button removes the user from the list.

#### 1.3 Validation

- Check if the user already exists and show an "already exists" message.

#### 1.4 Styling

- Basic styling using Bootstrap for a visually appealing application.

### 2. Additional Point

- User interface for type casting.
- Display users initially using JSON-Server API to fetch user data.

### 3. Data Passing

- Use DataService to pass selected user data between components.

### 4. Editing User

- Verify routing configuration to navigate to the UserUpsertComponent when editing a user.

## Usage

- Use the application to manage user data efficiently.
- Add, edit, and delete users seamlessly.

Feel free to customize the application according to your specific requirements.

# personal details 
- Name : Mohit Tarate
- email : moheetarate@gmail.com 
- Mob : 7709225561