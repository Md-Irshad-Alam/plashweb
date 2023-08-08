import React from 'react';
import { createStyles, Header, Autocomplete, Group, Burger, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { IconSearch } from '@tabler/icons-react';
import { Text } from '@mantine/core';
import {HiMagnifyingGlass} from 'react-icons/hi';
import { FaBeer } from 'react-icons/fa';
import { AiOutlineBell } from 'react-icons/ai';
const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
    display: "flex",
    justifyContent:"space-between",
    // columnGap:"48px",
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
    //   display: 'block',
      
    },
    width:"60vw"
  },
  serchgroup:{
    // width:"40vw",
    // display:"flex",
    // justifyContent:"space-between"
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

function HeaderSearch({ links }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();



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
          <input type="text"
          className={classes.search}
          width="100%"
           data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
        </Group>
          <Group className={classes.links}>
            <Text>Advertise</Text>
            <Text>Blog</Text>
            <Text className={classes.logoname}>Unsplash+</Text>
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
