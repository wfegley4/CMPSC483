# CMPSC483 Dashboard Tweaking Project
Welcome to the github containing the files for our capstone project! 

## Dependencies Setup
To run this project, you will need to install the following: nodeJS and mySQL. 


1. Download NodeJS https://nodejs.org/en/
<img width="837" alt="image" src="https://user-images.githubusercontent.com/77926643/194165977-77d5784f-f89a-4eee-be32-ab7f65c0429a.png">

2. Download mySQL at https://dev.mysql.com/downloads/installer/ 
If you're on MacOS, you can download the mySQL workbench from https://dev.mysql.com/downloads/workbench/ and select MacOS as your operating system. 
- Make sure you select "Legacy Password" instead of the recommended password
- Leaving the username as "root" is okay. 

## Project Setup

1. (Git) pull the repository https://github.com/jiwoongjeon/CMPSC483
<img width="370" alt="image" src="https://user-images.githubusercontent.com/77926643/194166082-51357446-e298-42b4-9aff-d055d1bf026e.png">

2. (Terminal) At the directory, cd until you see the pacakge.json, and at the directory, run `npm install`
<img width="422" alt="image" src="https://user-images.githubusercontent.com/77926643/194167178-540ef447-f4ad-4053-bd34-8c38d7524f96.png">

3. Navigate to the /backend folder. Add the following .csv files, named exactly as shown below. (Eventually, there would be an easier way to add .csv files.) These files contain our csv data. 
- projectsFinal.csv
- studentAssignments.csv
- Students Without Prefs.csv
- studentsFinal.csv

4. In the backend folder, create a .env file with the following content. These environment variables will be used to configure your mySQL database.
`USERNAME=your MySQL Username` 
`PASSWORD= your database password`
`DATABASE_NAME= capstone`

5. (Terminal) Navigate to /backend folder and run `node builddb.js` 
- This command only needs to be run when the database needs to be build or rebuilt. 
- If you use this to rebuild, you'll need to go into mySQL and drop the schema so that it doesn't create duplicate entries. (Further development needed so that it does not create duplicates.)
- If it fails the first time, run the command again. For some reason, it needs to be run twice
- You should see a stream of output with messages as the queries are executed.
6. In the same directory, run `node server.js` to start the server.
- You should see:
`Server is running`
`Connected to MySQL!`
`Listening on 8081 `
7. In a new and separate terminal (keep the server one running), navigate back to the home directory and run `npm start` to start the site. 
- A web browser should pop up at "localhost:3000"

4.  run the program by `npm start`

###Summary
You should have two terminals open. One with `node server.js` and `npm start`


## Future Work and Development
Hi there! If you're reading this as a future (as of Fall 2022) capstone student looking to improve upon our project, here are some areas to build of. It will also make more sense as you understand the project. 
1. Add an area to the site where users can upload their own csv files instead of manually sticking them in the backend folder. 
2. Make the website externally hosted (instead of locally hosted) so that users do not have to pull the github to view the site. This will also make it easier for all your team members and sponsor to view and monitor progress.
3. Integrate student preferences into the tables to improve recommendations on what teams we can swap students to. Ideally, each individual student would have a different, "personallized" suggestion on a team that they could move to. 
4. Add more functionality to the pages such as an 'Undo" button.
5.  Clean up the front end files and use nicer data structures instead of having really cluttered pages. Delete files that are not being used. 
6. Play around with the website and make notes of bugs or other areas of improvments frrom a user standpoint. 

The codebase will seem very confusing at first, so take the time to look through the files and really understand what is going on. If you decide to start coding from scratch, use what we have as a point of reference and a guide. You will save a lot of time doing so! Do not underestimate this project, and ESPECIALLY do not leave it until the last few weeks. Best of luck! 
