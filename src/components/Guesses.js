import { useState } from 'react'
import { Text, Box, Grid, GridItem } from "@chakra-ui/react"

function Guesses() {
    const secretWord = "HAPPY"
    const [currentGuessWord, setCurrentGuessWord] = useState("")
    const [currentGuessNumber, setCurrentGuessNumber] = useState(1)
    const [guessOne, setGuessOne] = useState("")
    const [guessTwo, setGuessTwo] = useState("")
    const [guessThree, setGuessThree] = useState("")
    const [guessFour, setGuessFour] = useState("")
    const [guessFive, setGuessFive] = useState("")
    const [guessSix, setGuessSix] = useState("")
    const [correctLetterCorrectSpot, setCorrectLetterCorrectSpot] = useState([])
    const [correctLetterWrongSpot, setCorrectLetterWrongSpot] = useState([])

    function checkLetters() {
        if (currentGuessWord[0] === secretWord[0] && !correctLetterCorrectSpot.includes(currentGuessWord[0])) {
            setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[0]])
            setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[0] ))
        }
        if (secretWord.includes(currentGuessWord[0]) && !correctLetterWrongSpot.includes(currentGuessWord[0])) {
            setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[0]])
        }
        if (currentGuessWord[1] === secretWord[1] && !correctLetterCorrectSpot.includes(currentGuessWord[1])) {
            setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[1]])
            setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[1]))
        }
        if (secretWord.includes(currentGuessWord[1]) && !correctLetterWrongSpot.includes(currentGuessWord[1])) {
            setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[1]])
        }
        if (currentGuessWord[2] === secretWord[2] && !correctLetterCorrectSpot.includes(currentGuessWord[2])) {
            setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[2]])
            setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[2]))
        }
        if (secretWord.includes(currentGuessWord[2]) && !correctLetterWrongSpot.includes(currentGuessWord[2])) {
            setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[2]])
        }
        if (currentGuessWord[3] === secretWord[3] && !correctLetterCorrectSpot.includes(currentGuessWord[3])) {
            setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[3]])
            setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[3]))
        }
        if (secretWord.includes(currentGuessWord[3]) && !correctLetterWrongSpot.includes(currentGuessWord[3])) {
            setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[3]])
        }
        if (currentGuessWord[4] === secretWord[4] && !correctLetterCorrectSpot.includes(currentGuessWord[4])) {
            setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[4]])
            setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[4]))
        }
        if (secretWord.includes(currentGuessWord[4]) && !correctLetterWrongSpot.includes(currentGuessWord[4])) {
            setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[4]])
        }
    }

    console.log(correctLetterCorrectSpot,correctLetterWrongSpot)

    function displayIfThisGuess(guessNumber, idx) {
        if (guessNumber === currentGuessNumber) {
            return currentGuessWord[idx]
        }
        return ""
    }

    //const guessNumArray = []
    const topRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const middleRowKeys= ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const bottomRowKeys = [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M' ]
    const keyClick = e => {
        if (currentGuessWord.length < 5) {
            setCurrentGuessWord(current => current + e.target.title)
            console.log(currentGuessWord)

        }
    }
    const submitGuess = () => {
        if (currentGuessWord.length !== 5) {
            return
        }
        if (currentGuessWord === secretWord) {
            alert("Congrats you guessed the correct word!")
        }
        switch (currentGuessNumber) {
            case 1:
                setGuessOne(currentGuessWord)
                checkLetters()
                setCurrentGuessWord("")
                setCurrentGuessNumber(2)
                return
            case 2:
                setGuessTwo(currentGuessWord)
                checkLetters()
                setCurrentGuessWord("")
                setCurrentGuessNumber(3)   
                return 
            case 3:
                setGuessThree(currentGuessWord)
                checkLetters()
                setCurrentGuessWord("")
                setCurrentGuessNumber(4)   
                return 
            case 4:
                setGuessFour(currentGuessWord)
                checkLetters()
                setCurrentGuessWord("")
                setCurrentGuessNumber(5)   
                return 
            case 5:
                setGuessFive(currentGuessWord)
                checkLetters()
                setCurrentGuessWord("")
                setCurrentGuessNumber(6)   
                return 
            case 6:
                setGuessSix(currentGuessWord)
                checkLetters()
                setCurrentGuessWord("")
                alert("Wrong, you lose")
                return 
            default:
                break;
        }
    }

    const backspace = e => {
        console.log("backspace")
        setCurrentGuessWord(current => current.slice(0, -1))
    }
    console.log("current word", currentGuessWord)
    console.log("current guees number", currentGuessNumber)

    function correctSpot(idx, guessNumber) { // put this for background color, return green
        if (secretWord[idx] === guessNumber[idx]) {
            return "green"
        }
        if (secretWord.includes(guessNumber[idx])) {
            return "yellow"
        }
        return "none"
    }

    

    //control background color for keys if they've been guessed or correct
     function correctKey(k) {
        if (correctLetterCorrectSpot.includes(k)) {
            return 'green'
        }
        if (correctLetterWrongSpot.includes(k)) {
            return 'yellow'
        }
        return 'grey'
    } 

    return (
        <Box>
        <Box p="5px 8px 17px 5px">
            <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(5, 1fr)" gap={4} >
                <GridItem backgroundColor={correctSpot(0,guessOne)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} align="center" ><Text fontSize="4xl">{guessOne[0] || currentGuessWord[0]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessOne)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessOne[1] || currentGuessWord[1]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessOne)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessOne[2] || currentGuessWord[2]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessOne)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessOne[3] || currentGuessWord[3]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessOne)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessOne[4] || currentGuessWord[4]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessTwo)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessTwo[0] || displayIfThisGuess(2,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessTwo)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessTwo[1] || displayIfThisGuess(2,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessTwo)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessTwo[2] || displayIfThisGuess(2,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessTwo)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessTwo[3] || displayIfThisGuess(2,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessTwo)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessTwo[4] || displayIfThisGuess(2,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessThree)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessThree[0] || displayIfThisGuess(3,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessThree)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessThree[1] || displayIfThisGuess(3,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessThree)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessThree[2] || displayIfThisGuess(3,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessThree)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessThree[3] || displayIfThisGuess(3,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessThree)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessThree[4] || displayIfThisGuess(3,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessFour)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFour[0] || displayIfThisGuess(4,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessFour)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFour[1] || displayIfThisGuess(4,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessFour)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFour[2] || displayIfThisGuess(4,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessFour)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFour[3] || displayIfThisGuess(4,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessFour)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFour[4] || displayIfThisGuess(4,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessFive)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFive[0] || displayIfThisGuess(5,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessFive)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFive[1] || displayIfThisGuess(5,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessFive)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFive[2] || displayIfThisGuess(5,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessFive)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFive[3] || displayIfThisGuess(5,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessFive)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessFive[4] || displayIfThisGuess(5,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessSix)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessSix[0] || displayIfThisGuess(6,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessSix)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessSix[1] || displayIfThisGuess(6,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessSix)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessSix[2] || displayIfThisGuess(6,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessSix)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessSix[3] || displayIfThisGuess(6,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessSix)} borderColor="black" borderStyle='solid' borderWidth={2} rowSpan={1} colSpan={1}><Box height={12} width={12} ><Text fontSize="4xl">{guessSix[4] || displayIfThisGuess(6,4)}</Text></Box></GridItem>
            </Grid>
        </Box>
        <Box>
            <Box align='center' alignItems='center' display="flex" >

                {topRowKeys.map(k => {
                    return <Box key={k} margin="auto" pt="8px" h="40px" as="span" w="9%" mr={1} title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                })}
            </Box>

            <Box alignItems='center' display="flex" align="center" justifyContent="space-around"  mt={2} >
                {middleRowKeys.map(k => {
                return <Box key={k} margin="auto" pt="8px" h="40px" as="span" w="9%" mr={1} title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                })}
            </Box>

            <Box alignItems='center' display="flex" align="center" justifyContent="space-around"  mt={2}>
                <Box as="span" w="10%" margin="auto" pt="8px" h="40px" mr={1} onClick={submitGuess} bg="grey" >Ent</Box>
                    {bottomRowKeys.map(k => {
                    return <Box key={k} as="span" w="9%" margin="auto" pt="8px" h="40px" mr={1} title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                    })}
                <Box as="span" margin="auto" pt="8px" h="40px" w="101" mr={1} onClick={backspace} bg="grey" >Back</Box>   
            </Box>

        </Box>
        </Box>
    )
}

export default Guesses