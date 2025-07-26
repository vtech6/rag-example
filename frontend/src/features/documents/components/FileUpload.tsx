"use client";
import Dropzone from "@/components/dropzone/Dropzone";
import {
  Box,
  Button,
  Spinner,
  Text,
  useFileUpload,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useUploadMutation } from "../api/api";

function FileUpload() {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: "application/pdf",
  });
  const [uploadDocument, { isLoading }] = useUploadMutation();
  const onFileLoad = useCallback(
    async (fileBlob: File) => {
      const formData = new FormData();
      formData.append("file", fileBlob, fileBlob.name);
      uploadDocument(formData);
    },
    [uploadDocument]
  );
  return (
    <VStack w={"400px"}>
      <Dropzone fileUpload={fileUpload} />
      <Box h={8} />
      {fileUpload.acceptedFiles.map((file) => (
        <Text fontSize={"xl"} color={"white"} key={file.name}>
          {file.name}
        </Text>
      ))}
      <Box h={4} />
      <Button
        fontSize={"xl"}
        variant={"outline"}
        disabled={fileUpload.acceptedFiles.length === 0}
        onClickCapture={() => onFileLoad(fileUpload.acceptedFiles[0])}
      >
        {isLoading ? <Spinner size={"xl"} /> : "Upload"}
      </Button>
    </VStack>
  );
}

export default FileUpload;
