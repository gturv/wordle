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

    const randomInteger = useRef(Math.floor(Math.random() * 3234))
    const secretWordUnlimited = useRef(wordList[randomInteger.current])
    const secretWordSingle = wordList[day]
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
    const [played, setPlayed] = useState(null)
    const [correctFirstLetter, setCorrectFirstLetter] = useState('')
    const [correctSecondLetter, setCorrectSecondLetter] = useState('')
    const [correctThirdLetter, setCorrectThirdLetter] = useState('')
    const [correctFourthLetter, setCorrectFourthLetter] = useState('')
    const [correctFifthLetter, setCorrectFifthLetter] = useState('')
    const [otherThanFirstIdx, setOtherThanFirstIdx] = useState([])
    const [otherThanSecondIdx, setOtherThanSecondIdx] = useState([])
    const [otherThanThirdIdx, setOtherThanThirdIdx] = useState([])
    const [otherThanFourthIdx, setOtherThanFourthIdx] = useState([])
    const [otherThanFifthIdx, setOtherThanFifthIdx] = useState([])
    const [currentWordList, setCurrentWordList] = useState(wordList)
    const [numPossibilities, setNumPossibilities] = useState(3235)
    //console.log("GUESS NUM",currentGuessNumber)
    //const guessNumArray = [guessOne,guessTwo,guessThree,guessFour,guessFive,guessSix]

    //const numTimesPlays = Cookies.get("numTimesPlayed")
    const cookieExists = Cookies.get("leftAtGuess")
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
        Cookies.set("guessOne","", { expires: 7 })
        Cookies.set("guessTwo","", { expires: 7 })
        Cookies.set("guessThree","", { expires: 7 })
        Cookies.set("guessFour","", { expires: 7 })
        Cookies.set("guessFive","", { expires: 7 })
        Cookies.set("guessSix","", { expires: 7 })
        Cookies.set("incomplete", "false", {expires: 1})
        Cookies.set("leftAtGuess", "1", {expires: 7})
    }

    //console.log("full cookie", Cookies.get())
    function refreshBoard(){
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
        setCorrectFirstLetter("")
        setCorrectSecondLetter("")
        setCorrectThirdLetter("")
        setCorrectFourthLetter("")
        setCorrectFifthLetter("")
        setOtherThanFirstIdx([])
        setOtherThanSecondIdx([])
        setOtherThanThirdIdx([])
        setOtherThanFourthIdx([])
        setOtherThanFifthIdx([])
        setCurrentWordList(wordList)
        setNumPossibilities(3235)
    }
    useEffect(() => {
         refreshBoard();
  
    }, [unlimited])
    //console.log("day",day)

    useEffect(()=> {
        checkPreviousWordCorrectLetters()
        setCurrentWordList(filterWL(currentWordList))
        checkPreviousWordCorrectLetters()
        //setNumPossibilities(currentWordList.length)
    }, [currentGuessNumber])

    useEffect(()=> {
        setTimeout(()=> {
            setNumPossibilities(currentWordList.length)
        }, 1500)
    },[currentWordList.length])
        
   

    useEffect(()=> {
        if (!unlimited) {
            if (Cookies.get("lastPlayed") === `${day - 88}`) {
                setPlayed(true)
            }
            if (Cookies.get("lastPlayed") <= `${day - 88}` && Cookies.get("incomplete") === "true") {
                setGuessOne(Cookies.get("guessOne"))
                setGuessTwo(Cookies.get("guessTwo"))
                setGuessThree(Cookies.get("guessThree"))
                setGuessFour(Cookies.get("guessFour"))
                setGuessFive(Cookies.get("guessFive"))
                setCurrentGuessNumber(parseInt(Cookies.get("leftAtGuess")))
            }
            if(played) {
                setGuessOne(Cookies.get("guessOne"))
                setGuessTwo(Cookies.get("guessTwo"))
                setGuessThree(Cookies.get("guessThree"))
                setGuessFour(Cookies.get("guessFour"))
                setGuessFive(Cookies.get("guessFive"))
                setGuessFive(Cookies.get("guessSix"))
                return
            }
            if(parseInt(Cookies.get("lastPlayed")) >= (day - 88) && Cookies.get("incomplete") === "false" && !played) {
                return
            }
            if(parseInt(Cookies.get("lastPlayed")) >= (day - 88) && Cookies.get("incomplete") === "false") {
                 // haven't played today, reset guess cookies
                Cookies.set("guessOne","", { expires: 1 })
                Cookies.set("guessTwo","", { expires: 1 })
                Cookies.set("guessThree","", { expires: 1 })
                Cookies.set("guessFour","", { expires: 1 })
                Cookies.set("guessFive","", { expires: 1 })
                Cookies.set("guessSix","", { expires: 1 })
            }
        }
         
    },[day, unlimited])

    useEffect(()=> {
        if (win || lose) {
            onOpen()
            if (!unlimited) {
                setPlayed(true)
            }

        }
    },[win, lose, unlimited, onOpen])

    useEffect(()=> {
        if (played && !unlimited) {
            setCurrentGuessWord("")
            setCurrentGuessNumber(1)
            setGuessOne(Cookies.get("guessOne"))
            setGuessTwo(Cookies.get("guessTwo"))
            setGuessThree(Cookies.get("guessThree"))
            setGuessFour(Cookies.get("guessFour"))
            setGuessFive(Cookies.get("guessFive"))
            setGuessSix(Cookies.get("guessSix"))
        }
    },[played, unlimited]) 

