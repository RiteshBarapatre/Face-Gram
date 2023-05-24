import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineEllipsis,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Comment from "./Comment";
import "../styles/CardComp.css";
import { AppContext } from "../Context";
import instance from "../../axios";
import LikedBy from "./LikedBy";

const CardComp = ({ elem }) => {
  const { cookies } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [likes, setLikes] = useState([]);

  const editPost = () => {
    onOpen();
  };

  const isLiked = () => {
    const hasLiked = likes.some((elem) => {
      return elem?.email === cookies.user?.email;
    });
    return hasLiked;
  };

  const likeFunc = async () => {
    try {
      const response = await instance.get(`/post/fetchlikes/${elem._id}`);
      console.log(response.data);
      setLikes(response.data.reverse());
      isLiked();
    } catch (error) {
      toast({
        title: "Something is wrong in fetching likes",
        description: "Please try after some time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handelEdit = () => {
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
        formData.append("postId", elem._id);
        formData.append("caption", caption);
        formData.append("photo", file);
        instance
          .put("/post/updatepost", formData)
          .then((res) => {
            setLoading(false);
            onClose();
            toast({
              title: `Your post is Updated`,
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
              title: "Something is wrong in updating...",
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

  const deletePost = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post ??"
    );

    try {
      confirm &&
        instance.delete(`/post/deletepost/${elem._id}`).then((res) => {
          console.log(res);
          toast({
            title: "Your post is deleted...",
            description: "Please refresh to see changes",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      toast({
        title: "Something is wrong...",
        description: "Please Try after some time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const likePost = () => {
    if (cookies.user) {
      try {
        instance
          .post("/post/like", {
            name: cookies.user.name,
            email: cookies.user.email,
            profilePic: cookies.user.profilePic,
            postId: elem._id,
          })
          .then((res) => {
            likeFunc();
            toast({
              title: `Post Liked`,
              description: "",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            console.log(res);
            isLiked();
          })
          .catch((err) => {
            toast({
              title: "Somthing is wrong in liking this post",
              description: "Please use different Email Or UserName",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      } catch (error) {
        toast({
          title: "Something is wrong in Liking this post...",
          description: "Please Try after some time",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "You first have to login to like this post",
        description: "Please Login first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    likeFunc();
    isLiked();
  }, []);


  const disLikePost = ()=>{
    try {
      instance.delete(`/post/dislike/${cookies.user?.email}`).then((res) => {
        likeFunc()
        console.log(res);
        toast({
          title: "You removed the like from post...",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        isLiked()
      }).catch((err)=>{
        toast({
          title: "Something is wrong in disliking this post",
          description: "Please try after some time",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
    } catch (error) {
      toast({
        title: "Something is wrong t",
        description: "Please try after some time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Card
      maxW="xl"
      bgColor={"#333e87"}
      textColor={"white"}
      margin={5}
      key={elem._id}
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={elem?.name} src={elem?.profilePic} />
            <Box>
              <Heading size="sm">{elem?.name}</Heading>
              <Text>{elem?.email}</Text>
            </Box>
          </Flex>

          {elem?.email === cookies.user?.email ? (
            <Menu>
              <MenuButton>
                <IconButton
                  variant="unstyled"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<AiOutlineEllipsis size={30} />}
                />
              </MenuButton>
              <MenuList>
                <MenuItem color="black" onClick={editPost}>
                  Edit this Post
                </MenuItem>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit Your Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Stack spacing={10}>
                        <Input
                          placeholder="Caption..."
                          size="lg"
                          onChange={(e) => setCaption(e.target.value)}
                        />
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </Stack>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handelEdit}
                        isLoading={loading}
                      >
                        Edit
                      </Button>
                      <Button variant="ghost" onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <MenuItem color="black" onClick={deletePost}>
                  Delete this Post
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            ""
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{elem?.caption}</Text>
      </CardBody>
      <Image
        objectFit="cover"
        src={elem?.photo}
        alt="Post not loaded"
        width="100%"
        height={500}
      />
      <LikedBy likes={likes} />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        {isLiked() ? (
          <Button
            variant="solid"
            colorScheme="pink"
            leftIcon={<AiFillDislike />}
            onClick={disLikePost}
          >
            Dislike
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="pink"
            leftIcon={<AiFillLike />}
            onClick={likePost}
          >
            Like({likes?.length})
          </Button>
        )}

        <Comment postId={elem?._id} />
        <Button
          variant="solid"
          colorScheme="pink"
          leftIcon={<AiOutlineShareAlt />}
        >
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComp;
