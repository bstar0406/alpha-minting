import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";
import "../assets/css/layout.css";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <div className="layout"></div>
      <div style={{ position: "relative" }}>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          padding="20px"
        >
          {children}
        </Flex>
      </div>
    </div>
  );
}