/*     useEffect(()=> {
        setGuessOne(Cookies.get("guessOne"))
        setGuessTwo(Cookies.get("guessTwo"))
        setGuessThree(Cookies.get("guessThree"))
        setGuessFour(Cookies.get("guessFour"))
        setGuessFive(Cookies.get("guessFive"))
        setCurrentGuessNumber(parseInt(Cookies.get("leftAtGuess")))
    },[]) */
    
/*     useEffect(()=> {
        if (Cookies.get("incomplete") === "true" && !unlimited) {
            setGuessOne(Cookies.get("guessOne"))
            setGuessTwo(Cookies.get("guessTwo"))
            setGuessThree(Cookies.get("guessThree"))
            setGuessFour(Cookies.get("guessFour"))
            setGuessFive(Cookies.get("guessFive"))
            setCurrentGuessNumber(parseInt(Cookies.get("leftAtGuess")))
        }
    }) */

    // <GridItem style={determineSquareBackgroundColor(0,guessOne,1)className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[0] || currentGuessWord[0]}</Text></AspectRatio></GridItem>
/*     const letterBoxes = []
    for (let guessNum of guessNumArray) {
        for (let i=0; i < 5; i++) {
            letterBoxes.push(<GridItem key={`${guessNum}${i}`} backgroundColor={determineSquareBackgroundColor(i,guessNum,i+1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[i] || currentGuessWord[i]}</Text></AspectRatio></GridItem>)
        }
    } */
    console.log("secretWord", secretWord)

    function switchLetterNotAtIndex(currentGuessWord, idx) {
        switch (idx) {
            case 0:    
                return setOtherThanFirstIdx(curr => [...curr, currentGuessWord[idx]])
            case 1:    
                return setOtherThanSecondIdx(curr => [...curr, currentGuessWord[idx]])
            case 2:    
                return setOtherThanThirdIdx(curr => [...curr, currentGuessWord[idx]])
            case 3:    
                return setOtherThanFourthIdx(curr => [...curr, currentGuessWord[idx]])
            case 4:    
                return setOtherThanFifthIdx(curr => [...curr, currentGuessWord[idx]])     
            default:
                break;
        }
    }

    function checkLetters() { // adds guessed letters into state
        for (let i=0; i < 5; i++) { 
            // if the letter is in the right spot AND the state array doesn't include it
            if (currentGuessWord[i] === secretWord[i] && !correctLetterCorrectSpot.includes(currentGuessWord[i])) {
                setCorrectLetterCorrectSpot(curr => [...curr, currentGuessWord[i]])
                setCorrectLetterWrongSpot(curr => curr.filter(f => f !== currentGuessWord[i] ))
                continue
            } // this line is to prevent a bug that would add the correct letter into the wrong spot (condition 3 in this function)
            if (currentGuessWord[i] === secretWord[i] && correctLetterCorrectSpot.includes(currentGuessWord[i])) {
                continue 
            }
            // if secret word contains this letter AND it's not in the correctLetterWrongSpot state array
            if (secretWord.includes(currentGuessWord[i]) && !correctLetterWrongSpot.includes(currentGuessWord[i])) {
                setCorrectLetterWrongSpot(curr => [...curr, currentGuessWord[i]])
                // execute function that inserts the letter in a state array that will be used to show this lessis not in this index
                switchLetterNotAtIndex(currentGuessWord, i)
                continue
            }
            if (secretWord.includes(currentGuessWord[i]) && correctLetterWrongSpot.includes(currentGuessWord[i])) {
                switchLetterNotAtIndex(currentGuessWord, i)
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
        if(!unlimited && played) {
            return
        } 
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

    function switchSaveGuessToCookie(){
        switch (currentGuessNumber) {
            case 1:
                console.log("current guess to string", (currentGuessNumber+1).toString())
                Cookies.set("guessOne", currentGuessWord, {expires:1})
                Cookies.set("leftAtGuess", (currentGuessNumber+1).toString(), {expires:1})
                return
            case 2:
                Cookies.set("guessTwo", currentGuessWord)
                console.log("current guess to string", (currentGuessNumber+1).toString())
                Cookies.set("leftAtGuess", (currentGuessNumber+1).toString(), {expires:1})
                return
            case 3:
                Cookies.set("guessThree", currentGuessWord)
                Cookies.set("leftAtGuess", (currentGuessNumber+1).toString(), {expires:1})
                return
            case 4:
                Cookies.set("guessFour", currentGuessWord)
                Cookies.set("leftAtGuess", (currentGuessNumber+1).toString(), {expires:1})
                return
            case 5:
                Cookies.set("guessFive", currentGuessWord)
                Cookies.set("leftAtGuess", (currentGuessNumber+1).toString(), {expires:1})
                return
            case 6:
                Cookies.set("guessSix", currentGuessWord, {expires:1})
                Cookies.set("leftAtGuess", "0", { expires:1})
                Cookies.set("incomplete", "false", { expires:1})
                return
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
            switchSaveGuessToCookie()
            Cookies.set("incomplete", "false", {expires: 1})
            Cookies.set("lastPlayed", `${day - 88}`)
            return setTimeout(() => {setWin(true)},1900)
        }
        if ((currentGuessWord === secretWord) && unlimited) {
            setBoard(curr => `Turvle ${day-88} ${currentGuessNumber}/6` + curr)
            return setTimeout(() => {setWin(true)},1900)
        }
        if (!unlimited) {
            switchSaveGuessToCookie()
            Cookies.set("incomplete", "true", {expires: 1})

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
                    Cookies.set("incomplete", "false", {expires: 1})
                    switchSaveGuessToCookie()
                    Cookies.set("lastPlayed", `${day - 88}`, { expires: 7})
                    return setTimeout(() => {setWin(true)},1900)
                }
                if ((currentGuessWord === secretWord) && unlimited) {
                    return setTimeout(() => {setWin(true)},1900)
                }
                setCurrentGuessNumber(7)
                if (!unlimited){
                    incrementCookie("numTimesLost")
                    incrementCookie("numTimesPlayed")
                    switchSaveGuessToCookie()
                    Cookies.set("incomplete", "false", {expires: 1})
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

    function determineSquareBackgroundColor(idx, guessNumber, guessInt) { // put this for background color, return green
/*         if (played && !unlimited) {
            return { backgroundColor: 'lightgrey' }
        } */
        if(lose) {
            return {backgroundColor: 'red'}
        }
        if (currentGuessWord.length === 5 && !wordList.includes(currentGuessWord) && guessInt === currentGuessNumber) {
            return { backgroundColor: "lightcoral", borderColor: "black",  animation: "shake .4s ease-in-out"} // should make the red fade in and out
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
     function determineKeyBackgroundColor(k) {
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

    function modalDailyBody() {
        return (
            <>
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
            </>
        )
    }
   // {lose ?  <Text align="center" fontWeight='bold'>You SUCK! The correct word was "{secretWord}". Refresh to play again</Text> : ""}
    //
    // Revert to here
    //this doesn work
    function closeAndNewWord(){
        onClose()
        newUnlimitedWord()
    }
    function createModal() {
        return <><Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            {!unlimited && win ?  
            <><ModalHeader fontSize="5xl" align="center">You Win!</ModalHeader><ModalCloseButton />
            <ModalBody>
                {modalDailyBody()}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='green' constiant='outline' onClick={onShare}>Share</Button>
                <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
            </ModalFooter></>
          :""}
          {!unlimited && lose ? <><ModalHeader fontSize="5xl" align="center">You SUCK! The correct word was "{secretWord}"</ModalHeader><ModalCloseButton />
          <ModalBody>
              {modalDailyBody()}
          </ModalBody>
          <ModalFooter>
              <Button colorScheme='green' constiant='outline' onClick={onShare}>Share</Button>
              <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
          </ModalFooter></> : ""}
          {unlimited && win ? <><ModalHeader fontSize="5xl" align="center">You Win</ModalHeader><ModalCloseButton />
          <ModalFooter>
              <Button colorScheme="blue" onClick={closeAndNewWord} >Play Again</Button>
          </ModalFooter></> : ""}
          {unlimited && lose ? <><ModalHeader fontSize="5xl" align="center">You SUCK! </ModalHeader><ModalCloseButton />
          <ModalBody>The correct word was "{secretWord}"</ModalBody>
          <ModalFooter>
              <Button colorScheme="blue" onClick={closeAndNewWord} >Play Again</Button>
          </ModalFooter></> : ""}
        </ModalContent>
      </Modal></>
      
    }
    
     function newUnlimitedWord() {
        randomInteger.current ++
        refreshBoard()
        secretWordUnlimited.current = wordList[randomInteger.current]
    } 
    // {letterBoxes}
    //console.log("played?", played)

    function currentGuessToGuessWord(currentGuessNumber) {
        switch (currentGuessNumber) {
            case 1:
                return guessOne
            case 2:
                return guessTwo
            case 3:
                return guessThree
            case 4:
                return guessFour
            case 5:
                return guessFive
            case 6:
                return guessSix
        
            default:
                break;
        }
    }

     function currentIndexToCorrectLetter(previousGuess, index) {
        switch (index) {
            case 0:
                return setCorrectFirstLetter(previousGuess[0])
            case 1:
                return setCorrectSecondLetter(previousGuess[1])
            case 2:
                return setCorrectThirdLetter(previousGuess[2])
            case 3:
                return setCorrectFourthLetter(previousGuess[3])
            case 4:
                return setCorrectFifthLetter(previousGuess[4])
            default:
                break
     }
    }

    function checkPreviousWordCorrectLetters() {
        const previousGuess = currentGuessToGuessWord(currentGuessNumber-1)
        if (currentGuessNumber > 1) {
            for (let i = 0; i < 5; i++) {
                if (previousGuess[i] === secretWord[i]) {
                    currentIndexToCorrectLetter(previousGuess, i) // sets any correct letters to state
                   // obj[previousGuess[i]] = i
                    continue
                }
    
            }
        }
    }
/*            if (secretWord.includes(previousGuess[i])) {
                obj[previousGuess[i]] = i.toString()
            } */
/*     const fil = wordList.filter(word => {
        return !incorrectLetter.some(incorrect => word.includes(incorrect)) ||
            correctLetterWrongSpot.every(correct => word.includes(correct)) ||
            (correctFirstLetter && word.charAt(0) === correctFirstLetter || !correctFirstLetter) ||
            (correctSecondLetter && word.charAt(1) === correctSecondLetter || !correctSecondLetter) ||
            (correctThirdLetter && word.charAt(2) === correctThirdLetter || !correctThirdLetter) ||
            (correctFourthLetter && word.charAt(3) === correctFourthLetter || !correctFourthLetter) ||
            (correctFifthLetter && word.charAt(4) === correctFifthLetter || !correctFifthLetter) ||
            (otherThanFirstIdx && otherThanFirstIdx.some(yellowLetter => word.charAt(0) === yellowLetter)) ||
            (otherThanSecondIdx && otherThanSecondIdx.some(yellowLetter => word.charAt(1) === yellowLetter)) ||
            (otherThanThirdIdx && otherThanThirdIdx.some(yellowLetter => word.charAt(2) === yellowLetter)) ||
            (otherThanFourthIdx && otherThanFourthIdx.some(yellowLetter => word.charAt(3) === yellowLetter)) ||
            (otherThanFifthIdx && otherThanFifthIdx.some(yellowLetter => word.charAt(4) === yellowLetter))

    }) */

    // Checks to see if the word fits with correct letters, adds to a list and returns
/*     function filterWordList() {
        const possibleSecretWords = []
        if (currentGuessNumber > 1) {
            for (let word of wordList) {
                if (incorrectLetter.some(incorrect => word.includes(incorrect))) {
                    continue
                }
                if (!correctLetterWrongSpot.every(correct => word.includes(correct))) {
                    continue
                }
                if (correctFirstLetter) {
                    if (word.charAt(0) !== correctFirstLetter) {
                        continue
                    }
                }
                if (correctSecondLetter) {
                    if (word.charAt(1) !== correctSecondLetter) {
                        continue
                    }
                }
                if (correctThirdLetter) {
                    if (word.charAt(2) !== correctThirdLetter) {
                        continue
                    }
                }
                if (correctFourthLetter) {
                    if (word.charAt(3) !== correctFourthLetter) {
                        continue
                    }
                }
                if (correctFifthLetter) {
                    if (word.charAt(4) !== correctFifthLetter) {
                        continue
                    }
                }
                if (otherThanFirstIdx) {
                   if (otherThanFirstIdx?.some(yellowLetter => word.charAt(0) === yellowLetter)) {
                       continue
                   }
                }
                if (otherThanSecondIdx) {
                    if (otherThanSecondIdx?.some(yellowLetter => word.charAt(1) === yellowLetter)) {
                        continue
                    }
                }
                if (otherThanThirdIdx) {
                    if (otherThanThirdIdx?.some(yellowLetter => word.charAt(2) === yellowLetter)) {
                        continue
                    }
                }
                if (otherThanFourthIdx) {
                    if (otherThanFourthIdx?.some(yellowLetter => word.charAt(3) === yellowLetter)) {
                        continue
                    }
                }
                if (otherThanFifthIdx) {
                    if (otherThanFifthIdx?.some(yellowLetter => word.charAt(4) === yellowLetter)) {
                        continue
                    }
                }


                possibleSecretWords.push(word) // if it do
                    
            }

        }
        return possibleSecretWords
    } */
   // checkPreviousWordCorrectLetters()
   //Math.floor(Math.random() * 3234)

   function filterWL(wordList) {
       return wordList.filter(word => {
            return !incorrectLetter.some(incorrect => word.includes(incorrect)) && 
                (correctLetterWrongSpot.every(correct => word.includes(correct))) && 
                ((correctFirstLetter && word.charAt(0) === correctFirstLetter )|| !correctFirstLetter) &&
                ((correctSecondLetter && word.charAt(1) === correctSecondLetter) || !correctSecondLetter) &&
                ((correctThirdLetter && word.charAt(2) === correctThirdLetter) || !correctThirdLetter) &&
                ((correctFourthLetter && word.charAt(3) === correctFourthLetter) || !correctFourthLetter) &&
                ((correctFifthLetter && word.charAt(4) === correctFifthLetter) || !correctFifthLetter) &&
                ((otherThanFirstIdx && !otherThanFirstIdx.some(yellowLetter => word.charAt(0) === yellowLetter)) || !otherThanFirstIdx) &&
                ((otherThanSecondIdx && !otherThanSecondIdx.some(yellowLetter => word.charAt(1) === yellowLetter)) || !otherThanSecondIdx) &&
                ((otherThanThirdIdx && !otherThanThirdIdx.some(yellowLetter => word.charAt(2) === yellowLetter)) || !otherThanThirdIdx) &&
                ((otherThanFourthIdx && !otherThanFourthIdx.some(yellowLetter => word.charAt(3) === yellowLetter)) || !otherThanFourthIdx) &&
                ((otherThanFifthIdx && !otherThanFifthIdx.some(yellowLetter => word.charAt(4) === yellowLetter)) || !otherThanFifthIdx)

    })
   }

    function generateGuess() {
        if (currentGuessNumber === 1) {
            return setCurrentGuessWord(wordList[Math.floor(Math.random() * 3234)])
        } else {
            checkPreviousWordCorrectLetters()
            const fil = filterWL(currentWordList)
            console.log("FILTERED", fil, fil.length)
            setCurrentGuessWord(fil[Math.floor(Math.random() * fil.length)] || "XXXXX")
 
            checkPreviousWordCorrectLetters()
        }
/*         switch (currentGuessNumber) {
            case 1:
                return setCurrentGuessWord(wordList[Math.floor(Math.random() * 3234)])
            case 2: 
                return setCurrentGuessWord(checkPreviousWordCorrectLetters()[0])
            case 3: 
                return setCurrentGuessWord(checkPreviousWordCorrectLetters()[0])
            case 4: 
                return setCurrentGuessWord(checkPreviousWordCorrectLetters()[0])
            case 5: 
                return setCurrentGuessWord(checkPreviousWordCorrectLetters()[0])
            case 6: 
                return setCurrentGuessWord(checkPreviousWordCorrectLetters()[0])
        
            default:
                break;
        } */
    }
    //console.log(generateGuess())
    console.log("correct letter", correctFirstLetter,'.', correctSecondLetter,'.', correctThirdLetter,'.', correctFourthLetter,'.', correctFifthLetter)
    console.log("OTHERthan", otherThanFirstIdx, otherThanSecondIdx, otherThanThirdIdx, otherThanFourthIdx, otherThanFifthIdx)
    console.log("WL STATE", currentWordList)

    console.log("leftAt",Cookies.get("leftAtGuess"))
    console.log("guessOne", Cookies.get("guessOne"))
    console.log("incomplete", Cookies.get("incomplete"))
    console.log("played", played)
    console.log("lastPlayed", Cookies.get("lastPlayed"))
    console.log(" day and day-88",day,day - 88 )
    


    return (
        <Box mt="12px">
        <Box p="5px 8px 10px 5px"  >
            <Grid templateColumns="repeat(5, 1fr)" templateRows="repeat(5, 1fr)" gap={1} >
               
                <GridItem style={determineSquareBackgroundColor(0,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[0] || currentGuessWord[0]}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(1,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align="center" fontSize="5xl">{guessOne[1] || currentGuessWord[1]}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(2,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[2] || currentGuessWord[2]}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(3,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[3] || currentGuessWord[3]}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(4,guessOne,1)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessOne[4] || currentGuessWord[4]}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(0,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[0] || displayIfThisGuess(2,0)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(1,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[1] || displayIfThisGuess(2,1)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(2,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[2] || displayIfThisGuess(2,2)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(3,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[3] || displayIfThisGuess(2,3)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(4,guessTwo,2)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessTwo[4] || displayIfThisGuess(2,4)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(0,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[0] || displayIfThisGuess(3,0)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(1,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[1] || displayIfThisGuess(3,1)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(2,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[2] || displayIfThisGuess(3,2)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(3,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[3] || displayIfThisGuess(3,3)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(4,guessThree,3)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessThree[4] || displayIfThisGuess(3,4)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(0,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[0] || displayIfThisGuess(4,0)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(1,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[1] || displayIfThisGuess(4,1)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(2,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[2] || displayIfThisGuess(4,2)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(3,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[3] || displayIfThisGuess(4,3)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(4,guessFour,4)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFour[4] || displayIfThisGuess(4,4)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(0,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[0] || displayIfThisGuess(5,0)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(1,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[1] || displayIfThisGuess(5,1)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(2,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[2] || displayIfThisGuess(5,2)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(3,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[3] || displayIfThisGuess(5,3)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(4,guessFive,5)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessFive[4] || displayIfThisGuess(5,4)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(0,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[0] || displayIfThisGuess(6,0)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(1,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[1] || displayIfThisGuess(6,1)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(2,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[2] || displayIfThisGuess(6,2)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(3,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[3] || displayIfThisGuess(6,3)}</Text></AspectRatio></GridItem>
                <GridItem style={determineSquareBackgroundColor(4,guessSix,6)} className='letterGrid' rowSpan={1} colSpan={1}><AspectRatio maxWidth="15vw" ratio={1}><Text align='center' fontSize="5xl">{guessSix[4] || displayIfThisGuess(6,4)}</Text></AspectRatio></GridItem>
            </Grid>
        </Box>
        <Box  >
            <Box align='center' className='keyBox'  >

                {topRowKeys.map(k => {
                    return <Box key={k} as="span" className='key' title={k} onClick={keyClick} style={determineKeyBackgroundColor(k)} >{k}</Box>
                })}
            </Box>

            <Box align='center' className='keyBox' >
                {middleRowKeys.map(k => {
                return <Box key={k} as="span" className='key' title={k} onClick={keyClick} style={determineKeyBackgroundColor(k)} >{k}</Box>
                })}
            </Box>

            <Box align='center' className='keyBoxBottom'>
                <Box as="span" className='specialKey'   onClick={submitGuess} >Ent</Box>
                    {bottomRowKeys.map(k => {
                    return <Box key={k} as="span" className='key' title={k} onClick={keyClick} style={determineKeyBackgroundColor(k)} >{k}</Box>
                    })}
                <Box as="span" className='specialKey' onClick={backspace} >Back</Box>   
            </Box>
                     {lose && unlimited ?  <Box align="center"><Text align="center" fontWeight='bold'>You SUCK! The correct word was "{secretWord}"</Text><Button colorScheme="blue" onClick={newUnlimitedWord} >Play Again</Button></Box> : ""}
                     {win && unlimited ? <Box align="center"><Text fontWeight='bold'>You WIN! </Text><Button colorScheme="blue" onClick={newUnlimitedWord} >Play Again</Button></Box>: ""}
                     {win && !unlimited ? <Text align="center" fontWeight='bold'>You WIN! Switch to unlimited to play again </Text>: ""}
{/*                      {lose && !unlimited ? createModal() : ""}
                     {win && !unlimited ? createModal()
                      : ""} */}
                      {createModal()}
                      {unlimited && !(win || lose) ? <Button onClick={generateGuess} colorScheme="green">Generate Guess</Button> : "" }
                      {!unlimited  && played ? <Text>Come back tomorrow</Text> :<Text>Possibilities: {numPossibilities}</Text>}
                      
                    
        </Box>
        </Box>
    )
}

export default Guesses;