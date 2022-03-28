import React from 'react';

//import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme, Container, } from '@chakra-ui/react';
import { ChakraProvider, Box, theme, Container, } from '@chakra-ui/react';
import Header from './components/Header'
import Guesses from './components/Guesses'
//import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container borderStyle='solid' borderWidth={1} >
        <Header />
        <Guesses />
        
      </Container>
    </ChakraProvider>
  );
}

export default App;
