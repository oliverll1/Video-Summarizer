import {useState, useEffect, useRef} from 'react';

type FilesDragAndDropButtonTypes = {
    onUpload : (arg0: File) => void,
    formats: string[],
    disabled: boolean
}

export default function FilesDragAndDropButton({onUpload, formats, disabled}: FilesDragAndDropButtonTypes) {
    const [dragging, setDragging] = useState(false);
    const dropRef = useRef<HTMLButtonElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleDragOver = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };
      
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      if (e.target.files.length > 0) {
        const files = [...e.target.files]
        handleFile(files);
      }
    }

    const handleDrop = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
      
        const files = [...e.dataTransfer.files];

        if (files.length > 0) { 
          handleFile(files);
        }
      };

      const handleDragEnter = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);   
      };
      
      const handleDragLeave = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
      };
 
      const handleFile = (files: File[]) => {
        if (1 < files.length) {
          console.log('Only 1 file can be uploaded at a time');
          return;
        }
  
        if (formats && files.some((file) => !formats.some((format) => file.type.endsWith(format.toLowerCase())))) {      
          console.log(`Only following file formats are acceptable: ${formats.join(', ')}`);
          return;
        }

        onUpload(files[0])
      }
 
  
    return (
    <button 
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={disabled}
        onClick={() => {fileInputRef.current?.click()}}
        ref={dropRef} 
        className={`transition-colors duration-300 ease-in-out group cursor-pointer
         hover:bg-sky-500/5 relative w-[300px] h-[200px] p-10 flex items-center justify-center 
         flex-col flex-nowrap text-2xl text-davy-gray border-dashed border-light-gray
         ${dragging ? 'bg-sky-500/5' : 'bg-none'} 
         rounded-sm border-2 text-center disabled:bg-gray-200 disabled:cursor-default disabled:text-gray-400 disabled:pointer-events-none`}
    >
        <div className="pointer-events-none">
            <span className="mb-2 text-xl">
              Drop or Choose a file 
            </span>
            <input 
                onChange={handleChange}
                ref={fileInputRef}
                className="hidden"
                name="file" 
                type="file"
            />
        </div>
             
        <span
            role="img"
            aria-label="emoji"
            className="pointer-events-none mt-[20px] text-xl"
        >
 
            <svg className="group-hover:fill-sky-600 transition-colors duration-300 ease-in-out fill-gray-400" fill="#000000" height="40" width="40" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 374.116 374.116">
                <g>
                    <path d="M344.058,207.506c-16.568,0-30,13.432-30,30v76.609h-254v-76.609c0-16.568-13.432-30-30-30c-16.568,0-30,13.432-30,30
                        v106.609c0,16.568,13.432,30,30,30h314c16.568,0,30-13.432,30-30V237.506C374.058,220.938,360.626,207.506,344.058,207.506z"/>
                    <path d="M123.57,135.915l33.488-33.488v111.775c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30V102.426l33.488,33.488
                        c5.857,5.858,13.535,8.787,21.213,8.787c7.678,0,15.355-2.929,21.213-8.787c11.716-11.716,11.716-30.71,0-42.426L208.271,8.788
                        c-11.715-11.717-30.711-11.717-42.426,0L81.144,93.489c-11.716,11.716-11.716,30.71,0,42.426
                        C92.859,147.631,111.855,147.631,123.57,135.915z"/>
                </g>
            </svg>
        </span>
    </button>
    );
}
