"use client";
import { Toaster } from "@/components/ui/toaster";
import { useLoginMutation } from "@/features/auth/api/api";
import { useSession } from "@/features/auth/auth";

import FileSection from "@/features/documents/components/FileSection";
import WelcomeSection from "@/features/welcome/components/WelcomeSection";
import { Center, HStack, Presence, Spinner } from "@chakra-ui/react";
import { useMemo } from "react";

export default function Home() {
  const [, { isSuccess }] = useLoginMutation();

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
    <HStack w={"100vw"} h={"100vh"} p={0}>
      <Presence present={!isLoggedIn}>
        <WelcomeSection />
      </Presence>
      <Presence present={isLoggedIn}>
        <FileSection />
      </Presence>
      <Toaster />
    </HStack>
  );
}
