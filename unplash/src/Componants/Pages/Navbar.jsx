import React, { useEffect, useState } from 'react';
import { createStyles, Header, Autocomplete, Group, Burger, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Text } from '@mantine/core';
import {FaMagnifyingGlass} from 'react-icons/fa6';
import { FaBeer } from 'react-icons/fa';
import {TbScanEye} from 'react-icons/tb';
import { AiOutlineBell } from 'react-icons/ai';
import "../Styles/navbar.css"
import { useDispatch } from 'react-redux';
import { setFetchedData } from '../Redux/Actions';
import { useNavigate } from 'react-router-dom';
import store from '../Redux/Store';
import { Loader } from '@mantine/core';
const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    display:"flex",
    justifyContent:"space-around"
  },

  inner: {
   width:"100vw",
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    backgroundColor:"white",
    margin:"auto",
    paddingLeft:"10px",
    paddingRight:"10px"
  
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
    display: "flex",
    justifyContent:"space-between",
    cursor:"pointer"
    // columnGap:"48px",
  },

  searchbox:{
    [theme.fn.smallerThan('xs')]: {
        display: 'block',
        
      },
  },
  serchgroup:{
    // width:"40vw",
    // display:"flex",
    // justifyContent:"space-between"
  },
  logoname:{
    animation:" vZKGD 3s linear infinite alternate-reverse",
    animationPlayState:"paused",
    backgroundClip:"text",
    backgroundSize:"500%",
    color:"red"
    
  },

  link: {
    display: 'flex',
    rowGap:"2re",
    columnGap:"2rem",
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));


function HeaderSearch({ inputval }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
const [img, setImg] = useState('')
const dispatch = useDispatch();
const history = useNavigate();
const [load, setload] = useState(true)
const [page , setPage] = useState(1)

const apiKey = "4YV-X_kIDC3sZv-8HnuSpytd9TG-b8jh4wRCVguGvrA";

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
    console.log(error.message)
  }
 
}

// for the onclick handle function 
const Submit = () => {
  dispatch({ type: 'RESET_DATA' });
  getdata();

   console.log("api is called ")
   history('/display')
  
 }
// scrool effect function 
const handleScroll = async() => {
const scrollTop = document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = window.innerHeight;


  try {
    if (clientHeight + scrollTop +1 >= scrollHeight) {
      setload(true)
      setPage((prev) =>  prev+1)
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
    <Header height={56} className={classes.header} mb={120}>

      <div className={classes.inner}>
        <Group className={classes.serchgroup}>
         
          <img src="./logo.png" alt="logo" width="30px" height={"30px"}   />
          {/* <Autocomplete
            className={classes.search}
            placeholder="Search"
          width="40vw"
           
          /> */}
         <Group className="second_searchbox2">
         <FaMagnifyingGlass fontSize={"1.5rem"}/>
         <input type="text"
          className="search"
          width="100%"
          onKeyPress={(event) => event.key === 'Enter' ? Submit() : null}
          onChange={(e) => setImg(e.target.value)}
          value={img}
          placeholder='search high-resolution images'
          />
           <TbScanEye fontSize={"1.5rem"}/>
         </Group>
        </Group>
          <Group className={classes.links}>
            <Text>Advertise</Text>
            <Text>Blog</Text>
            <div className='logocont'>
            <p className="logoname">Unsplash+</p>
            </div>
            <Button variant="light" color="gray">submit a Photo</Button>
            <AiOutlineBell fontSize="1.5rem"/>
          </Group>

            <Group>
                <img src="./avatar.png" height={"30px"} width={"30px"} alt="" />
                <Burger opened={opened} onClick={toggle} size="sm" />
            </Group>
      </div>
          
    </Header>
  );
}

export default HeaderSearch;
