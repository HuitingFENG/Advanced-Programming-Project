// internshipRoutes

const express = require('express');
const Internship = require('../models/internship');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/user');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads'); 
    },
    filename: function(req, file, cb) {
        const internshipId = req.params.internshipId;
        const fileType = req.params.fileType;

        let fileCategory;
        if (fileType === 'CdC') fileCategory = 2;
        else if (fileType === 'final report') fileCategory = 1;
        else fileCategory = 'unknown'; 

        const newFileName = `${internshipId}-${fileCategory}-${file.originalname}`;
        cb(null, newFileName);
    }
});
const upload = multer({ storage: storage });



// GET all Internship
router.get('/', async (req, res) => {


    try {
        const internship = await Internship.findAll(
            {
                include: [
                    { model: User, as: 'student' },
                    { model: User, as: 'tutor' }
                ]
            }
        );
        res.json(internship);
    } catch (error) {
        console.error('Error fetching Internship:', error);
        res.status(500).send('Error fetching Internship');
    }
});


// GET Internships by studentID
router.get('/student/:studentID', async (req, res) => {
    try {
        const internships = await Internship.findAll({
            where: { studentID: req.params.studentID }
        });
        res.json(internships);
    } catch (error) {
        console.error('Error fetching Internships by studentID:', error);
        res.status(500).send('Internal Server Error');
    }
});


