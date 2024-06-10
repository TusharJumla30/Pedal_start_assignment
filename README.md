Setup Backend:
initialize a new Node.js project in server directory using:

npm init -y

Install dependencies like Express and other necessary packages:

npm install express body-parser cors

Nodejs server file here is index.js


How to Running the Application?

1) Ensure the back-end server is running: start server using command:
    node index.js
2) Open index.html in a web browser.
3) You should be able to view the list of tasks, add new tasks, edit existing tasks, and delete tasks.

This setup provides a basic Task Management Application with a front-end built using html css and javascript that communicates with a RESTful back-end built using NodeJs. Adjustments and improvements can be made based on specific requirements and additional features.

This assignment requirements were: Front-end:

Create a user interface for the Task Management Application with the following features:
A landing page displaying a list of tasks.

Ability for users to add new tasks with a title, description, and due date.

Ability for users to view detailed information of each task.

Option to edit existing tasks.

Option to delete tasks.

Responsive design to ensure usability on both desktop and mobile devices.

Use appropriate HTML, CSS, and JavaScript frameworks or libraries to implement the front-end functionalities. Back-end:
Develop a RESTful API to handle CRUD operations for tasks.
Implement endpoints for the following functionalities:
Retrieving all tasks.
Creating a new task.
Retrieving a single task by its ID.
Updating an existing task.
Deleting a task.
Use any server-side technology (Node.js, Python with Django/Flask, Ruby on Rails, etc.) to implement the back-end functionalities.
