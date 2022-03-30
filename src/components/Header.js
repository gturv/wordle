import { Text, Box, Switch, FormControl, FormLabel } from "@chakra-ui/react"
import { useState } from 'react'

function Header({ setUnlimited, unlimited }) {
    console.log(unlimited)
    return (
        <Box align="center" width="100%" maxHeight="10vh" >
            <Text fontWeight="bold" fontSize="4xl">Turvle</Text>
            <FormControl position='absolute' top={5} left={4} display='flex' alignItems='center'>
            <FormLabel htmlFor='unlimited' mb='0'>
                Unlimited
            </FormLabel>
            <Switch id='unlimited' value={unlimited} onChange={()=>setUnlimited(!unlimited)} />
            </FormControl>
        </Box>
    )
}

export default Header

{/* <RadioGroup position='absolute' top={0} left={5} onChange={setValue} value={value}>
<Stack  direction='column'>
    <Radio value={1}>Daily</Radio>
    <Radio value={2}>Unlimited</Radio>
</Stack>
</RadioGroup> */}