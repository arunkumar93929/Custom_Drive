const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase.config.js');
const multer = require('multer');
const fileModel = require('../models/files.model.js'); // Assuming you have a file model for MongoDB
// Configure multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
const authMiddleware = require('../middlewares/authe.js'); 


router.get("/home", authMiddleware,async(req, res) => {

    const userfile = await fileModel.find({ user: req.user.userId });
    res.render("home",{
        files: userfile
    });
});

router.post('/upload-file', authMiddleware,upload.single('file'), async (req, res) => {
    const file = await fileModel.create({
        path: req.file.path,
        originalName: req.file.originalname,
        user: req.user.userId // Assuming you have user authentication and req.user is set    
    }) ;

    if (!file) {
        return res.status(400).send("No file uploaded");
    }

    // Sanitize the file name
    const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');

    try {
        const { data, error } = await supabase.storage
            .from('drive') // Ensure 'drive' is the correct bucket name
            .upload(`uploads/${sanitizedFileName}`, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            console.error(error);
            return res.status(500).send("Error uploading file");
        }

        res.status(200).send("File uploaded successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get('/download/:fileId', authMiddleware, async (req, res) => {
    const { fileId } = req.params;

    try {
        const file = await fileModel.findById(fileId);

        if (!file) {
            return res.status(404).send("File not found");
        }

        const { data, error } = await supabase.storage
            .from('drive')
            .download(`uploads/${file.originalName}`);

        if (error) {
            console.error(error);
            return res.status(500).send("Error downloading file");
        }

        res.setHeader('Content-Disposition', `attachment; filename=${file.originalName}`);
        data.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
