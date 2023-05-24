import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Input,
  useToast,
} from "@chakra-ui/react";
import instance from "../../axios";
import { AppContext } from "../Context";

const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();
  const { cookies } = useContext(AppContext);
  const toast = useToast();

  const handelSubmit = () => {
    if (!caption || !file) {
      toast({
        title: "Please write caption and select photo",
        description: "All two fields are necessary",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else if (file.size > 1000000) {
      toast({
        title: "Image size should be less than 1mb",
        description: "Please select an image have size smaller than 1mb",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", cookies.user.name);
        formData.append("caption", caption);
        formData.append("photo", file);
        instance
          .post("/post/photo", formData)
          .then((res) => {
            setLoading(false);
            onClose();
            toast({
              title: `Your post is posted`,
              description: "Refresh to see it",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            console.log(res);
          })
          .catch((err) => {
            setLoading(false);
            toast({
              title: "Something is wrong in posting...",
              description: "Please Try after some time",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      } catch (error) {
        setLoading(false);
            toast({
              title: "Something is wrong...",
              description: "Please Try after some time",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
      }
    }
  };

  const userNotLogin = ()=>{
    toast({
      title: "You first have to Login",
      description: "Please Login and try Again",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <>
      <Button colorScheme="pink" onClick={cookies.user ? onOpen : userNotLogin} style={{width : "100%"}}>
        Create
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        style={{ backgroundColor: "#333e87" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={10}>
              <Input
                placeholder="Caption..."
                size="lg"
                onChange={(e) => setCaption(e.target.value)}
              />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="pink"
              mr={3}
              onClick={handelSubmit}
              isLoading={loading}
            >
              Post
            </Button>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Create;
