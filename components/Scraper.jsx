import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {getScrapeData} from '../services'

const Scraper = () => {
  const [link, setLink] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(true);

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     console.log(acceptedFiles);
  //     if (acceptedFiles.length > 0) {
  //       const droppedLink = acceptedFiles;
  //       setLink(droppedLink);
  //     }
  //   },
  // });

  const handleInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleButtonClick = async () => {
    const response = await getScrapeData(link);
    setHtmlContent(response)
    setButtonVisible(false);
  };

  return (
    <div>
      {isButtonVisible ? (
        <>
          {/* <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a link here, or click to select a link</p>
          </div> */}
          <textarea 
              rows="1"
              placeholder={`Enter a Link`} 
              value={link} 
              onChange={handleInputChange} 
              className=" position: center text-black w-3/4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)]  hover:shadow transition duration-200 bg-white mt-5 mx-5 "
              >
            </textarea>
          <button onClick={handleButtonClick} className='transition duration-500 transform hover:-translate-y-1 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-1 cursor-pointer'
          >Submit</button>
        </>
      ) : (
        <div className='lg:col-span-1 overflow-scroll mt-1'
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{ fontSize: '18px' }}
        ></div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  width: '100%',
  height: '80px',
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Scraper;
