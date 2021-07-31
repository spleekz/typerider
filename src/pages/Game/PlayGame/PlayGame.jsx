import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { GameInput } from './GameInput'
import { Track } from './Track/Track'
import { Timer } from './Timer'
import { WordLetters } from './WordLetters/WordLetters'
import { Error } from './Error'
import { GameStoreContext, useStore } from '../../../stores/RootStore/RootStoreContext'
import { Bold } from '../../../Components/Styled/StyledComponents'

const PlayGameContainer = styled.div`
  background-color: inherit;
  flex: 1 1 auto;
  padding: 25px 60px 25px 25px;
`
const PlaceForWords = styled.div`
  position: relative;
  height: 75px;
  display: flex;
  justify-content: center;
`
const GameWordLetters = styled.div`
  @media (max-width: 1500px) {
    font-size: 59px;
  }
  @media (max-width: 1440px) {
    font-size: 55px;
  }
  @media (max-width: 1270px) {
    font-size: 52px;
  }
  @media (max-width: 1200px) {
    font-size: 47px;
  }
  @media (max-width: 1090px) {
    font-size: 45px;
  }
  font-size: 66px;
`
const RaceWords = styled.div`
  position: absolute;
`
const WordsAreHidden = styled.div`
  @media (max-width: 1500px) {
    font-size: 59px;
  }
  @media (max-width: 1440px) {
    font-size: 51px;
  }
  @media (max-width: 1270px) {
    font-size: 46px;
  }
  @media (max-width: 1200px) {
    font-size: 39px;
  }
  @media (max-width: 1090px) {
    font-size: 36px;
  }
  font-size: 66px;
  text-align: center;
`

export const PlayGame = observer(() => {
  const { AppStore } = useStore()
  const { PlayGameState } = useContext(GameStoreContext)
  const [isFlagJumping, setIsFlagJumping] = useState(false)

  return (
    <PlayGameContainer>
      <PlaceForWords>
        <RaceWords>
          {AppStore.gameMode ? (
            <GameWordLetters>
              <WordLetters wordObject={PlayGameState.currentWordObject} />
            </GameWordLetters>
          ) : (
            <WordsAreHidden>
              <Bold>Words are hidden before the race!</Bold>
            </WordsAreHidden>
          )}
        </RaceWords>
      </PlaceForWords>
      <Track isFlagJumping={isFlagJumping} />
      <GameInput setIsFlagJumping={setIsFlagJumping} />
      <Timer />
      {PlayGameState.isError ? <Error /> : null}
    </PlayGameContainer>
  )
})
