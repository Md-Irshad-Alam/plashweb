import React from 'react'
import { useEffect, useState } from 'react';
import '../Styles/home.css'
import {HiMagnifyingGlass} from 'react-icons/hi2';
import {TbScanEye} from 'react-icons/tb';
function Home() {
    const [img, setImg] = useState("");
    const [res, setRes] = useState([]);

    const fetchRequest = async () => {
        const data = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
        );
        const dataJ = await data.json();
        const result = dataJ.results;
        console.log(result);
        setRes(result);
      };
      useEffect(() => {
        fetchRequest();
      }, []);

  return (
    <div className='home'>
      <div className="innercont">
      <h1>Unplash </h1>
      <h3>The internet’s source for visuals. <br/>
      Powered by creators everywhere.</h3>
     <div className='second_searchbox'>
        <HiMagnifyingGlass fontSize={"1.5rem"}/>
        <input type="text" width="100%"  className='second-search'
        placeholder='search high-resolution imeages'
        onChange={(e) => setImg(e.target.value)}
        />
        <TbScanEye fontSize={"1.5rem"}/>
     </div>
      </div>
      
    </div>
  )
}

export default Home
