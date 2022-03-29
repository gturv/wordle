import { useState, useRef } from 'react'
import { Text, Box, Grid, GridItem, AspectRatio } from "@chakra-ui/react"
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

    // <GridItem style={correctSpott(0,guessOne,1)className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessOne[0] || currentGuessWord[0]}</Text></AspectRatio></GridItem>
    const letterBoxes = []
    for (let guessNum of guessNumArray) {
        for (let i=0; i < 5; i++) {
            letterBoxes.push(<GridItem key={`${guessNum}${i}`} backgroundColor={correctSpot(i,guessNum,i+1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessOne[i] || currentGuessWord[i]}</Text></AspectRatio></GridItem>)
        }
    }

    //console.log("secretWord:", secretWord)
    //console.log("GUESSED LETTERS", correctLetterCorrectSpot, correctLetterWrongSpot, incorrectLetter)
    console.log("secretWord.current", secretWord.current)

    function checkLetters() { // adds guessed letters into state
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
    function submitGuessHelper(guessSetter, newGuessNum) {
        guessSetter(currentGuessWord)
        checkLetters() // adds correct and incorrect letter into state 
        if (currentGuessWord === secretWord.current) {
            alert("Congrats you guessed the correct word!")
        }
        setCurrentGuessWord("")
        setCurrentGuessNumber(newGuessNum)
    }

    const submitGuess = () => {
        if (currentGuessWord.length !== 5) {
            return
        }
        if (!wordList.includes(currentGuessWord)) {
            return alert("That's not a real word")
        }
        switch (currentGuessNumber) {
            case 1:
                submitGuessHelper(setGuessOne, 2)
                return
            case 2:
                submitGuessHelper(setGuessTwo, 3)   
                return 
            case 3:
                submitGuessHelper(setGuessThree, 4)  
                return 
            case 4:
                submitGuessHelper(setGuessFour, 5)
                return 
            case 5:
                submitGuessHelper(setGuessFive, 6)  
                return 
            case 6:
                setGuessSix(currentGuessWord)
                checkLetters()
                if (currentGuessWord === secretWord.current) {
                    return alert("Congrats you guessed the correct word!")
                }
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
            return "khaki"
        }
        if (currentGuessNumber > guessInt) {
            return 'lightgrey'
        }
        return "none"
    }

    function correctSpott(idx, guessNumber, guessInt) { // put this for background color, return green
        if(lose) {
            return {backgroundColor: 'red'}
        }

        if (currentGuessWord.length === 5 && !wordList.includes(currentGuessWord) && guessInt === currentGuessNumber) {
            return { backgroundColor: "lightcoral"}
        }
        if (secretWord.current[idx] === guessNumber[idx]) {
            return {backgroundColor: "lightgreen", transitionDelayMs: 200}
        }
        if (secretWord.current.includes(guessNumber[idx])) {
            return {backgroundColor: "khaki", transitionDelayMs: 200}
        }
        if (currentGuessNumber > guessInt) {
            return {backgroundColor: 'lightgrey', transitionDelayMs: 200}
        }
        if (currentGuessWord.length < 5) {
            return {backgroundColor: "white" }
        }
        return 
    }

    

    //control background color for keys if they've been guessed or correct
     function correctKey(k) {
        if (correctLetterCorrectSpot.includes(k)) {
            return 'mediumseagreen'
        }
        if (correctLetterWrongSpot.includes(k)) {
            return 'gold'
        }
        if (incorrectLetter.includes(k)) {
            return 'grey'
        }
        return 'silver'
    } 

    // {letterBoxes}

    return (
        <Box mt="12px" >
        <Box p="5px 8px 17px 5px" >
            <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(5, 1fr)" gap={3} >
               
                <GridItem style={correctSpott(0,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessOne[0] || currentGuessWord[0]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(1,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align="center" fontSize="4xl">{guessOne[1] || currentGuessWord[1]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(2,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessOne[2] || currentGuessWord[2]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(3,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessOne[3] || currentGuessWord[3]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(4,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessOne[4] || currentGuessWord[4]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(0,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessTwo[0] || displayIfThisGuess(2,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(1,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessTwo[1] || displayIfThisGuess(2,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(2,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessTwo[2] || displayIfThisGuess(2,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(3,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessTwo[3] || displayIfThisGuess(2,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(4,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessTwo[4] || displayIfThisGuess(2,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(0,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessThree[0] || displayIfThisGuess(3,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(1,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessThree[1] || displayIfThisGuess(3,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(2,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessThree[2] || displayIfThisGuess(3,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(3,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessThree[3] || displayIfThisGuess(3,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(4,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessThree[4] || displayIfThisGuess(3,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(0,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFour[0] || displayIfThisGuess(4,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(1,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFour[1] || displayIfThisGuess(4,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(2,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFour[2] || displayIfThisGuess(4,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(3,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFour[3] || displayIfThisGuess(4,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(4,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFour[4] || displayIfThisGuess(4,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(0,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFive[0] || displayIfThisGuess(5,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(1,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFive[1] || displayIfThisGuess(5,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(2,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFive[2] || displayIfThisGuess(5,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(3,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFive[3] || displayIfThisGuess(5,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(4,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessFive[4] || displayIfThisGuess(5,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(0,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessSix[0] || displayIfThisGuess(6,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(1,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessSix[1] || displayIfThisGuess(6,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(2,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessSix[2] || displayIfThisGuess(6,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(3,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessSix[3] || displayIfThisGuess(6,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpott(4,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="14vw" ratio={1}><Text align='center' fontSize="4xl">{guessSix[4] || displayIfThisGuess(6,4)}</Text></AspectRatio></GridItem>
            </Grid>
        </Box>
        <Box >
            <Box align='center' className='keyBox' >

                {topRowKeys.map(k => {
                    return <Box key={k} as="span" className='key' title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                })}
            </Box>

            <Box align='center' className='keyBox' >
                {middleRowKeys.map(k => {
                return <Box key={k} as="span" className='key' title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                })}
            </Box>

            <Box align='center' className='keyBoxBottom'>
                <Box as="span" w="10%" margin="auto" pt="8px" minH="5vh" mr={1} onClick={submitGuess} bg="silver" >Ent</Box>
                    {bottomRowKeys.map(k => {
                    return <Box key={k} as="span" className='key' title={k} onClick={keyClick} bg={correctKey(k)} >{k}</Box>
                    })}
                <Box as="span" margin="auto" pt="8px" minH="5vh" w="11%" onClick={backspace} bg="silver" >Back</Box>   
            </Box>
                    {lose ? `Correct word: ${secretWord.current}, refresh to play again`: ""}
        </Box>
        </Box>
    )
}

export default Guesses