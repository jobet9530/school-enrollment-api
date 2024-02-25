const sqlite3 = require("sqlite3").verbose();

try {
  const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  });

  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            userType TEXT NOT NULL
        )
    `);
  db.run(`
        CREATE TABLE IF NOT EXISTS students(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            middleName TEXT,
            address TEXT NOT NULL,
            birthDate DATETIME,
            age INTEGER,
            gender TEXT NOT NULL,
            course INTEGER NOT NULL,
            email TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            parentName TEXT NOT NULL,
            parentEmail TEXT NOT NULL,
            emergencyContact TEXT,
            FOREIGN KEY(course) REFERENCES courses(id)
        )`);
  db.run(`
       CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        courseName TEXT NOT NULL,
        courseCode TEXT NOT NULL
  )`);

  db.run(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subjectName TEXT NOT NULL,
        subjectCode TEXT NOT NULL,
        course INTEGER,
        credits INTEGER,
        FOREIGN KEY(course) REFERENCES courses(id)
      )
  `);
  db.run(`
      CREATE TABLE IF NOT EXISTS marks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student INTEGER,
        subject INTEGER,
        mark INTEGER,
        FOREIGN KEY(student) REFERENCES students(id) 
      )
  `);
  module.exports = db;
} catch (err) {
  console.error(err);
}
