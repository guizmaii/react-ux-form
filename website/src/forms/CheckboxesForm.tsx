import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Code, HStack, Spacer } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import * as React from "react";
import { useForm } from "react-ux-form";
import { Page } from "../components/Page";

export const CheckboxesForm = () => {
  const { Field, resetForm, submitForm } = useForm({
    termsAndConditions: {
      strategy: "onFirstChange",
      initialValue: false,
      validate: (value) => {
        if (!value) {
          return "You must accept terms and conditions";
        }
      },
    },
    emailsFromPartners: {
      strategy: "onFirstChange",
      initialValue: false,
      validate: (value) => {
        if (!value) {
          return "You must accept to receive email from partners";
        }
      },
    },
  });

  const toast = useToast();

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

  return (
    <Page
      title="Checkboxes"
      description={
        <>
          Checkboxes that must be ticked are a great use-case for <Code>onFirstChange</Code>{" "}
          validation strategy.
        </>
      }
    >
      <form onSubmit={onSubmit}>
        <Field name="termsAndConditions">
          {({ error, onChange, value }) => (
            <Checkbox
              display="flex"
              isInvalid={error != null}
              isChecked={value}
              onChange={(e) => onChange(e.target.checked)}
              color="gray.600"
            >
              Accept terms and conditions
            </Checkbox>
          )}
        </Field>

        <Spacer height={1} />

        <Field name="emailsFromPartners">
          {({ error, onChange, value }) => (
            <Checkbox
              display="flex"
              isInvalid={error != null}
              isChecked={value}
              onChange={(e) => onChange(e.target.checked)}
              color="gray.600"
            >
              Receive emails from partners
            </Checkbox>
          )}
        </Field>

        <Spacer height={12} />

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
