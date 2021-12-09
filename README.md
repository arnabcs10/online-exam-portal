# Online Exam Portal

 <p align="center">
	 <img src="preview/ss_webportal.png"></img>
 </p>

## Description
The  Exam Portal is easy to use, full-featured, intuitive and user friendly site. It allows examiners to create different tests and question sets for registered students. Exam Portal provides complete functionality of judging and assessing student's performance skills. The Exam Portal comprises Question Sets effectively blended with a whole set of features. Using different features of the Exam portal, an examiner can create a class, add class details, can register selected students, add multiple tests, select a particular test and assign different questions to it. Exam Portal also provides plagiarism detection and automated online evaluation of questions.

Some notable features of Exam Portal:
- Exam Portal provides a complete web site solution, including member registration, creating tests, storing of results.
- The online examination system can automatically add the marks allocated in each question to determine the total mark for the test. It can also automatically calculate the total number of questions added.
- Using Exam Portal, an examiner can add multiple students to a particular class along with their details through a spreadsheet where already registered students will not be added to avoid duplicate entries.
- In case of network issues, answers to already attempted questions will be automatically saved and upon relogging, the student can resume the test where they left off.
- Upon completion of the allocated time, the recorded answers will be automatically submitted. 
- In case of time-bound examinations, students will not be allowed to attempt it before the start time or after the expiry time.
- Examiners can create an objective or a subjective type examination or a combination of both.
- Exam Portal provides the unique feature of plagiarism detection within the answers along with automated online evaluation of questions.


## Getting Started

### Dependencies

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), managed states with Redux, Bootstrap themes for styling.
* Backend framework - Express
* Database - MongoDB
* Authentication - JWT

### Installing

* Fork and clone this repository in your system
* Go to the required directory and run 
```
git clone https://github.com/arnabcs10/online-exam-portal.git
```

### Executing program
Follow the instructions to get started with the project on your local machine 🚀

* In your terminal run `cd online-exam-portal/`
* Run `npm install` to install all required dependencies.

#### Backend
* Add your `.env` file and put following variables.
```
NODE_ENV = development
PORT = 5000
MONGO_URI = YOUR_MONGO_URI
JWT_SECRET = YOUR_SECRET
```
* Run `npm run server` to start the backend server.
* Goto `http://localhost:5000/` to see : `API is running...`

### Frontend
* In your terminal run `cd frontend/`
* Run `npm install` to install all required frontend dependencies.
* Run `npm start` to start the project.
* Goto `http://localhost:3000/` 

## Authors

@arnabcs10

## Version History

* 0.1
    * First Release.

