import speech from '@google-cloud/speech';
const credentials = require(process.env.speech_to_text_credentials_path); // Imports google service account keys

type AudioFile = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: Buffer,
  size: number
}

export const transcribeAudioFile = async (audioFile: AudioFile): Promise<string> => {
  console.log("transcribing...");

  const client = new speech.SpeechClient({ credentials });
  const file = audioFile; 
  const config = {
    encoding: 'FLAC' as const,
    languageCode: 'en-US',
    audioChannelCount: 2,
    enableSeparateRecognitionPerChannel: false
  }

  const audio = {
    content: file.buffer
  };

  const request = {
    audio,
    config: config,
  };

  try {
    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    return transcription;

  } catch (err) {
    console.error('Error during transcription:', err);
    throw err;
  }
}
