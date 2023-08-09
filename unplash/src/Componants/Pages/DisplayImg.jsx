import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../Styles/display.css"
function DisplayImg() {
    const fetchedData = useSelector((state) => state.fetchedData);
    
    console.log(fetchedData)
  return (
   
        <div className="display-img">
            {
                fetchedData.map((item, id)=>{
                    return(
                        <div className='img-cont' key={id}>
                            <img src={item.urls.small} alt="" id='result_img' />
                        </div>
                    )
                })
            }
        </div>
        
  )
}

export default DisplayImg
