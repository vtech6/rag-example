import {
  Box,
  Button,
  Field,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useSignUpMutation } from "../api/api";
import { toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";

type RegistrationForm = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const [signUp, { isSuccess, isError, isLoading }] = useSignUpMutation();
  const { register, handleSubmit, formState, getValues } =
    useForm<RegistrationForm>();
  const handleSignUp = useCallback(() => {
    const { name, email, password } = getValues();

    signUp({ name, username: email, password });
  }, [getValues, signUp]);

  const { errors } = formState;

  useEffect(() => {
    if (isSuccess) {
      toaster.create({
        title: "Success!",
        type: "success",
        description: "Account created successfully.",
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toaster.create({
        title: "Oops!",
        type: "error",
        description: "Something went wrong.",
      });
    }
  }, [isError]);
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <VStack color={"white"} gap={4} w={"300px"} fontSize={"4xl"}>
        <Text>Sign Up</Text>
        <Box h={8} />
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Box h={1} />

          <Input {...register("name", { required: true })} />
        </Field.Root>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Box h={1} />

          <Input {...register("email", { required: true })} />
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Box h={1} />

          <Input
            {...register("password", { required: true })}
            type="password"
          />
        </Field.Root>
        <Box h={8} />

        <Button type={"submit"} variant={"outline"}>
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>
      </VStack>
    </form>
  );
}

export default SignUp;
