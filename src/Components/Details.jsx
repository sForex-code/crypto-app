import { Text,Container, HStack, Heading, Radio, RadioGroup, VStack, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Progress, Badge, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loder from './Loder'
import axios from 'axios'
import { server } from '../index'
import { useParams } from 'react-router-dom'
import Chart from "./Chart"

const Details = () => {
  const [coin,setCoin]= useState({})
  const [loding,setLoding]= useState(true)
  const [error,setError]= useState(false)
  const [currency,SetCurrency]=useState("inr")
  const currencySymbol= currency==="inr"?"₹":currency==="eur"?"€":"$";

  const params =useParams()

  useEffect(() => {

    const fetchCoin= async ()=>{
      try {
        const { data }= await axios.get(`${server}/coins/${params.id}`)
        setCoin(data);
        console.log(data);
        setLoding(false);
      } catch (error) {
        setError(true)
        setLoding(false);
      }

    };

    fetchCoin();
   }, [params.id])
  
  return (
    <Container maxW={"container.xl"}>
      {
        loding?<Loder/>:<>
        <Box w={"full"} borderWidth={1}>
          <Chart currency={currencySymbol} />
        </Box>
        <RadioGroup value={currency} onChange={SetCurrency} p={["2","4"]}>
        <Heading textAlign={"center"}>Select Currency </Heading>
        <HStack spacing={"5"} w={"full"} justifyContent={["center"]}>
        <Radio value='inr'>INR</Radio>
        <Radio value='usd'>USD</Radio>
        <Radio value='eur'>EUR</Radio>
        </HStack>
        </RadioGroup>

        <VStack alignItems={"flex-start"} spacing={"5"} p={"16"} >
          <Text fontSize={"small"} alignSelf={"center"}>
            Last Update On {Date(coin.market_data.last_updated).split("G")[0]} 
          </Text>
            <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"}/>

            <Stat>

              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>

              <StatHelpText>
                <StatArrow type={coin.market_data.market_cap_change_24h>0?"increase":"decrease"}/>
                {coin.market_data.market_cap_change_24h}%
              </StatHelpText>
            </Stat>

            <CustomData high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />
            <Box w={"full"} p={"4"} >
              <Item title={"Max-Supply"} value={coin.market_data.max_supply?coin.market_data.max_supply:"NA"} />
              <Item title={"Circulating-Supply"} value={coin.market_data.circulating_supply} />
              <Item title={"Market-Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
              <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </Box>
        </VStack>
        </>
      }
    </Container>
  )
}

const Item= ({title,value})=>(
  <HStack w={"full"} justifyContent={"space-between"} p={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>

)

const CustomData=({low,high})=>(
  <VStack>
    <Progress value={50} w={"full"} colorScheme='green' />
    <HStack>
      <Badge children={low} colorScheme='red' />
      <Text fontSize={"sm"}>24h Diffrence</Text>
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
)

export default Details