import { Text, Box } from "@chakra-ui/react"

function Header() {
    return (
        <Box borderStyle='solid' borderWidth={2} align="center" width="100%" maxHeight={40} >
            <Text fontSize="4xl">-------Wurdle------</Text>
        </Box>
    )
}

export default Header