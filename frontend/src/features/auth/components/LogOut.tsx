import { IconButton } from "@chakra-ui/react";
import { useSignOutMutation } from "../api/api";
import { LuDoorClosed } from "react-icons/lu";

function LogOut() {
  const [signOut] = useSignOutMutation();
  return (
    <IconButton
      position={"absolute"}
      top={"32px"}
      right={"32px"}
      variant={"outline"}
      onClickCapture={() => signOut()}
    >
      {<LuDoorClosed />}
    </IconButton>
  );
}

export default LogOut;
