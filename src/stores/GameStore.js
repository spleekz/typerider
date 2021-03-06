import { makeAutoObservable } from 'mobx'
import randomWords from 'random-words'
import uniqid from 'uniqid'

export class GameStore {
  constructor(gameSettingsStore) {
    globalThis = this
    makeAutoObservable(this)
    this.GameSettingsStore = gameSettingsStore
  }
  //playGame
  PlayGameState = {
    words: [],
    currentWordIndex: 0,
    currentLetterIndex: 0,
    completedLetters: [],
    inputValue: '',
    isError: false,
    currentTime: null,
    trackLength: null,
    vehicleWidth: 100,
    vehiclePosition: 0,
    timeToPrepare: 3,
    timeArray: [],
    currentTimeIndex: 0,
    isPreparing: false,

    get currentWord() {
      return this.words[this.currentWordIndex]
    },
    get currentWordLetters() {
      if (this.words.length > 0) {
        return this.currentWord.split('').map((letter) => {
          return {
            letter,
            id: uniqid(),
          }
        })
      }
      return []
    },
    get currentWordLength() {
      return this.currentWord.length
    },
    get currentLetter() {
      return this.currentWord[this.currentLetterIndex]
    },
    get currentWordStep() {
      return (this.trackLength - this.vehicleWidth) / this.currentWordLength
    },
    get currentWordObject() {
      return {
        wordLetters: this.currentWordLetters,
        arrayOfCompletedLetters: this.completedLetters,
      }
    },
    get currentNumber() {
      return this.timeArray[this.currentTimeIndex].text
    },

    setRandomWords() {
      this.words = randomWords(150)
    },
    updateCurrentWordIndex() {
      this.currentWordIndex++
    },
    updateCurrentLetterIndex() {
      this.currentLetterIndex++
    },
    clearCurrentLetterIndex() {
      this.currentLetterIndex = 0
    },
    updateInputValue(value) {
      this.inputValue += value
    },
    clearInputValue() {
      this.inputValue = ''
    },
    setIsError(value) {
      this.isError = value
    },
    setCurrentTime(time) {
      this.currentTime = time
    },
    updateCurrentTime() {
      this.currentTime--
    },
    updateVehiclePosition(value) {
      this.vehiclePosition += value
    },
    setNewVehiclePosition() {
      this.vehiclePosition = this.currentWordStep * this.currentLetterIndex
    },
    clearVehiclePosition() {
      this.vehiclePosition = 0
    },
    setVehicleWidth(width) {
      this.vehicleWidth = width
    },
    updateCompletedLetters(id) {
      this.completedLetters.push(id)
    },
    updateTrackLength(length) {
      this.trackLength = length
    },
    setIsPreparing(value) {
      this.isPreparing = value
    },
    setTimeArray(time) {
      this.timeArray.push(time)
    },
    setCurrentTimeIndex() {
      this.currentTimeIndex++
    },
    setVisibleNumber(number) {
      this.timeArray.forEach((el) => {
        if (el.text === number) {
          el.isVisible = true
        } else {
          el.isVisible = false
        }
      })
    },
  }

  //result
  ResultState = {
    isResultReady: false,
    errorsCount: 0,
    errorWords: [],
    symbolsCount: 0,
    correctWordsCount: 0,

    get typeSpeed() {
      const rate = 60000 / globalThis.GameSettingsStore.activeTimeForRace
      return Math.round(this.symbolsCount * rate)
    },
    get errorsPercent() {
      if (this.errorsCount === 0 && this.symbolsCount === 0) {
        return 0
      } else if (this.symbolsCount === 0) {
        return 100
      }
      return Math.floor((this.errorsCount / this.symbolsCount) * 100)
    },
    get sortedErrorWords() {
      return this.errorWords.slice().sort((a, b) => b.errorLettersCount - a.errorLettersCount)
    },

    updateErrorsCount() {
      this.errorsCount++
    },
    setErrorWords(word, errorLetter) {
      const hasThisWord = this.errorWords.some((w) => w.name === word.name)
      if (hasThisWord) {
        this.errorWords.forEach((w) => {
          if (w.name === word.name) {
            w.letters.map((letter) => {
              if (letter.id === errorLetter.id) {
                letter.isError = true
              }
            })
          }
        })
      } else {
        word.letters.forEach((letter) => {
          if (letter.id === errorLetter.id) {
            letter.isError = true
          }
        })
        this.errorWords.push(word)
      }
    },
    setErrorLettersCountInWords() {
      this.errorWords.forEach((word) => {
        const errorLettersCount = word.letters.reduce((count, letter) => {
          if (letter.isError) {
            count = count + 1
          }
          return count
        }, 0)
        word.errorLettersCount = errorLettersCount
      })
    },
    setIsResultReady(value) {
      this.isResultReady = value
    },
    updateSymbolsCount() {
      this.symbolsCount++
    },
    updateCorrectWordsCount() {
      this.correctWordsCount++
    },
  }
}
