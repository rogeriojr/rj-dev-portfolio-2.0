import { Flex, Spinner } from "@chakra-ui/react";

export function LoadingSpinner() {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex={9999}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.yellow.400"
        size="xl"
      />
    </Flex>
  );
}