import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import * as React from "react";
import { Route, Router, useLocation } from "wouter";
import { Link } from "./components/Link";
import { AsyncSubmissionForm } from "./forms/AsyncSubmissionForm";
import { AsyncValidationForm } from "./forms/AsyncValidationForm";
import { BasicForm } from "./forms/BasicForm";
import { CheckboxesForm } from "./forms/CheckboxesForm";
import { CreditCardForm } from "./forms/CreditCardForm";
import { FieldsListenerForm } from "./forms/FieldsListenerForm";
import { IBANForm } from "./forms/IBANForm";
import { InputMaskingForm } from "./forms/InputMaskingForm";
import { StrategiesForm } from "./forms/StrategiesForm";

export const App = () => {
  const [path] = useLocation();
  const isDesktop = !useBreakpointValue({ base: true, md: false });
  const { isOpen, onToggle, onClose } = useDisclosure();

  React.useEffect(onClose, [path]);

  return (
    <Router base="/react-ux-form">
      <Flex flex={1} flexDirection={{ base: "column-reverse", md: "row" }}>
        <Button
          borderRadius={0}
          display={{ base: "flex", md: "none" }}
          flexShrink={0}
          fontSize={14}
          height="48px"
          onClick={onToggle}
        >
          <HamburgerIcon height={5} width={5} marginRight={2} />
          MENU
        </Button>

        {(isDesktop || isOpen) && (
          <Flex
            backgroundColor="gray.50"
            flexDirection="column"
            overflowY="scroll"
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={4}
            paddingRight={4}
            borderColor="gray.100"
            borderStyle="solid"
            borderTopWidth={{ base: 1, md: 0 }}
            borderRightWidth={{ base: 0, md: 1 }}
            flexShrink={0}
            height={{ base: "40%", md: "auto" }}
            width={{ base: "auto", md: 320 }}
          >
            <Text
              color="gray.500"
              fontSize={12}
              fontWeight={600}
              marginLeft={3}
              marginBottom={3}
              textTransform="uppercase"
            >
              Examples
            </Text>

            <VStack align="initial" spacing={1}>
              <Link href="/">Basic</Link>
              <Link href="/strategies">Validation strategies</Link>
              <Link href="/fields-listener">Fields listener</Link>
              <Link href="/async-validation">Async validation</Link>
              <Link href="/async-submission">Async submission</Link>
              <Link href="/checkboxes">Checkboxes</Link>
              <Link href="/iban">IBAN</Link>
              <Link href="/credit-card">Credit card</Link>
              <Link href="/input-masking">Input masking</Link>
            </VStack>
          </Flex>
        )}

        <Route path="/" component={BasicForm} />
        <Route path="/strategies" component={StrategiesForm} />
        <Route path="/fields-listener" component={FieldsListenerForm} />
        <Route path="/async-validation" component={AsyncValidationForm} />
        <Route path="/async-submission" component={AsyncSubmissionForm} />
        <Route path="/checkboxes" component={CheckboxesForm} />
        <Route path="/iban" component={IBANForm} />
        <Route path="/credit-card" component={CreditCardForm} />
        <Route path="/input-masking" component={InputMaskingForm} />
      </Flex>
    </Router>
  );
};
