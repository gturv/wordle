import { Text, Box, Switch, FormControl, FormLabel } from "@chakra-ui/react"
//import { useState } from 'react'

function Header({ setUnlimited, unlimited }) {
    console.log(unlimited)
    return (
        <Box align="center" width="100%" maxHeight="10vh" >
            <Text fontWeight="bold" fontSize="4xl">Turvle</Text>
            <FormControl position='absolute' top={5} left="12px" display='flex' alignItems='center'>
            <FormLabel htmlFor='unlimited' mr='2px' mb='0'  >
                {unlimited ? "Unlimited" : <><span style={{color: "white"}}>____</span><span>Daily</span></>}
            </FormLabel>
            <Switch id='unlimited' value={unlimited} onChange={()=>setUnlimited(!unlimited)} />
            </FormControl>
        </Box>
    )
}

export default Header

