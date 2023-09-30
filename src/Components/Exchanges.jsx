import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { HStack, VStack ,Image, Heading, Container,Text} from '@chakra-ui/react'
import Loder from './Loder'

const Exchanges = () => {
  const [exchanges,setExchanges]= useState([])
  const [loding,setLoding]= useState(true)
  const [error,setError]= useState(false)


   useEffect(() => {

    const fetchCryp= async ()=>{
      try {
        const { data }= await axios.get(`${server}/exchanges`);

        setExchanges(data);
        setLoding(false);
      } catch (error) {
        setError(true)
        setLoding(false);
      }

    };

    fetchCryp();
   }, [])
if(error) return <div>error occured while fetching data</div>

  return (

  <Container p={"8"} maxW={"container.xl"}>
    { loding?<Loder/>:<>
    <HStack  wrap={"wrap"} justifyContent={["space-evenly","center"]}>
    {
      exchanges.map((i)=>(
       <ExchangeCard key={i.id} url={i.url} name={i.name} img={i.image} rank={i.trust_score_rank} />
      ))
    }
    </HStack>
    </>}
    </Container>
  )
}

const ExchangeCard = ({name,img,rank,url})=>(
  <a href={url} target={"blank"}>
    <VStack w={"52"} p={"8"} shadow={"lg"} transition={"all 0.5s"} m={"3"} borderRadius={"lg"} 
    css={{"&:hover":{
      transform:"scale(1.1)"
    }}}>
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"}/>
      <Heading size={"md"} noOfLines={1}> {rank} </Heading>
      <Text noOfLines={1}>{name}</Text>

    </VStack>
  </a>
)

export default Exchanges