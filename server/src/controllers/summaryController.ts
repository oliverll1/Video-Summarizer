const { transcribeAudioFile } = require("../services/summaryService");
const multer = require('multer');

const getSummary = (req, res) => {
    res.send('Hello, root');
};

const addSummary = (req, res) => {
    const audioFile = req.file;

    if ( audioFile ) {      
        transcribeAudioFile(audioFile)
        .then((transcription: string) => {

           res.status(200).json({ 
            message: 'File uploaded and processed successfully',
            data: {
                transcription: transcription.replace(/\n/g, ' ')
            }
        });
        })
        .catch((error: Error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }); 
    }
    else {
        res.status(400).json({ message: 'File upload failed' });

        // Check if it's a MulterError and include it in the error message.
        if (req.file instanceof multer.MulterError) {
            res.status(400).json({ message: `File upload failed: ${req.file.message}` });
        } else {
            res.status(400).json({ message: 'File upload failed' });
        }
    }
};

module.exports = {
    getSummary,
    addSummary
};  
  