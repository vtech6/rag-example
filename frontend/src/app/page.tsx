"use client";
import { Toaster } from "@/components/ui/toaster";
import { useLoginMutation } from "@/features/auth/api/api";
import { useSession } from "@/features/auth/auth";
import Login from "@/features/auth/components/Login";
import LogOut from "@/features/auth/components/LogOut";
import SignUp from "@/features/auth/components/SignUp";
import FileList from "@/features/upload/components/FileList";
import {
  Box,
  Center,
  Presence,
  Span,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";

enum SECTIONS {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
}

export default function Home() {
  const [, { isSuccess }] = useLoginMutation();
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

  const session = useSession();

  const isLoggedIn = useMemo(
    () => session && session.data?.user !== undefined,
    // session is an object
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [session, isSuccess]
  );

  if (session.isPending) {
    return (
      <Center w={"100vw"} h={"100vh"}>
        <Spinner size={"xl"} />
      </Center>
    );
  }

  return (
    <Center w="100vw" h={"100vh"}>
      <Presence present={!isLoggedIn}>
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
      </Presence>
      <Presence present={isLoggedIn}>
        <LogOut />
        <VStack w={"400px"}>
          <FileList />
        </VStack>
      </Presence>
      <Toaster />
    </Center>
  );
}
