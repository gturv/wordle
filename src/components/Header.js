import { Text, Box, Radio, RadioGroup, Stack } from "@chakra-ui/react"

function Header({ setUnlimited, unlimited }) {
    console.log("Unlimited in Header", unlimited)
    return (
        <Box align="center" width="100%" maxHeight="10vh" >
            <Text fontWeight="bold" fontSize="4xl">Turvle</Text>
            <RadioGroup onChange={setUnlimited} value={unlimited}>
      <Stack position='absolute' top={0} left={5} direction='column'>
        <Radio value={false}>Daily</Radio>
        <Radio value={true}>Unlimited</Radio>
      </Stack>
    </RadioGroup>
        </Box>
    )
}

export default Header