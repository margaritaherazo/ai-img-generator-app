import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_img from '../Assets/default-img.jpg';

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const ImageGenerator = () => {

     const [image_url, setImage_url] = useState("/");
     let inputRef = useRef(null);
     const [loading,setloading] = useState(false);

     const imageGenerator = async () => {
        if (inputRef.current.value==="") {
            return 0;
        }
        setloading(true);
         const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${openaiApiKey}`,
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
         );
         let data = await response.json();
         let data_array = data.data;
         setImage_url(data_array[0].url);
         setloading(false);

     }

    return (
      <div className='ai-image-generator'>
        <div className='header'>AI Image <span>Generator</span></div>
        <div className='img-loading'>
            <div className='image'><img src={image_url=== "/"?default_img:image_url} alt='' style={{ width: '400px', height: 'auto' }} /></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading....</div>
            </div>
        </div>
        <div className="search-box"><input ref={inputRef} type="text" className='search-input' placeholder='Describe how should be your image' />
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
      </div>
    )
}

export default ImageGenerator