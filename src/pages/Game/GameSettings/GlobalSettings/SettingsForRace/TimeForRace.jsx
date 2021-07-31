import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/RootStore/RootStoreContext'
import { SettingsButton, Bold } from '../../../../../Components/Styled/StyledComponents'

const TimeForRaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TimeForRaceList = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`
const TimeForRaceItem = styled(SettingsButton)`
  @media (max-width: 1400px) {
    font-size: 17px;
  }
  @media (max-width: 1150px) {
    font-size: 16px;
  }
  font-size: 19px;
  width: 100px;
  margin: 8px 8px;
  color: ${(props) => (props.isActive ? '#d66e0c' : '#000000')};
  transition: color 0.33s;
  &:hover {
    color: ${(props) => !props.isActive && '#e2750e8b'};
  }
`

export const TimeForRace = observer(() => {
  const { AppStore, GameSettingsStore } = useStore()

  const setSelectedTime = (time) => {
    GameSettingsStore.setSelectedTime(time)
  }
  const TimeForRaceItems = GameSettingsStore.timeForRace.map((t) => {
    return (
      <TimeForRaceItem
        disabled={AppStore.gameMode}
        isActive={t.isActive}
        key={t.time}
        onClick={() => setSelectedTime(t.time)}>
        <Bold>{t.name}</Bold>
      </TimeForRaceItem>
    )
  })

  return (
    <TimeForRaceContainer>
      <TimeForRaceList>{TimeForRaceItems}</TimeForRaceList>
    </TimeForRaceContainer>
  )
})
