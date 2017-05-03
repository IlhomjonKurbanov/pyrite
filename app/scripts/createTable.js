// createTables.js
// ===============
// script for creating all the database tables supporting this application
// USAGE: 'node createTable.js [tableName]' (if tableName is 'all', creates all)


var db = require('../db');
var tableName = process.argv[2];

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit();
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

// Subjects Table
if (tableName == 'Subjects' || tableName == 'all') {
    db.get().query('CREATE TABLE Subjects(SubjectID INT NOT NULL AUTO_INCREMENT, ArticleOrder VARCHAR(255), Age INT, Field1 VARCHAR(255), Field2 VARCHAR(255), Field3 VARCHAR(255), Gender VARCHAR(255), DateConsented VARCHAR(255), PRIMARY KEY (SubjectID)) ENGINE = INNODB',
        function(err, result) {
            if (err) {
                console.log('Error creating Subjects table: ' + err);
                if (tableName != 'all') process.exit();
            }
            console.log('Subjects table created.');
            if (tableName != 'all') process.exit();
        });
}

// Article Responses Table
if (tableName == 'ArticleResponses' || tableName == 'all') {
    db.get().query('CREATE TABLE ArticleResponses(SubjectID INT NOT NULL, Trial INT, ArticleID INT, Likert INT, PageTime INT, SpontaneousResponseCount INT, ThumbsUpCount INT) ENGINE = INNODB',
        function(err, result) {
            if (err) {
                console.log('Error creating ArticleResponses table: ' + err);
                if (tableName != 'all') process.exit();
            }
            console.log('ArticleResponses table created.');
            if (tableName != 'all') process.exit();
        });
}

// Spontaneous Responses Table
if (tableName == 'SpontaneousResponses' || tableName == 'all') {
    db.get().query('CREATE TABLE SpontaneousResponses(SRID INT NOT NULL AUTO_INCREMENT, SubjectID INT NOT NULL, Trial INT, ArticleID INT, ElementID VARCHAR(255), ElementCenterY INT, ThumbsUp TINYINT(1), PRIMARY KEY (SRID)) ENGINE = INNODB',
        function(err, result) {
            if (err) {
                console.log('Error creating SpontaneousResponses table: ' + err);
                if (tableName != 'all') process.exit();
            }
            console.log('SpontaneousResponses table created.');
            if (tableName != 'all') process.exit();
        });
}

// Narrative Responses Table
if (tableName == 'NarrativeResponses' || tableName == 'all') {
    db.get().query('CREATE TABLE NarrativeResponses(SRID INT NOT NULL, Response TEXT) ENGINE = INNODB',
        function(err, result) {
            if (err) {
                console.log('Error creating NarrativeResponses table: ' + err);
                if (tableName != 'all') process.exit();
            }
            console.log('NarrativeResponses table created.');
            if (tableName != 'all') process.exit();
        });
}

// Prize Drawing Participants Table
if (tableName == 'PrizeDrawingParticipants' || tableName == 'all') {
    db.get().query('CREATE TABLE PrizeDrawingParticipants(EmailAddress VARCHAR(255), PRIMARY KEY (EmailAddress)) ENGINE = INNODB',
        function(err, result) {
            if (err) {
                console.log('Error creating PrizeDrawingParticipants table: ' + err);
                if (tableName != 'all') process.exit();
            }
            console.log('PrizeDrawingParticipants table created.');
            if (tableName != 'all') process.exit();
        });
}

//add further table declarations here

if (tableName == 'all') tablprocess.exit();
