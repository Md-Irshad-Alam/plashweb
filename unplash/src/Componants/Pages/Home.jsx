import React from 'react'
import { useEffect, useState } from 'react';
import '../Styles/home.css'
import {HiMagnifyingGlass} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchedData } from '../Redux/Actions';
import {TbScanEye} from 'react-icons/tb';
import DisplayImg from './DisplayImg';
import { useNavigate } from 'react-router-dom';
import store from '../Redux/Store';
import { Loader } from '@mantine/core';
function Home() {
    let [img, setImg] = useState("nature");
    // const Access_Key =  process.Uplash_key
    // console.log(Access_Key)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData]  = useState([])
    const fetchedData = useSelector((state) => state.fetchedData);
    const history = useNavigate();
    const [load, setload] = useState(true)
    
    const apiKey = "4YV-X_kIDC3sZv-8HnuSpytd9TG-b8jh4wRCVguGvrA";
  
//  make an api request 
        const getdata = async()=>{
          try {
            console.log(img)
           
            const response = await fetch(
              `https://api.unsplash.com/search/photos?page=${page}&query=${img}&client_id=${apiKey}`
            );
            const data = await response.json();
           
            const result = data.results;
           
          store.dispatch(setFetchedData([...store.getState().fetchedData, ...result]));
          setload(false)
          } catch (error) {
            console.log(error)
          }
         

        }
        // for the onclick handle function 
        const Submit = () => {
          dispatch({ type: 'RESET_DATA' });
          getdata();

           console.log("api is called ")
          
         }
// scrool effect function 
      const handleScroll = async() => {
        const scrollTop = document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight
          const clientHeight = window.innerHeight;
      
      
          try {
            if (clientHeight + scrollTop +1 >= scrollHeight) {
              setPage((prev) =>  prev+1)
              setload(false)
            }
          } catch (error) {
            
          }
      };

  
      useEffect(()=>{
        getdata()

      },[page])

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // event cleaner 
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []); 
  return (
    <>
    <div className='home'>
      <div className="innercont">
      <h1 style={{fontSize:"48px", lineHeight:"1.2", fontWeight:'500'}}>Unplash </h1>
      <h3 style={{fontSize:"18px", fontWeight:"400"}}>The internet’s source for visuals. <br/>
      Powered by creators everywhere.</h3>
     <div className='second_searchbox'>
        <HiMagnifyingGlass fontSize={"1.5rem"}/>
        <input type="text" width="100%"  className='second-search'
        placeholder='search high-resolution images'
        onChange={(e) => setImg(e.target.value)}
        onKeyPress={(event) => event.key === 'Enter' ? Submit() : null}
        value={img}
        />
        <TbScanEye fontSize={"1.5rem"}/>
     </div>
      </div>
      <div className='footer'>
        <p>Photo by Jeremy Bishop</p>
        <p>Read more about the Unsplash License</p>
      </div>
    </div>
    <div className='scroll-img'>
        {
            fetchedData.map((item, id)=>{
                return(
                    <div key={id}>
                       <img src={item.urls.small} alt="" id='result_img' />
                    </div> 
                )
            })
        }
    </div>
    {load &&   <Loader color="indigo" />}
    </>
  )
}

export default Home
