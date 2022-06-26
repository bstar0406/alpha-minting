import { Button, Input, Box, Text, Image, Checkbox, GridItem } from "@chakra-ui/react";
import moment from "moment";
import "moment-timezone";

type Props = {
  mint: any;
  handleAmount: any;
  name: any;
  ImagePath: any;
  price_d: any;
  amount: any;
  isWhitelisted: any;
};

const CardCollectionDetails = ({
  mint,
  name,
  handleAmount,
  price_d,
  amount,
  isWhitelisted,
}: Props) => {
  function getCurrentTimezone() {
    const time = moment.tz("2022-03-31 21:00", "Asia/Dubai");
    const localtz = moment.tz.guess();
    const date = time.clone().tz(localtz)
    const formatDate = moment(date).format("MMMM Do YYYY, h A ")
    return formatDate;
  }

  return (
    <GridItem colSpan={1} margin={"10px"}>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        background={"rgba(34,34,34,0.3)"}
        padding={"30px 15px"}
      >
        <Text color={"white"} margin={"5px 0"}>
          {name}
        </Text>
        <Box color={"white"} margin={"5px 0"}>
          Whitelist 0.8 ETH
          ||
          Public Mint 1.0 ETH
        </Box>
        <Text color={"white"}>You are on the {isWhitelisted?"Whitelist":"PublicList"} </Text>
        <Text
                color="white"
                fontSize="md"
                textAlign="center"
              >
                If you think you're seeing this in error please raise a support ticket in the discord.
              </Text>
        <Text color={"white"}>Maximum amount is 3 </Text>
        <Input
          color="white"
          type="text"
          placeholder="Amount"
          onChange={handleAmount}
        />
        <Button
          onClick={mint}
          borderWidth={"1px"}
          borderColor={"rgb(200,200,200)"}
          background={"rgba(10,10,10)"}
          color="white"
          borderRadius={"0px"}
          width={"100%"}
          display={"flex"}
          
          justifyContent={"space-between"}
          margin={"20px 0px"}
        >
          <span>{amount}</span>
          <span>MINT</span>
        </Button>
        <Text color={"white"}>{!isWhitelisted?"The Public Mint will start at":""} {!isWhitelisted?getCurrentTimezone():""} </Text>
      </Box>
    </GridItem>
  );
};

export default CardCollectionDetails;
