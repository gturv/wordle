import { useState, useRef } from 'react'
import { Text, Box, Grid, GridItem } from "@chakra-ui/react"
import wordList from '../wordlist'
import '../App.css'

function Guesses() {
    const randomInteger = Math.floor(Math.random() * 3234);
    //const secretWord = "WARNS"
    const secretWord = useRef(wordList[randomInteger])  //"WARNS" //wordList[randomInteger]
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
    const [incorrectLetter, setIncorrectLetter] = useState([])
    const [lose, setLose] = useState(false)
    const guessNumArray = [guessOne,guessTwo,guessThree,guessFour,guessFive,guessSix]

    // <GridItem backgroundColor={correctSpot(0,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessOne[0] || currentGuessWord[0]}</Text></Box></GridItem>
    const letterBoxes = []
    for (let guessNum of guessNumArray) {
        for (let i=0; i < 5; i++) {
            letterBoxes.push(<GridItem key={`${guessNum}${i}`} backgroundColor={correctSpot(i,guessNum,i+1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessOne[i] || currentGuessWord[i]}</Text></Box></GridItem>)
        }
    }

    //console.log("secretWord:", secretWord)
    console.log("GUESSED LETTERS", correctLetterCorrectSpot, correctLetterWrongSpot, incorrectLetter)
    console.log("secretWord.current", secretWord.current, secretWord.current[0])

    function checkLetters() {
        for (let i=0; i < 5; i++) {
            if (currentGuessWord[i] === secretWord.current[i] && !correctLetterCorrectSpot.includes(currentGuessWord[i])) {
                setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[i]])
                setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[i] ))
                continue
            } 
            if (secretWord.current.includes(currentGuessWord[i]) && !correctLetterWrongSpot.includes(currentGuessWord[i])) {
                setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[i]])
                continue
            }
            if (!secretWord.current.includes(currentGuessWord[i]) && !incorrectLetter.includes(currentGuessWord[i])) {
                setIncorrectLetter(curr => [...curr, currentGuessWord[i]])
            }
        }
    }


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
        if (currentGuessWord === secretWord.current) {
            alert("Congrats you guessed the correct word!")
        }
        if (!wordList.includes(currentGuessWord)) {
            return alert("That's not a real word")
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
                setLose(true)
                alert(`Wrong, you lose, correct word was ${secretWord.current}`)
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

    function correctSpot(idx, guessNumber, guessInt) { // put this for background color, return green
        if(lose) {
            return 'red'
        }
        if (currentGuessWord.length === 5 && !wordList.includes(currentGuessWord) && guessInt === currentGuessNumber) {
            return "lightcoral"
        }
        if (secretWord.current[idx] === guessNumber[idx]) {
            return "lightgreen"
        }
        if (secretWord.current.includes(guessNumber[idx])) {
            return "yellow"
        }
        if (currentGuessNumber > guessInt) {
            return 'silver'
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
        if (incorrectLetter.includes(k)) {
            return 'grey'
        }
        return 'silver'
    } 

    // {letterBoxes}

    return (
        <Box>
        <Box p="5px 8px 17px 5px">
            <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(5, 1fr)" gap={4} >
               
                <GridItem backgroundColor={correctSpot(0,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessOne[0] || currentGuessWord[0]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align="center" fontSize="4xl">{guessOne[1] || currentGuessWord[1]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessOne[2] || currentGuessWord[2]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessOne[3] || currentGuessWord[3]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessOne[4] || currentGuessWord[4]}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessTwo[0] || displayIfThisGuess(2,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessTwo[1] || displayIfThisGuess(2,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessTwo[2] || displayIfThisGuess(2,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessTwo[3] || displayIfThisGuess(2,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessTwo[4] || displayIfThisGuess(2,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessThree[0] || displayIfThisGuess(3,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessThree[1] || displayIfThisGuess(3,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessThree[2] || displayIfThisGuess(3,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessThree[3] || displayIfThisGuess(3,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessThree[4] || displayIfThisGuess(3,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFour[0] || displayIfThisGuess(4,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFour[1] || displayIfThisGuess(4,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFour[2] || displayIfThisGuess(4,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFour[3] || displayIfThisGuess(4,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFour[4] || displayIfThisGuess(4,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFive[0] || displayIfThisGuess(5,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFive[1] || displayIfThisGuess(5,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFive[2] || displayIfThisGuess(5,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFive[3] || displayIfThisGuess(5,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessFive[4] || displayIfThisGuess(5,4)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(0,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessSix[0] || displayIfThisGuess(6,0)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(1,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessSix[1] || displayIfThisGuess(6,1)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(2,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessSix[2] || displayIfThisGuess(6,2)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(3,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessSix[3] || displayIfThisGuess(6,3)}</Text></Box></GridItem>
                <GridItem backgroundColor={correctSpot(4,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><Box width={12} height={12}><Text align='center' fontSize="4xl">{guessSix[4] || displayIfThisGuess(6,4)}</Text></Box></GridItem>
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
                <Box as="span" w="10%" margin="auto" pt="8px" h="40px" mr={1} onClick={submitGuess} bg="silver" >Ent</Box>
                    {bottomRowKeys.map(k => {
                    return <Box key={k} as="span" w="9%" margin="auto" pt="8px" h="40px" mr={1} title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                    })}
                <Box as="span" margin="auto" pt="8px" h="40px" w="101" mr={1} onClick={backspace} bg="silver" >Back</Box>   
            </Box>
                    {lose ? `Correct word: ${secretWord.current}, refresh to play again`: ""}
        </Box>
        </Box>
    )
}

export default Guesses