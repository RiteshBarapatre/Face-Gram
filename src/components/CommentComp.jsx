import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Flex, Avatar, Box, Heading, Text } from '@chakra-ui/react'

const CommentComp = ({elem}) => {
    
  return (
    <Card maxW='md' marginBottom={6}>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name={elem?.name} src={elem?.profilePic} />
        <Box>
          <Heading size='sm'>{elem?.name}</Heading>
          <Text>{elem?.email}</Text>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
      {elem?.comment}
    </Text>
  </CardBody>
</Card>
  )
}

export default CommentComp