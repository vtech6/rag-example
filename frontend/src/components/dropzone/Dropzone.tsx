import { Box, FileUpload, Icon, UseFileUploadReturn } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";

const Dropzone = ({ fileUpload }: { fileUpload: UseFileUploadReturn }) => {
  return (
    <FileUpload.RootProvider
      cursor={"pointer"}
      maxW="xl"
      alignItems="stretch"
      value={fileUpload}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color="fg.muted">.pdf, up to 5MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
    </FileUpload.RootProvider>
  );
};

export default Dropzone;
