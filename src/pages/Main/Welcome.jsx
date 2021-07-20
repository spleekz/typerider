import React, { useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { Container } from '../../Components/Styled/StyledComponents'

const WelcomeContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  background-color: #93c2ff;
`
const WelcomeSubTitle = styled.div`
  font-size: 70px;
`
const WelcomeInput = styled.input`
  margin-top: 16px;
  font-size: 24px;
  border-radius: 9px;
  padding: 9px;
  width: 500px;
  height: 46px;
  border: none;
  outline: none;
`
const LetsGo = styled.button`
  font-size: 22px;
  margin-top: 16px;
  width: 340px;
  height: 38px;
  border-radius: 9px;
  &:hover {
    cursor: pointer;
  }
`
export const Welcome = observer(() => {
  const { AppStore } = useStore()
  const [inputValue, setInputValue] = useState('')
  const history = useHistory()

  const goToGame = () => {
    const nickname = inputValue.trim()
    if (nickname) {
      AppStore.setUserNickname(nickname)
      history.push('/game')
      setInputValue('')
    }
  }
  const onInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const onEnterPress = (e) => {
    if (e.code === 'Enter') {
      goToGame()
    }
  }

  return (
    <WelcomeContainer>
      <WelcomeSubTitle>Your nickname for the next race?</WelcomeSubTitle>
      <WelcomeInput
        autoFocus={true}
        maxLength='16'
        onChange={onInputChange}
        onKeyPress={onEnterPress}
        value={inputValue}
      />
      <LetsGo onClick={goToGame}>Let&apos;s go!</LetsGo>
    </WelcomeContainer>
  )
})
