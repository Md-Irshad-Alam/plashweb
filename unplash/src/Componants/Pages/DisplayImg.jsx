import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../Styles/display.css"
function DisplayImg() {
    const fetchedData = useSelector((state) => state.fetchedData);
  return (
   
        <div className="display-img">
            {
                fetchedData.map((item, id)=>{
                    return(
                        <div className='img-cont'>
                            <img src={item.src.small} alt="" id='result_img' />
                        </div>
                    )
                })
            }
        </div>
        
  )
}

export default DisplayImg
