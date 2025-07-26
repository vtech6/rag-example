import Dropzone from "@/components/dropzone/Dropzone";
import { Box, Button, Text, useFileUpload, VStack } from "@chakra-ui/react";

function FileList() {
  const fileUpload = useFileUpload({
    maxFiles: 2,
  });
  return (
    <VStack w={"400px"}>
      <Dropzone fileUpload={fileUpload} />
      <Box h={8} />
      {fileUpload.acceptedFiles.map((file) => (
        <Button
          variant={"ghost"}
          fontSize={"xl"}
          color={"white"}
          key={file.name}
        >
          {file.name}
        </Button>
      ))}
    </VStack>
  );
}

export default FileList;
