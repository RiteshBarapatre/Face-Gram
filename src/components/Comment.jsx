import React, { useContext, useEffect, useState } from "react";
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
  Textarea,
  useToast,
  Text,
  Box,
} from "@chakra-ui/react";
import { AiOutlineMessage } from "react-icons/ai";
import { AppContext } from "../Context";
import CommentComp from "./CommentComp";
import instance from "../../axios";

const Comment = ({postId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cookies } = useContext(AppContext);
  const [allComments,setAllComments] = useState()
  const toast = useToast();
  const [commentText,setCommentText] = useState()
  const [loading, setLoading] = useState(false);

  const alertUser = ()=>{
    toast({
      title: "Please Login to comment on this page",
      description: "Login first enjoy interacting with posts",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  }

  const func = async ()=>{
    try {
      const response = await instance.get(`/post/fetchcomments/${postId}`)
      setAllComments(response.data.reverse())
    } catch (error) {
      toast({
        title: "Something wrong in fetching comments",
        description: "Please try after some time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(()=>{
    func()
  },[])

  const userComment = ()=>{
    if(!commentText){
      toast({
        title: "You have to write somthing to comment...",
        description: "Please write something about the post",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      try {
        setLoading(true)
        instance
          .post("/post/comment", {
            post_id: postId,
            comment: commentText,
            email : cookies.user.email,
            name : cookies.user.name,
            profilePic : cookies.user.profilePic
          })
          .then((res) => {
            setLoading(false);
            func()
            onClose();
            toast({
              title: `Comment successfully posted`,
              description: "Thanks for commenting",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((err) => {
            setLoading(false);
            toast({
              title: "Something is wrong in posting comment",
              description: "Please try after some time",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something Went Wrong",
          description: "Please try After some time",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <>
      <Button
        variant="solid"
        colorScheme="pink"
        leftIcon={<AiOutlineMessage/>}
        onClick={cookies.user ? onOpen : alertUser}
      >
        Comment ({allComments?.length})
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comment...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box overflowY={"scroll"} maxHeight={400}>
            {
              allComments?.map((elem)=>{
                return <CommentComp elem={elem} key={elem._id}/>
              })
            }
            
          </Box>
          <Textarea placeholder='Comment Something About this Post...' size="xl" padding={4} onChange={(e)=>{setCommentText(e.target.value)}}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={userComment} isLoading={loading}>
              Comment
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

export default Comment;
