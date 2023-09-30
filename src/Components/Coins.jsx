import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { HStack, Container, Button, Radio, RadioGroup, Heading} from '@chakra-ui/react'
import Loder from './Loder'
import CoinsCard from './CoinsCard'

  const Coins = () => {
  const [coins,setCoins]= useState([])
  const [loding,setLoding]= useState(true)
  const [error,setError]= useState(false)
  const [page,setPage]= useState(1)
  const [currency,SetCurrency]=useState("inr")
  const currencySymbol= currency==="inr"?"₹":currency==="eur"?"€":"$";
  const arr = new Array(102).fill(1);

  const changePage=(page)=>{
    setPage(page)
    setLoding(true)
  }

   useEffect(() => {

    const fetchCoins= async ()=>{
      try {
        const { data }= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

        setCoins(data);
        setLoding(false);
      } catch (error) {
        setError(true)
        setLoding(false);
      }

    };

    fetchCoins();
   }, [currency,page])
if(error) return <div>error occured while fetching coins data</div>

  return (

  <Container p={"8"} maxW={"container.xl"}>
    { loding?<Loder/>:<>

      <RadioGroup value={currency} onChange={SetCurrency} p={["2","4"]}>
        <Heading textAlign={"center"}>Select Currency </Heading>
    <HStack spacing={"5"} w={"full"} justifyContent={["center"]}>
        <Radio value='inr'>INR</Radio>
        <Radio value='usd'>USD</Radio>
        <Radio value='eur'>EUR</Radio>
    </HStack>
      </RadioGroup>

    <HStack  wrap={"wrap"} justifyContent={"space-evenly"}>
    {
      coins.map((i)=>(
       <CoinsCard key={i.id} price={i.current_price} id={i.id} name={i.name} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
      ))
    }
    </HStack>
    <HStack overflowX={'auto'} w={'full'} p={"8"}>
      {
        arr.map((item,index)=>(
          <Button  bgColor={"blackAlpha.800"} color={"white"} onClick={()=>changePage(index)}>{index+1}</Button>
        ))
      }
    </HStack>
    </>}
    </Container>
  )
}

export default Coins