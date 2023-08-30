import React from 'react'
import Stepper from '../components/Stepper'
import Tabs from '../components/Tabs'
import { Box } from '@mui/material'

function Home() {
  return (
    <div>
        <Box sx={{marginTop:8}}>
         <Tabs/>
        {/* <Stepper/> */}
        </Box>

    </div>
  )
}

export default Home