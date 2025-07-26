import Login from "@/features/auth/components/Login";
import SignUp from "@/features/auth/components/SignUp";
import { Center, VStack, Box, Span, Text } from "@chakra-ui/react";
import { useState, useCallback, useMemo } from "react";
enum SECTIONS {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
}
function WelcomeSection() {
  const [sectionToShow, setSectionToShow] = useState<SECTIONS>(SECTIONS.LOGIN);

  const switchSection = useCallback(() => {
    if (sectionToShow === SECTIONS.LOGIN) {
      setSectionToShow(SECTIONS.SIGN_UP);
    } else {
      setSectionToShow(SECTIONS.LOGIN);
    }
  }, [sectionToShow]);

  const isLogin = useMemo(
    () => sectionToShow === SECTIONS.LOGIN,
    [sectionToShow]
  );

  return (
    <Center w="100vw" h={"100vh"}>
      <VStack w={"100%"}>
        {sectionToShow === SECTIONS.LOGIN ? <Login /> : <SignUp />}
        <Box h={4} />
        <Text fontSize={"md"}>
          {isLogin ? "First time visiting? " : "Already have an account? "}
          <Span
            cursor={"pointer"}
            _hover={{ color: "ActiveCaption" }}
            textDecor={"underline"}
            onClickCapture={switchSection}
          >
            {isLogin ? "Click here to sign up." : "Click here to sign in."}
          </Span>
        </Text>
      </VStack>
    </Center>
  );
}

export default WelcomeSection;
