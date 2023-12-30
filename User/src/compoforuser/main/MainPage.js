import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from './Navbar'

const MainPage = () => {
  return (
    <>
    
    <Container>
    
        <Box sx={{ my: 4 }}>
        
          <Outlet/>
        </Box>
      </Container>
    </>
  )
}

export default MainPage