import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  Text,
} from "@chakra-ui/react";

const LikedBy = ({ likes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {likes.length !== 0 ? (
        <p
          style={{ marginLeft: "10px", marginTop: "10px", cursor: "pointer" }}
          onClick={onOpen}
        >
          Liked By - {likes[0]?.name}
          {likes?.length >= 2 ? ` and ${likes?.length - 1} others` : " "}
        </p>
      ) : (
        " "
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liked By</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY={"scroll"} maxHeight={400}>
              {likes.map((elem) => {
                return (
                  <CardHeader style={{border : "1px solid grey",borderRadius : "10px",padding : "5px",margin : "10px"}}>
                    <Flex spacing="4">
                      <Flex
                        flex="1"
                        gap="4"
                        alignItems="center"
                        flexWrap="wrap"
                      >
                        <Avatar
                          name={elem?.name}
                          src={elem?.profilePic}
                        />

                        <Box>
                          <Heading size="sm">{elem?.name}</Heading>
                          <Text>{elem?.email}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                );
              })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LikedBy;
