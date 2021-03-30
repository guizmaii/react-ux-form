import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import * as React from "react";
import validator from "validator";
import { useForm } from "../../../src";
import { Input } from "../components/Input";
import { Page } from "../components/Page";

export const BasicForm = () => {
  const { Field, resetForm, submitForm } = useForm({
    firstName: {
      strategy: "onFirstBlur",
      initialValue: "",
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (value === "") {
          return "First name is required";
        }
      },
    },
    lastName: {
      strategy: "onFirstBlur",
      initialValue: "",
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (value === "") {
          return "Last name is required";
        }
      },
    },
    emailAddress: {
      strategy: "onFirstSuccessOrFirstBlur",
      initialValue: "",
      sanitize: (value) => value.trim(),
      validate: (value) => {
        if (!validator.isEmail(value)) {
          return "A valid email is required";
        }
      },
    },
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    submitForm(
      (values) => {
        console.log("values", values);

        toast({
          title: "Submission succeeded",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      (errors) => {
        console.log("errors", errors);

        toast({
          title: "Submission failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    );
  };

  const toast = useToast();

  return (
    <Page title="Basic">
      <form onSubmit={onSubmit}>
        <Field name="firstName">
          {({ error, onBlur, onChange, ref, valid, validating, value }) => (
            <Input
              label="First name"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Field name="lastName">
          {({ error, onBlur, onChange, ref, valid, validating, value }) => (
            <Input
              label="Last name"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Field name="emailAddress">
          {({ error, onBlur, onChange, ref, valid, validating, value }) => (
            <Input
              label="Email address"
              error={error}
              onBlur={onBlur}
              onChangeText={onChange}
              ref={ref}
              valid={valid}
              validating={validating}
              value={value}
            />
          )}
        </Field>

        <Box height={4} />

        <HStack spacing={3}>
          <Button onClick={resetForm}>Reset</Button>

          <Button colorScheme="green" onClick={onSubmit} type="submit">
            Submit
          </Button>
        </HStack>
      </form>
    </Page>
  );
};