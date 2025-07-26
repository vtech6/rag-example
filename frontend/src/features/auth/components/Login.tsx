import {
  Box,
  Button,
  Field,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useLoginMutation } from "../api/api";
import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const [login, { isError, isLoading }] = useLoginMutation();
  const { register, handleSubmit, formState, getValues } = useForm<LoginForm>();
  const handleLogin = useCallback(() => {
    const { email, password } = getValues();

    login({ username: email, password });
  }, [getValues, login]);

  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <VStack color={"white"} gap={4} w={"300px"} fontSize={"4xl"}>
        <Text>Login</Text>
        <Box h={8} />
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Box h={1} />
          <Input {...register("email", { required: true })} />
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Box h={1} />
          <Input
            type="password"
            {...register("password", { required: true })}
          />
        </Field.Root>

        {isError && (
          <Text fontSize={"md"} color={"red.400"}>
            Email or password invalid
          </Text>
        )}
        <Box h={8} />
        <Button type={"submit"} variant={"outline"}>
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>
      </VStack>
    </form>
  );
}

export default Login;
