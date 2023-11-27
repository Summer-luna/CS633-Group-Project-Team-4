# ClassGuardian 

ClassGuardian is a class attendance tracker. It allows institution instructors to take class attendance, manage multiple courses, and generate attendance reports.

## Features
![image](https://github.com/Summer-luna/ClassGuardian/assets/79678727/9e90a472-fe8f-4472-8142-18fe03206e6e) ![image](https://github.com/Summer-luna/ClassGuardian/assets/79678727/1264720a-1dc5-44d4-83ad-a3bb022de1f5) ![image](https://github.com/Summer-luna/ClassGuardian/assets/79678727/3a10208c-e85a-4eab-8c03-e0a03eb103bc) ![image](https://github.com/Summer-luna/ClassGuardian/assets/79678727/d60087e7-e928-40be-b591-63d015ec491d)

## How It Works

1. The instructor creates an account with ClassGuardian
2. The instructor enters his personal information: Name, Institution employed by
3. The instructor adds a new class to his dashboard, and provides detailed information about the class
4. The instructor shares with the class a special code for each student to join the class. Once the students enter the code they will be automatically added to the class roster
5. In the class roster page, the instructor can: Remove students, Take attendance, View attendance for a certain date, or download an attendance report
6. Attendance is taken by sending a computer generated code to all students registered in the class. The student then enters the attendance code and is marked as pesent on the attendace list. If the student fails to enter the code, the student will be marked as absent.

### Student Accounts

If an instructor is using ClassGuardian to track their class attendance, his students must create an "Student" ClassGuardian account in order to be able to join the class roster and justify their attendance via entering an attendace code.

1. The student creates a Student account with ClassGuardian
2. The student enters his personal information: Name, Student ID, Email
3. The student joins a class from his dashboard by entering a join code provided by the instructor. Once joined, the student will automatically be placed in the instructor's class roster.
4. In the class page, the student can: view information about the course, drop the course, or attend the class by entering a computer generated code sent by the instructor.
5. If a student drops a course he will be removed from the instructor's class roster.

## Usage

To get started with ClassGuardian, the hosted version of the product can be used. You can get started immediately at ([https://classguardian-client.xinyuechen.online/](https://classguardian-client.xinyuechen.online/)) 

## Development

Alternatively, instead of using the hosted version of the product, ClassGuardian can be run locally for code generation purposes or contributions.

### Pre-requisites
To be able to start development on ClassGuardian, make sure that you have the following prerequisites installed:

* Install posgresql
* Create database in postgresql called classguardian
* Create a `.env` file in server folder AND using your own database url to replace one in the “.env” file
* Switch to CS633-Group-Project-Team-4/packages/server folder
* Run `npm i` to install all packages
* Run `npm run migrate:dev` command
* Run `npm run prisma:seed` command
* Run `npm run start:dev` to run the application - localhost:3000

## API's

| API Name | API Method | Description | Inputs |
| -------- | ---------- | ----------- | ------ |
| /auth/signup | POST | Able to sign up user | email: String, password: String, lastName: String, firstName String, buId: String, role: Number |
| /auth/login | POST | Able to sign in | email: String, password: String |
| /user/:id | GET | Get user by id with course information | |
| /student/enroll | POST | Student able to enter join code to add the course | studentID: String, joinCode: String |
| /student/drop | POST | Student able to drop the course | courseId: String, userId: String | 
| /student/checkAttendance | POST | Check if an record in today is exists in database | classId: String, userId: String |
| /student/takeAttendance | POST | Insert an attendance record | classId: String, userId: String, attendanceCode: String |
| /instructor/course/add | POST | Professor add course and associate course to his account | userId: String, name: String, description: String, location: String, semesterId: number, startDate: date, endDate: date |
| /instructor/course/:id | GET | Get course detail by id with related students | id: String |
| /instructor/course/delete | DELETE | Professor delete the course | userId: String, courseId: String |
| /instructor/attendance/update | PUT | Update attendance code | classId: String, attendanceCode: String |
| /instructor/attendance/markAbsence | POST | Mark absence who fails to attend | id: String |
| /instructor/attendance/report | POST | Get attendances by date range | classId: String, startDate: date, endDate: date |
| /instructor/attendance/report/update | PUT | Update attendance type | id: String, attendanceType: number |

## Contributing

ClassGuardian is an open-source project. We are committed to a fully transparent development process and highly appreciate any contributions. Whether you are helping us fix bugs, proposing new features, improving our documentation or spreading the word.

* Bug Report: If you see an error message or encounter an issue while using ClassGuardian, please create a Bug Report
* Feature Request: If you have an idea or if there is a capability that is missing and would make development easier and more robust, please submit a feature request
* Documentation Request: If you're reading the ClassGuardian docs and feel like you're missing something, please submit a documentation request


