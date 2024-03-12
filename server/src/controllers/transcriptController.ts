import { Request, Response } from 'express';

import {transcribeAudioFile} from "../services/transcriptService";
import multer from 'multer';

export const getSummary = (req: Request, res: Response) => {
    res.send('Hello, Get transcription');
};

export const addSummary = (req: Request, res: Response) => {
    const audioFile = req.file;
    console.log(audioFile);

    if ( audioFile ) {

        if ( audioFile.mimetype !== 'audio/x-flac') {
            res.status(422).json({ message: 'File upload failed: Wrong format' })           
        }
        
        transcribeAudioFile(audioFile).then((transcription: string) => {
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
        // Check if it's a MulterError and include it in the error message.
        if (req.file instanceof multer.MulterError) {
            res.status(409).json({ message: `File upload failed: ${req.file}` });
        } else {
            res.status(409).json({ message: 'File upload failed' });
        }
    }
};
