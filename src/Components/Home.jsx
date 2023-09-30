import React from 'react'
import {Box, VStack,Image} from "@chakra-ui/react"
import img from "../SL_0212121_40670_20-removebg-preview.png"

const Home = () => {
  return (
    <Box w={"full"} h={"100vh"} bgColor={"blackAlpha.900"} p={"8"}>
        <Image w={"full"} h={"full"} src={img} objectFit={"contain"} filter={"grayscale(1)"} />
    </Box>
    
  )
}

export default Home