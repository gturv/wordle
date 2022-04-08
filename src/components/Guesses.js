import { useState, useRef, useEffect } from 'react'
import { Text, Box, Grid, GridItem, AspectRatio, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure } from "@chakra-ui/react"
//import {MdIosShare} from "react-icons/md";
import wordList from '../wordlist'
import '../App.css'
import Cookies from 'js-cookie'

function Guesses({ unlimited }) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    const { isOpen, onOpen, onClose } = useDisclosure()


    const randomInteger = Math.floor(Math.random() * 3234);
    const secretWordUnlimited = useRef(wordList[randomInteger])  //"WARNS" //wordList[randomInteger]
    console.log('secretUnlimited', secretWordUnlimited)
    const secretWordSingle = wordList[day]
    //console.log("day",day)
    console.log("secretSingle", secretWordSingle)
    const secretWord = unlimited ? secretWordUnlimited.current : secretWordSingle
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
    const [win, setWin] = useState(false)
    const [board, setBoard] = useState('\n')
    const [played, setPlayed] = useState(false)
    //console.log("GUESS NUM",currentGuessNumber)
    const guessNumArray = [guessOne,guessTwo,guessThree,guessFour,guessFive,guessSix]

    //const numTimesPlays = Cookies.get("numTimesPlayed")
    const cookieExists = Cookies.get("numTimesLost")
    if (!cookieExists) {
        Cookies.set("numTimesPlayed","0", { expires: 7 })
        Cookies.set("numTimesWon", "0", { expires: 7 })
        Cookies.set("numTimesLost", "0", { expires: 7})
        Cookies.set("winPercent","0", { expires: 7 })
        Cookies.set("currentStreak","0", { expires: 7 })
        Cookies.set("maxStreak","0", { expires: 7 })
        Cookies.set("guessedOne","0", { expires: 7 })
        Cookies.set("guessedTwo","0", { expires: 7 })
        Cookies.set("guessedThree","0", { expires: 7 })
        Cookies.set("guessedFour","0", { expires: 7 })
        Cookies.set("guessedFive","0", { expires: 7 })
        Cookies.set("guessedSix","0", { expires: 7 })
        Cookies.set("lastPlayed","0", { expires: 7 })
    }

    console.log("full cookie", Cookies.get())
    //console.log("win Percent", cookieExists.winPercent)


    useEffect(() => {
        setCurrentGuessWord("")
        setCurrentGuessNumber(1)
        setGuessOne("")
        setGuessTwo("")
        setGuessThree("")
        setGuessFour("")
        setGuessFive("")
        setGuessSix("")
        setCorrectLetterCorrectSpot([])
        setCorrectLetterWrongSpot([])
        setIncorrectLetter([])
        setLose(false)
        setWin(false)
        setBoard("\n")    
    }, [unlimited])

    console.log("unlimited Guesses.js", unlimited)
    useEffect(()=> {
        if (Cookies.get("lastPlayed") === `${day - 88}`) {
            setPlayed(true)
        } else {
            setPlayed(false)
        } 
    },[])

    useEffect(()=> {

        if(win || lose) {
           onOpen()
        }
    },[win, lose])

    useEffect(()=> {
        if (played && !unlimited) {
            setCurrentGuessWord("")
            setCurrentGuessNumber(1)
            setGuessOne("YOU")
            setGuessTwo("HAVE")
            setGuessThree("ALREA")
            setGuessFour("DY PL")
            setGuessFive("AYED")
            setGuessSix("TODAY")
        }
    })  

    // <GridItem style={correctSpot(0,guessOne,1)className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[0] || currentGuessWord[0]}</Text></AspectRatio></GridItem>
    const letterBoxes = []
    for (let guessNum of guessNumArray) {
        for (let i=0; i < 5; i++) {
            letterBoxes.push(<GridItem key={`${guessNum}${i}`} backgroundColor={correctSpot(i,guessNum,i+1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[i] || currentGuessWord[i]}</Text></AspectRatio></GridItem>)
        }
    }

    //console.log("secretWord:", secretWord)
    //console.log("GUESSED LETTERS", correctLetterCorrectSpot, correctLetterWrongSpot, incorrectLetter)
    console.log("secretWord", secretWord)

    function checkLetters() { // adds guessed letters into state

        for (let i=0; i < 5; i++) { 
            if (currentGuessWord[i] === secretWord[i] && !correctLetterCorrectSpot.includes(currentGuessWord[i])) {
                setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[i]])
                setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[i] ))
                continue
            } 
            if (secretWord.includes(currentGuessWord[i]) && !correctLetterWrongSpot.includes(currentGuessWord[i])) {
                setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[i]])
                continue
            }
            if (!secretWord.includes(currentGuessWord[i]) && !incorrectLetter.includes(currentGuessWord[i])) {
                setIncorrectLetter(curr => [...curr, currentGuessWord[i]])
            }
        }
    }
    function buildBoard() {
        for (let i=0; i<5; i++) {
            if (currentGuessWord[i] === secretWord[i]) {
                setBoard(curr => curr + '🟩')
            } else if (secretWord.includes(currentGuessWord[i])) {
                setBoard(curr => curr + '🟨')
            } else {
                setBoard(curr => curr + '⬜️')
            }
        }
        setBoard(curr => curr + '\n')
    }

    function displayIfThisGuess(guessNumber, idx) {
        if (guessNumber === currentGuessNumber) {
            return currentGuessWord[idx]
        }
        return ""
    }

    const topRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const middleRowKeys= ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const bottomRowKeys = [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M' ]
    
    const keyClick = e => {
/*         if(!unlimited && played) {
            return
        } */
        if (currentGuessWord.length < 5) {
            setCurrentGuessWord(current => current + e.target.title)
        }
    }

    function incrementCookie(cookieName) {
        const stringNum = Cookies.get(cookieName)
        const incremented = (parseInt(stringNum) + 1 ).toString()
        return Cookies.set(cookieName, incremented, { expires: 7})
    }
    function incrementGuessNumCookie(numGuesses) {   
        switch (numGuesses) {
            case 1:
                incrementCookie("numTimesWon")
                incrementCookie("numTimesPlayed")
                incrementCookie("currentStreak")
                return incrementCookie("guessedOne")
            case 2:
                incrementCookie("numTimesWon")
                incrementCookie("numTimesPlayed")
                incrementCookie("currentStreak")
                return incrementCookie("guessedTwo")
            case 3:
                incrementCookie("numTimesWon")
                incrementCookie("numTimesPlayed")
                incrementCookie("currentStreak")
                return incrementCookie("guessedThree")
            case 4:
                incrementCookie("numTimesWon")
                incrementCookie("numTimesPlayed")
                incrementCookie("currentStreak")
                return incrementCookie("guessedFour")
            case 5:
                incrementCookie("numTimesWon")
                incrementCookie("numTimesPlayed")
                incrementCookie("currentStreak")
                return incrementCookie("guessedFive")
            case 6:
                incrementCookie("numTimesWon")
                incrementCookie("numTimesPlayed")
                incrementCookie("currentStreak")
                return incrementCookie("guessedSix")
            default:
                break;
        }
    }

    function submitGuessHelper(guessSetter, newGuessNum) {
        guessSetter(currentGuessWord)
        buildBoard()
        checkLetters() // adds correct and incorrect letter into state 
        if ((currentGuessWord === secretWord) && !unlimited) {
            setBoard(curr => `Turvle ${day-88} ${currentGuessNumber}/6` + curr)
            incrementGuessNumCookie(newGuessNum-1)
            Cookies.set("lastPlayed", `${day - 88}`)
            return setTimeout(() => {setWin(true)},1900)
        }
        if ((currentGuessWord === secretWord) && unlimited) {
            setBoard(curr => `Turvle ${day-88} ${currentGuessNumber}/6` + curr)
            return setTimeout(() => {setWin(true)},1900)
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
                buildBoard()
                checkLetters()
                setBoard(curr => `Turvle ${day-88} ${currentGuessNumber}/6` + curr)
                if ((currentGuessWord === secretWord) && !unlimited) {
                    incrementGuessNumCookie(6)
                    Cookies.set("lastPlayed", `${day - 88}`)
                    return setTimeout(() => {setWin(true)},1900)
                }
                if ((currentGuessWord === secretWord) && unlimited) {
                    return setTimeout(() => {setWin(true)},1900)
                }
                setCurrentGuessNumber(7)
                if (!unlimited){
                    incrementCookie("numTimesLost")
                    incrementCookie("numTimesPlayed")
                    Cookies.set("currentStreak", "0", { expires: 7})
                    Cookies.set("lastPlayed", (day-88).toString())
                }
                setTimeout(() => {setLose(true)},1900)
                return 
            default:
                break;
        }
    }

    const backspace = e => {
        setCurrentGuessWord(current => current.slice(0, -1))
    }

    function correctSpot(idx, guessNumber, guessInt) { // put this for background color, return green
        if (played && !unlimited) {
            return { backgroundColor: 'lightgrey' }
        }
        if(lose) {
            return {backgroundColor: 'red'}
        }
        if (currentGuessWord.length === 5 && !wordList.includes(currentGuessWord) && guessInt === currentGuessNumber) {
            return { backgroundColor: "lightcoral", borderColor: "black",  animation: "shake .5s ease-in-out"} // should make the red fade in and out
        }
        if (secretWord[idx] === guessNumber[idx]) {
            return {backgroundColor: "lightgreen", borderColor: "black", transitionDelay: `${300*idx + 200}ms`}
        }
        if (secretWord.includes(guessNumber[idx])) {
            return {backgroundColor: "khaki", borderColor: "black", transitionDelay: `${300*idx + 200}ms`}
        }
        if (currentGuessNumber > guessInt) {
            return {backgroundColor: 'lightgrey', borderColor: "black", transitionDelay: `${300*idx + 200}ms`}
        }
        if (currentGuessNumber === guessInt && currentGuessWord.length >= idx + 1) {
            return { borderColor: "black", backgroundColor: "#E8E8E8", transition: "border-color 0.25s linear" }
        }
        if (currentGuessWord.length < 5) {
            return {backgroundColor: "white", transition: "background-color 0.5s linear" }
        }
        return 
    }
    //control background color for keys if they've been guessed or correct
     function correctKey(k) {
        if (played && !unlimited) {
            return { backgroundColor: 'white', borderColor: "black", borderStyle:"solid", borderWidth: "1px" }
        }
        if (correctLetterCorrectSpot.includes(k)) {
            return {backgroundColor: 'mediumseagreen', transitionDelay: "1500ms"}
        }
        if (correctLetterWrongSpot.includes(k)) {
            return {backgroundColor: 'gold', transitionDelay: "1500ms"}
        }
        if (incorrectLetter.includes(k)) {
            return {backgroundColor:'grey', transitionDelay: "1500ms"}
        }
        return {backgroundColor: 'silver'}
    } 

    function onShare() {
        navigator.share({
            text: board
        })
    }


    const numTimesPlayed = parseInt(Cookies.get("numTimesPlayed"))
    const numWins = parseInt(Cookies.get("numTimesWon"))

    function createModal() {
        return <><Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="5xl" align="center">You {win ? "Win" : "Lose"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {lose ?  <Text align="center" fontWeight='bold'>You SUCK! The correct word was "{secretWord}". Refresh to play again</Text> : ""}
            <Text>Played: {numTimesPlayed}</Text>
            <Text> Win %: {numWins/numTimesPlayed * 100}%</Text>
            <Text> Current Streak: {Cookies.get("currentStreak")}</Text>
            <Text align="center" fontSize="2xl" >Guess Distribution</Text>
            <Text>1: {Cookies.get("guessedOne")}</Text>
            <Text>2: {Cookies.get("guessedTwo")}</Text>
            <Text>3: {Cookies.get("guessedThree")}</Text>
            <Text>4: {Cookies.get("guessedFour")}</Text>
            <Text>5: {Cookies.get("guessedFive")}</Text>
            <Text>6: {Cookies.get("guessedSix")}</Text>
            <Text>Lost: {Cookies.get("numTimesLost")}</Text>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme='green' constiant='outline' onClick={onShare} >Share</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>
    }


    // {letterBoxes}


    return (
        <Box mt="12px">
        <Box p="5px 8px 10px 5px"  >
            <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(5, 1fr)" gap={1} >
               
                <GridItem style={correctSpot(0,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[0] || currentGuessWord[0]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(1,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align="center" fontSize="5xl">{guessOne[1] || currentGuessWord[1]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(2,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[2] || currentGuessWord[2]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(3,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[3] || currentGuessWord[3]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(4,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[4] || currentGuessWord[4]}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(0,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[0] || displayIfThisGuess(2,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(1,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[1] || displayIfThisGuess(2,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(2,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[2] || displayIfThisGuess(2,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(3,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[3] || displayIfThisGuess(2,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(4,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[4] || displayIfThisGuess(2,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(0,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[0] || displayIfThisGuess(3,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(1,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[1] || displayIfThisGuess(3,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(2,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[2] || displayIfThisGuess(3,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(3,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[3] || displayIfThisGuess(3,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(4,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[4] || displayIfThisGuess(3,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(0,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[0] || displayIfThisGuess(4,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(1,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[1] || displayIfThisGuess(4,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(2,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[2] || displayIfThisGuess(4,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(3,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[3] || displayIfThisGuess(4,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(4,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[4] || displayIfThisGuess(4,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(0,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[0] || displayIfThisGuess(5,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(1,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[1] || displayIfThisGuess(5,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(2,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[2] || displayIfThisGuess(5,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(3,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[3] || displayIfThisGuess(5,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(4,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[4] || displayIfThisGuess(5,4)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(0,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[0] || displayIfThisGuess(6,0)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(1,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[1] || displayIfThisGuess(6,1)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(2,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[2] || displayIfThisGuess(6,2)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(3,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[3] || displayIfThisGuess(6,3)}</Text></AspectRatio></GridItem>
                <GridItem style={correctSpot(4,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[4] || displayIfThisGuess(6,4)}</Text></AspectRatio></GridItem>
            </Grid>
        </Box>
        <Box  >
            <Box align='center' className='keyBox'  >

                {topRowKeys.map(k => {
                    return <Box key={k} as="span" className='key' title={k} onClick={keyClick} style={correctKey(k)} >{k}</Box>
                })}
            </Box>

            <Box align='center' className='keyBox' >
                {middleRowKeys.map(k => {
                return <Box key={k} as="span" className='key' title={k} onClick={keyClick} style={correctKey(k)} >{k}</Box>
                })}
            </Box>

            <Box align='center' className='keyBoxBottom'>
                <Box as="span" className='specialKey'   onClick={submitGuess} >Ent</Box>
                    {bottomRowKeys.map(k => {
                    return <Box key={k} as="span" className='key' title={k} onClick={keyClick} style={correctKey(k)} >{k}</Box>
                    })}
                <Box as="span" className='specialKey' onClick={backspace} >Back</Box>   
            </Box>
                     {lose && unlimited ?  <Text align="center" fontWeight='bold'>You SUCK! The correct word was "{secretWord}". Refresh to play again</Text> : ""}
                     {win && unlimited ? <Text align="center" fontWeight='bold'>You WIN! <span onClick={()=> window.location.reload()} style={{textDecoration:"underline"}}>Refresh</span> to play again </Text>: ""}
                     {win && !unlimited ? <Text align="center" fontWeight='bold'>You WIN! Switch to unlimited to play again </Text>: ""}
{/*                      {lose && !unlimited ? createModal() : ""}
                     {win && !unlimited ? createModal()
                      : ""} */}
                      {createModal()}
                    
        </Box>
        </Box>
    )
}

export default Guesses