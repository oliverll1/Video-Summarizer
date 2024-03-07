"use client"
import { useState } from 'react';
import FilesDragAndDropButton from '@/components/FileDragAndRopButton/FileDragAndDropButton';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';

export default function Summary() {
  const [transcription, setTranscription] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleUpload =  async (file: File) => {
    if (file) { 
      const formData = new FormData();
      formData.append('audioFile', file);
      setProcessing(true);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summary/add`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        console.log('Upload successful:', data);
        
        const transcribeText = data.data.transcription;

        setTranscription(transcribeText);
        setProcessing(false);

        } catch (error) {
            console.log('Error uploading file:', error);
            setProcessing(false);
        }

      } else {
          console.error('No file selected');
      }
    }  

  return (
    <main className="w-full m-auto container">

      {/* TODO Download video from url */}

      {/* <section className="w-full m-auto container px-6">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 items-center justify-center">
          <div className="col-span-12 md:col-span-8 lg:col-span-10">
            <Input name="test" placeholder="Video Url"/>
          </div>
          <div className="col-span-12 md:col-span-4 lg:col-span-2">
            <Button text="Get Summary"/>
          </div> 
        </div>
     </section> */}

      <h1 className='text-6xl mb-20 text-center font-bold'>Transcribe an Audio</h1>

      <section className='w-full container justify-center flex px-6 mt-10'>
        <div className="justify-center flex">
          <FilesDragAndDropButton 
            disabled={processing}
            onUpload={handleUpload}
            formats={['flac']}
          /> 
        </div>
      </section>

      <section className='w-full container justify-center flex flex-wrap px-6 mt-10'>

        {processing ? <div className='w-full justify-center flex mb-5'> <span>Processing...</span> </div> : null}
  
        <div className="justify-center flex">
          <p>
            {transcription}
          </p>
        </div>

      </section>
    </main>
  )
}