// GET a single Internship by id
router.get('/:id', async (req, res) => {
    try {
        const internship = await Internship.findByPk(req.params.id);
        if (internship) {
            res.json(internship);
        } else {
            res.status(404).send('Internship not found');
        }
    } catch (error) {
        console.error('Error fetching Internship:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST a new Internship
router.post('/', async (req, res) => {
    try {
        const newInternship = await Internship.create(req.body);
        res.status(201).json(newInternship);
    } catch (error) {
        console.error('Error creating Internship:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT to update a Internship
router.put('/:id', async (req, res) => {
    try {
        const updatedInternship = await Internship.update(req.body, {
            where: { id: req.params.id }
        });
        res.json(updatedInternship);
    } catch (error) {
        console.error('Error updating Internship:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE a Internship
router.delete('/:id', async (req, res) => {
    try {
        await Internship.destroy({
            where: { id: req.params.id }
        });
        res.send('Internship deleted successfully');
    } catch (error) {
        console.error('Error deleting Internship:', error);
        res.status(500).send('Internal Server Error');
    }
});



// POST route for file upload
router.post('/upload/:internshipId/:fileType', upload.single('file'), async (req, res) => {
    const { internshipId, fileType } = req.params;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
        const internship = await Internship.findByPk(internshipId);
        
        if (!internship) {
            return res.status(404).send('Internship not found.');
        }
        let files = typeof internship.files === 'string' ? JSON.parse(internship.files) : internship.files;
        const fileIndex = files.findIndex(file => file.type === fileType);
        console.log("TEST fileIndex: ", fileIndex);
        if (fileIndex !== -1) {
            console.log("TEST files[fileIndex].finished: ", files[fileIndex].finished);
            console.log("TEST files[fileIndex].finished: ", files[fileIndex].category);
            console.log("TEST files[fileIndex].finished: ", files[fileIndex+2].finished);
            files[fileIndex].finished = true;
            console.log("TEST files[fileIndex].finished: ", files[fileIndex].finished);
            await Internship.update({ files }, { where: { id: internshipId } });
            res.send('File uploaded and status updated successfully.');
        } else {
            res.status(404).send('File type not found.');
        }
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    }
});




// GET Internships by studentID, sorted by createdAt in descending order
router.get('/student/:studentID/latest', async (req, res) => {
    try {
        const internships = await Internship.findAll({
            where: { studentID: req.params.studentID },
            order: [['createdAt', 'DESC']]
        });

        if (internships.length > 0) {
            const latestInternship = internships[0]; 
            res.json(latestInternship);
        } else {
            res.json({ message: "No internships found for this student." });
        }
    } catch (error) {
        console.error('Error fetching Internships by studentID:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Example PUT route in internshipRoutes.js
router.put('/updateFileContent/:internshipId/:fileCategory', async (req, res) => {
    const { internshipId, fileCategory } = req.params;
    const { content } = req.body;
    console.log("TEST internshipId, fileCategory, content : ", internshipId, fileCategory, content);

    try {
        const internship = await Internship.findByPk(internshipId);
        console.log("TEST internship: ", internship);
        if (!internship) return res.status(404).send('Internship not found');
        let files = typeof internship.files === 'string' ? JSON.parse(internship.files) : internship.files;
        
        const fileIndex = internship.files.findIndex(file => file.category === parseInt(fileCategory));
        console.log("TEST fileIndex: ", fileIndex);
        if (fileIndex === -1) return res.status(404).send('File category not found');
        internship.files[fileIndex].content = content;
        internship.files[fileIndex].finished = true;
        console.log("TEST internship.files[fileIndex].content: ", internship.files[fileIndex].content);

        await Internship.update({ files }, { where: { id: internshipId } });
        res.send('Internship file content updated successfully');

    } catch (error) {
        console.error('Error updating internship file content:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Example route to update meeting list for an internship
router.put('/updateMeetingList/:internshipId', async (req, res) => {
    const { internshipId } = req.params;
    const { meetingType, date, location } = req.body; 
    console.log("TEST internshipId, meetingType, date, location : ", internshipId, meetingType, date, location);

    try {
        const internship = await Internship.findByPk(internshipId);
        if (!internship) {
            return res.status(404).send('Internship not found');
        }
        const meetingList = typeof internship.meetingList === 'string' ? JSON.parse(internship.meetingList) : internship.meetingList || [];
        let updated = false;
        for (let i = 0; i < meetingList.length; i++) {
            if (meetingList[i].type === meetingType) {
                meetingList[i] = { type: meetingType, date: date, location: location, finished: false };
                updated = true;
                break; 
            }
        }
        if (!updated) {
            return res.status(404).send('Meeting type not found');
        }
        await Internship.update({ meetingList }, { where: { id: internshipId } });
        res.send('Meeting list updated successfully');
    } catch (error) {
        console.error('Error updating meeting list:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/download/:internshipId/:fileCategory', async (req, res) => {
    const { internshipId, fileCategory } = req.params;

    const filePattern = new RegExp(`^${internshipId}-${fileCategory}-.*`);
    const directoryPath = path.join(__dirname, '../uploads');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Error reading files.');
        }

        const fileToDownload = files.find(file => filePattern.test(file));
        if (fileToDownload) {
            const filePath = path.join(directoryPath, fileToDownload);
            res.download(filePath);
        } else {
            res.status(404).send('File not found.');
        }
    });
});


// GET Internships by tutorID with manual fetching for related student information
router.get('/tutor/:tutorID', async (req, res) => {
    try {
        const internships = await Internship.findAll({
            where: { tutorID: req.params.tutorID },
            include: [
                {
                    model: User,
                    as: 'student'
                },
                {
                    model: User,
                    as: 'tutor'
                }
            ]
        });
        res.json(internships);
    } catch (error) {
        console.error('Error fetching Internships by tutorID with students:', error);
        res.status(500).send('Internal Server Error');
    }
});



// PUT route to update the specific meeting status of a specific internship
router.put('/updateMeetingStatus/:internshipId', async (req, res) => {
    const { internshipId } = req.params;
    const { meetingType } = req.body; 
    console.log("TEST internshipId, meetingType: ", internshipId, meetingType);

    try {

        const internship = await Internship.findByPk(internshipId);
        if (!internship) {
            return res.status(404).send('Internship not found');
        }
        let meetingList = [...internship.meetingList];
        meetingList = meetingList.map(meeting => {
            if (meeting.type === meetingType) {
                return { ...meeting, finished: true }; 
            }
            return meeting;
        });

        await internship.update({ meetingList });
        res.json({ message: 'Meeting status updated successfully' });
    } catch (error) {
        console.error('Error updating meeting list:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Endpoint to update a file comment within an internship
router.post('/:internshipId/updateComment', async (req, res) => {
    const { internshipId } = req.params;
    const { fileCategory, comment } = req.body;
    console.log("TEST internshipId, fileCategory, comment: ", internshipId, fileCategory, comment);

    try {
        const internship = await Internship.findByPk(internshipId);

        if (!internship) {
            return res.status(404).send('Internship not found');
        }
        const updatedFiles = internship.files.map(file => {
            if (file.category === fileCategory) {
                return { ...file, message: comment };
            }
            return file;
        });

        internship.files = updatedFiles;
        await internship.save();

        res.json({ success: true, message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/:internshipId/invalidateFile', async (req, res) => {
    const { internshipId } = req.params;
    const { fileCategory } = req.body;
  
    try {
      const internship = await Internship.findByPk(internshipId);
      if (!internship) {
        return res.status(404).send('Internship not found');
      }
      const updatedFiles = internship.files.map(file => {
        if (file.category === fileCategory) {
          return { ...file, finished: false }; 
        }
        return file;
      });
  
      internship.files = updatedFiles;
      await internship.save();
  
      res.json({ success: true, message: 'File invalidated successfully' });
    } catch (error) {
      console.error('Error invalidating file:', error);
      res.status(500).send('Internal Server Error');
    }
});
  

// POST endpoint to update file deadlines by internship type
router.post('/updateDeadline', async (req, res) => {
    const { internshipType, updateType, fileType, meetingType, deadline } = req.body;
    console.log("TEST internship type: ", internshipType);
    console.log("Received update for", updateType, "of type", fileType || meetingType, "with deadline:", deadline);

    try {
        const internships = await Internship.findAll({ where: { type: internshipType } });
        console.log("TEST internships: ", internships);
        internships.forEach(async (internship) => {
            if (updateType === 'file') {
                const files = typeof internship.files === 'string' ? JSON.parse(internship.files) : internship.files || [];
                const fileIndex = files.findIndex(file => file.type === fileType);
                if (fileIndex !== -1) {
                    files[fileIndex].deadline = deadline;
                    console.log("TEST files: ", files);
                    await Internship.update({files: files}, {where: { id: internship.id }});
                }
            } else if (updateType === 'meeting') {
                const meetings = typeof internship.meetingList === 'string' ? JSON.parse(internship.meetingList) : internship.meetingList || [];
                const meetingIndex = meetings.findIndex(meeting => meeting.type === meetingType);
                if (meetingIndex !== -1) {
                    meetings[meetingIndex].deadline = deadline;
                    console.log("TEST meetings: ", meetings);
                    await Internship.update({meetingList: meetings}, {where: { id: internship.id }});
                }
            }
        });
        res.json({ message: 'Deadlines updated successfully' });
    } catch (error) {
      console.error('Error updating deadlines:', error);
      res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

