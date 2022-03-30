import React, { useState } from 'react';

//import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Container, } from '@chakra-ui/react';
import { ChakraProvider, theme, Container, } from '@chakra-ui/react';
import Header from './components/Header'
import Guesses from './components/Guesses'
//import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';

function App() {
  const [unlimited, setUnlimited] = useState(false)
  return (
    <ChakraProvider theme={theme}>
      <Container  >
        <Header setUnlimited={setUnlimited} unlimited={unlimited} />
        <hr style={{borderStyle: "solid", position:"absolute", borderColor:"black", borderWidth:"2px", width: "120vw", right:"1px", marginBottom: "8px"}}  />

        <Guesses unlimited={unlimited} />
        
      </Container>
    </ChakraProvider>
  );
}

export default App;
