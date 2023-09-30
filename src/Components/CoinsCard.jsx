import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

    const CoinsCard = ({name,img,price,id,symbol,currencySymbol="₹"})=>(

        <Link to={`/Coins/${id}`}>
          <VStack w={"52"} p={"8"} shadow={"lg"} transition={"all 0.5s"} m={"3"} borderRadius={"lg"} 
          css={{"&:hover":{
            transform:"scale(1.1)"
          }}}>
            <Image src={img} w={"10"} h={"10"} objectFit={"contain"}/>
            <Heading size={"md"} noOfLines={1}> {symbol} </Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price? `${currencySymbol}${price}`:"NA"}</Text>
            
      
          </VStack>
        </Link>
      )
      

export default CoinsCard