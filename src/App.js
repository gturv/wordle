import React from 'react';

//import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Container, } from '@chakra-ui/react';
import { ChakraProvider, theme, Container, } from '@chakra-ui/react';
import Header from './components/Header'
import Guesses from './components/Guesses'
//import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container height="100vh" >
        <Header height="10vh" />
        <hr style={{borderStyle: "solid", position:"absolute", borderColor:"black", borderWidth:"2px", width: "120vw", right:"1px", marginBottom: "8px"}}  />

        <Guesses height="90vh" />
        
      </Container>
    </ChakraProvider>
  );
}

export default App;
