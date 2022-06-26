
import {
  Button,
  Box,
  Text,
  Image,
  Link,
  Heading,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import Web3 from "web3";
import { formatEther } from "@ethersproject/units";
import tardigradeImg from "../assets/tardigrade/Store.png";
import logo from "../assets/alphaBytes.png";
import Identicon from "./Identicon";
import chestImage from "../assets/chest.gif";
import chest from "../assets/chest.jpg";
import SmartContract from "../contract/AlphaMint/alphaByte";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState, useEffect, useCallback } from "react";
import CardCollectionDetails from "./CardCollectionDetails";
import moment from "moment";
type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const [spin, setSpin] = useState(false);
  const [notification, setNotification] = useState("");
  const [amount, setAmount] = useState("1");
  const [iswhitelist, setIsWhiteList] = useState(false);
  const etherBalance = useEtherBalance(account);

  useEffect(() => {
    const ethEnabled = async () => {
      if ((window as any).ethereum) {
        await (window as any).ethereum.send("eth_requestAccounts");
        (window as any).web3 = new Web3((window as any).ethereum);
        (window as any).web3.eth.net
          .getId()
          .then((networkId: any) => {
            if (networkId !== 1) {
              setNotification("Change metamask network to Ethereum Mainnet");
            }
          })
          .catch((err: any) => {
            setNotification("Can't detect your Metamask Network");
          });
        return true;
      }
      setNotification("Web3 is not defined");
      return false;
    };
    if (!ethEnabled()) {
      setNotification("Please install Metamask to use this dApp!");
    }
  }, []);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  function handleAmount(e: any) {
    setAmount(e.target.value);
  }
  const isWhitelisted = useCallback(
    async () => {
      if ((window as any).ethereum) {
        await (window as any).ethereum.send("eth_requestAccounts");
        (window as any).web3 = new Web3((window as any).ethereum);

        try {
          if (account) {
            const flag = await SmartContract.methods
              .isWhitelisted(account)
              .call();
            setIsWhiteList(flag);
          }
        } catch (e) {
          setNotification("Change metamask network to Ethereum Mainnet.");
          setSpin(false);
        }
      } else {
        setNotification("Please install Metamask to use this dApp!");
        setSpin(false);
      }
      return false;
    },
    [account]
  );

  useEffect(
    () => {
      isWhitelisted();
    },
    [iswhitelist, isWhitelisted]
  );

  async function mint() {
    setSpin(true);
    const integer = parseInt(amount, 10);

    if (integer < 1 || integer > 3) {
      console.log("amount is not good");
    } else {
      if ((window as any).ethereum) {
        await (window as any).ethereum.send("eth_requestAccounts");
        (window as any).web3 = new Web3((window as any).ethereum);

        try {
          const balance = await SmartContract.methods.balanceOf(account).call();
          if (balance > 3) {
            setNotification("You can't mint more then 3 NFT per address");
            setSpin(false);
            return;
          }
          const pricePerItem = 1.0;
          const totalPrice = pricePerItem * integer;
          const value = (window as any).web3.utils.toWei(
            totalPrice.toString(),
            "ether"
          );

          SmartContract.methods
            .mint(amount)
            .send({ from: account, value: value })
            .on("transactionHash", (hash: any) => {
              let messageNotification = "https://etherscan.io/tx/" + hash;
              setNotification(messageNotification);
              setSpin(false);
            })
            .on("error", (error: any, receipt: any) => {
              setNotification("Minting was not successful");
              setSpin(false);
            });
        } catch (e) {
          setNotification("Minting was not successful");
          setSpin(false);
        }
      } else {
        setNotification("Please install Metamask to use this dApp!");
        setSpin(false);
      }
    }
  }

  return account
    ? <div style={{ background: "rgba(0,0,0,0.5)" }}>
        <Box
          display="flex"
          alignItems="center"
          background="gray.700"
          borderRadius="xl"
          py="0"
          position="absolute"
          right="20px"
          top="20px"
        >
          <Box px="3">
            <Text color="white" fontSize="md">
              {etherBalance &&
                parseFloat(formatEther(etherBalance)).toFixed(3)}{" "}
              ETH
            </Text>
          </Box>
          <Button
            onClick={handleOpenModal}
            bg="gray.800"
            border="1px solid transparent"
            _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "blue.400",
              backgroundColor: "gray.700"
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            height="38px"
          >
            <Text color="white" fontSize="md" fontWeight="medium" mr="2">
              {account &&
                `${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
                )}`}
            </Text>
            <Identicon />
          </Button>
        </Box>
        <div id="society" style={{ margin: "auto" }}>
          <div
            className="main-content"
            style={{ padding: "0 20px", margin: "auto" }}
          >
            <Box
              marginBottom={15}
              style={{
                position: "absolute",
                top: 0,
                left: 20,
                maxWidth: "80px"
              }}
            >
              <Image borderRadius={5} src={logo} alt="logo" />
            </Box>
            <Box px="3" marginTop="10vh" textAlign="center">
              <Text
                color="white"
                fontSize="md"
                textAlign="center"
                marginBottom="2vw"
              >
                Mint your AlphaBYTE and join the {""}
                <Link
                  href="https://discord.gg/pSBMtAttbJ"
                  isExternal
                  color="#fff"
                >
                  discord <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
              
            </Box>
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
              <GridItem w="100%" colSpan={1} marginTop={"60px"}>
                <Box
                  color="white"
                  marginTop="3px"
                  bg={"rgb(50,50,50,0.3)"}
                  padding={3}
                  justifyContent="space-between"
                  flexDirection="row"
                  display={"flex"}
                  cursor={"pointer"}
                >
                  <span>MetaREVERSED</span>
                  <span
                    style={{ padding: "2px 5px", background: "rgb(34,34,34)" }}
                  >
                    1
                  </span>
                </Box>
                <Box
                  alignItems={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Image
                    borderRadius={5}
                    src={chestImage}
                    alt="logo"
                    width={"30vw"}
                  />
                </Box>
              </GridItem>
              <GridItem w="100%" colSpan={2} padding={"0 20px"}>
                <Heading
                  color="#fff"
                  margin={"10px 0 "}
                  textAlign={"center"}
                  borderBottomColor={"rgb(100,100,100)"}
                  borderBottomWidth={"1px"}
                >
                  The AlphaBYTEs Available
                </Heading>
                <Grid
                  templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]}
                  width={"70%"}
                  marginLeft={"20%"}
                  textAlign={"center"}
                  justifyContent={"center"}
                >
                  <CardCollectionDetails
                    mint={mint}
                    handleAmount={handleAmount}
                    name="'MetaREVERSED'"
                    ImagePath={chestImage}
                    price_d="Whitelist 0.8 ETH || Public Mint 1.0"
                    amount={amount}
                    isWhitelisted={iswhitelist}
                  />
                </Grid>
              </GridItem>
            </Grid>

            <Text
              color="red"
              fontSize="md"
              textAlign="center"
              marginBottom={notification !== "" ? "2vw" : "0vw"}
            >
              {notification}
            </Text>
          </div>
          <Box px="3" marginTop="15px" textAlign="center">
            <Text
              color="white"
              fontSize="md"
              textAlign="center"
              marginBottom="2vw"
            >
              Please make sure you are connected to the right network (Eth
              Mainnet) and the correct address.Please note: Once you make the
              purchase, you cannot undo this action.
            </Text>
          </Box>
        </div>
      </div>
    : <Box textAlign="center">
        <Box
          marginBottom={15}
          style={{ position: "absolute", top: 0, left: 20, maxWidth: "80px" }}
        >
          <Image borderRadius={5} src={chestImage} alt="logo" />
        </Box>
        <Heading marginBottom="10vh" color="#fff">
          The AlphaBYTEs
        </Heading>
        <Text marginBottom="5vh" color="#fff">
          Make sure you have installed metamask extension
        </Text>
        <Button
          onClick={handleConnectWallet}
          bg="blue.800"
          color="blue.300"
          fontSize="lg"
          fontWeight="medium"
          borderRadius="xl"
          border="1px solid transparent"
          _hover={{
            borderColor: "blue.700",
            color: "blue.400"
          }}
          _active={{
            backgroundColor: "blue.800",
            borderColor: "blue.700"
          }}
        >
          Connect to a wallet
        </Button>
      </Box>;
}


