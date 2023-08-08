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
function Home() {
    let [img, setImg] = useState("");
    const Access_Key =  process.Uplash_key
    console.log(Access_Key)
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData]  = useState([])
    const fetchedData = useSelector((state) => state.fetchedData);
    const history = useNavigate();
    
   
    const fetchRequest = async () => {
        try {
            const response = await fetch(
              `https://api.pexels.com/v1/curated?per_page=10&page=${page}`,
              {
                headers: {
                  Authorization: process.Uplash_key
                },
              }
            );
            const data = await response.json();
            const result = data.photos;
            store.dispatch(setFetchedData([...store.getState().fetchedData, ...result]));
           
      } catch (error) {
        console.log("error to fetch ")
        
      }
      };

 
      const Submit = () => {
       if(img===''){
        window.alert("Sorry unable find ")
       }else{
        fetchRequest();
        setImg("");
        history("/display")
       }
      };

        const getdata = async()=>{
          try {
            const response = await fetch(
              `https://api.pexels.com/v1/curated?per_page=10&page=${page}`,
              {
                headers: {
                  Authorization: 'eoq3e8CMOSCOxOmqzRMQFNOyTwHuZtnZquLQnlhjfOttfc7SzFwbhd3D',
                },
              }
            );
            const data = await response.json();
            const result = data.photos
          //  setData(result)
          store.dispatch(setFetchedData([...store.getState().fetchedData, ...result]));

          } catch (error) {
            console.log(error)
          }
         

        }

      const handleScroll = async() => {
        const scrollTop = document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight
          const clientHeight = window.innerHeight;
      
      
          try {
            if (clientHeight + scrollTop +1 >= scrollHeight) {
              setPage((prev) =>  prev+1)
            }
          } catch (error) {
            
          }
      };

  

// this is for manual type serch 
      // useEffect(() => {
      //   fetchRequest();
        
      // }, []);
// this is for infinite scroll useEffect i used dependenc
      useEffect(()=>{
        getdata()
      },[page])

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []); 
console.log(fetchedData)
    

  return (
    <>
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
        onKeyPress={(event) => event.key === 'Enter' ? Submit() : null}
        value={img}
        />
        <TbScanEye fontSize={"1.5rem"}/>
     </div>
      </div>
    </div>
    <div className='scroll-img'>
        {
            fetchedData.map((item, id)=>{
                return(
                    <div key={id}>
                       <img src={item.src.small} alt="" id='result_img' />
                    </div> 
                )
            })
        }
    </div>
    </>
  )
}

export default Home
