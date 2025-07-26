import {
  VStack,
  Box,
  Text,
  Field,
  Input,
  Spinner,
  HStack,
  IconButton,
  Center,
  InputGroup,
  Presence,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDocumentQueryMutation } from "../api/api";
import { useCallback, useEffect, useState } from "react";
import { CustomDocument } from "./FileSection";
import {  LuRotateCcw, LuSend } from "react-icons/lu";

function FileQueryView({
  selectedDocument,
}: {
  selectedDocument: CustomDocument;
}) {
  const [sendDocumentQuery, { data, isLoading, isSuccess }] =
    useDocumentQueryMutation();
  const { register, handleSubmit, formState, getValues } = useForm<{
    question: string;
  }>();
  const handleQuestion = useCallback(() => {
    const { question } = getValues();

    sendDocumentQuery({ question, id: selectedDocument.group_id });
  }, [getValues, selectedDocument, sendDocumentQuery]);

  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowAnswer(true);
    }
  }, [isSuccess]);

  const errors = formState.errors;
  return (
    <VStack h={"100%"} w={"100%"} pt={"32px"} pl={12} pr={12}>
      <Text
        textOverflow={"ellipsis"}
        maxLines={1}
        whiteSpace={"nowrap"}
        fontSize={"4xl"}
        alignSelf={"flex-start"}
      >
        Currently Viewing: {selectedDocument.group_id}
      </Text>
      <Center h={"100%"} w={"100%"} p={20}>
        <Presence w={"100%"} present={showAnswer === false}>
          <form
            onSubmit={handleSubmit(handleQuestion)}
            style={{ width: "100%" }}
          >
            <Field.Root invalid={!!errors.question} w={"100%"}>
              <Field.Label fontSize={"5xl"}>Type in your question</Field.Label>
              <Box h={8} />
              <HStack w={"100%"}>
                <InputGroup
                  endElement={
                    <IconButton
                      size={"2xl"}
                      type={"submit"}
                      variant={"ghost"}
                      alignSelf={"center"}
                    >
                      {isLoading ? <Spinner size={"md"} /> : <LuSend />}
                    </IconButton>
                  }
                >
                  <Input
                    borderRadius={12}
                    borderColor={"gray.400"}
                    size={"2xl"}
                    w={"90%"}
                    {...register("question", { required: true })}
                    placeholder="Type in your question"
                  />
                </InputGroup>
              </HStack>
            </Field.Root>
          </form>
        </Presence>
        <Presence present={showAnswer === true}>
          {data && (
            <Text fontSize={"3xl"}>
              {data.answer.kwargs.content ?? "No answer"}
            </Text>
          )}
        </Presence>
        <Presence present={showAnswer === true}>
          <IconButton
            onClickCapture={() => setShowAnswer(false)}
            position={"absolute"}
            bottom={12}
            right={12}
            size={"2xl"}
          >
            <LuRotateCcw />
          </IconButton>
        </Presence>
      </Center>
    </VStack>
  );
}

export default FileQueryView;
