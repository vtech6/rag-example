"use client";
import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useGetFileNamesQuery } from "../api/api";
import LogOut from "@/features/auth/components/LogOut";
import FileUpload from "./FileUpload";
import { useState } from "react";
import FileQueryView from "./FileQueryView";

export type CustomDocument = {
  group_id: string;
};

const FileSection = () => {
  const { data } = useGetFileNamesQuery();

  const [selectedDocument, setSelectedDocument] = useState<
    CustomDocument | undefined
  >();

  return (
    <HStack w={"100vw"} h={"100vh"}>
      <VStack
        p={8}
        justifyContent={"space-between"}
        h={"100%"}
        bgColor={"gray.900"}
        w={"300px"}
        color={"white"}
      >
        <VStack w={"100%"}>
          <Text fontSize={"2xl"}>Your Documents</Text>
          <Box h={4} />
          <Box h={"1px"} w={"100%"} bgColor={"gray.700"} />
          <Box h={4} />
          {data?.files.map((item) => {
            const isSelected = selectedDocument?.group_id === item.group_id;
            return (
              <Button
                variant={"ghost"}
                _hover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                bgColor={isSelected ? "rgba(255,255,255,0.1)" : "transparent"}
                w={"100%"}
                key={item.group_id}
                onClickCapture={() => setSelectedDocument(item)}
              >
                {item.group_id}
              </Button>
            );
          })}
        </VStack>
        <Button onClickCapture={() => setSelectedDocument(undefined)}>
          Upload New Files{" "}
        </Button>
      </VStack>
      <Center w={"100%"} h={"100vh"}>
        <LogOut />

        {!selectedDocument && (
          <VStack w={"400px"}>
            <FileUpload />
          </VStack>
        )}
        {selectedDocument && (
          <FileQueryView selectedDocument={selectedDocument} />
        )}
      </Center>
    </HStack>
  );
};

export default FileSection;
