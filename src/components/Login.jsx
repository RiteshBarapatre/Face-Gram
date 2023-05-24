import React, { useContext, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useDisclosure,
  Stack,
  Input,
  Text,
  Avatar,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AppContext } from "../Context";
import { useToast } from "@chakra-ui/react";
import instance from "../../axios";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser, cookies, removeCookie } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [loginData, setLoginData] = useState({
    emailOrUserName: "",
    password: "",
  });

  const [file, setFile] = useState();

  const handelSignUp = () => {
    try {
      if (
        !signUpData.name ||
        !signUpData.email ||
        !signUpData.password ||
        !signUpData.cPassword
      ) {
        toast({
          title: "Please fill the full form",
          description: "All fields should be filled before submission",
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
      } else if (signUpData.password !== signUpData.cPassword) {
        toast({
          title: "Password is not matching...",
          description: "Please Check your password and try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", signUpData.name);
        formData.append("email", signUpData.email);
        formData.append("password", signUpData.password);
        formData.append("avatar", file);

        instance
          .post("/api/auth/signup", formData)
          .then((res) => {
            setUser(res.data);
            setLoading(false);
            onClose();
            toast({
              title: `Welcome ${res.data.name}`,
              description: "Let's begin your new journey",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            console.log(res);
          })
          .catch((err) => {
            setLoading(false);
            toast({
              title: "This Email Or UserName Already exist !!!",
              description: "Please use different Email or UserName",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Please try after some time",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handelLogin = () => {
    if (!loginData.emailOrUserName || !loginData.password) {
      toast({
        title: "Please fill the full form",
        description: "All fields should be filled before submission",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        setLoading(true);
        instance
          .post("/api/auth/login", {
            emailOrUserName: loginData.emailOrUserName,
            password: loginData.password,
          })
          .then((res) => {
            setUser(res.data);
            setLoading(false);
            onClose();
            toast({
              title: `Welcome ${res.data.name}`,
              description: "Let's begin your new journey",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            console.log(res);
          })
          .catch((err) => {
            setLoading(false);
            toast({
              title: "This Email Or UserName Doesn't exist !!!",
              description: "Please use different Email Or UserName",
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
  };

  const logOut = () => {
    const confirm = window.confirm("Are you sure you want to log out");
    confirm && removeCookie("user", { path: "/" });
  };

  const navigateToPosts = () => {
    navigate("/userposts");
  };

  return (
    <>
      {cookies?.user ? (
        <Menu>
          <MenuButton>
            <Avatar
              src={cookies.user?.profilePic}
              name={cookies.user?.name}
              size="sm"
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={navigateToPosts} color="black">
              Your Posts
            </MenuItem>
            <MenuItem onClick={logOut} color="black">
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button colorScheme="facebook" marginLeft={5} onClick={onOpen}>
          Login
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} colorScheme="facebook">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login And SignUp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>Login</Tab>
                <Tab>SignUp</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Stack spacing={6}>
                    <Input
                      placeholder="Email or UserName..."
                      size="lg"
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          emailOrUserName: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Password..."
                      size="lg"
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </Stack>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={10}>
                    <Input
                      placeholder="Name..."
                      size="lg"
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, name: e.target.value })
                      }
                    />

                    <Input
                      placeholder="Email..."
                      size="lg"
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                    />

                    <Input
                      placeholder="Password..."
                      size="lg"
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                    />

                    <Input
                      placeholder="Confirm Password..."
                      size="lg"
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          cPassword: e.target.value,
                        })
                      }
                    />
                  </Stack>
                  <div className="" style={{ marginTop: "30px" }}>
                    <label htmlFor="profile">Profile Pic :</label>
                    <input
                      type="file"
                      style={{ marginTop: "10px" }}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={tabIndex == 0 ? handelLogin : handelSignUp}
              isLoading={loading}
            >
              {tabIndex == 0 ? "Login" : "SignUp"}
            </Button>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
