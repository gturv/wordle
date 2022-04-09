import React, { useState } from 'react';

//import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Container, } from '@chakra-ui/react';
import { ChakraProvider, theme, Container, } from '@chakra-ui/react';
import Header from './components/Header'
import Guesses from './components/Guesses'
//import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';

function App() {
  const [unlimited, setUnlimited] = useState(false)
  function handleToggleUnlimited(v) {
    setUnlimited(v)
  }
  return (
    <ChakraProvider theme={theme}>
      <Container  >
        <Header setUnlimited={setUnlimited} handleToggleUnlimited={handleToggleUnlimited} unlimited={unlimited} />
        <hr style={{borderStyle: "solid", position:"absolute", borderColor:"black", borderWidth:"2px", width: "120vw", right:"1px", marginBottom: "8px"}}  />

        <Guesses unlimited={unlimited} setUnlimited={setUnlimited} />
        
      </Container>
    </ChakraProvider>
  );
}

export default App;
