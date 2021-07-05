import React from 'react'
import styled from 'styled-components'
import { useStore } from '../../../../stores/RootStore/RootStoreContext'
import { observer } from 'mobx-react-lite'

const TimeForRaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TimeForRaceList = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
`
const TimeForRaceItem = styled.button`
  width: 50px;
  color: ${(props) => (props.active ? '#33ff00' : '#000000')};
  &:hover {
    cursor: pointer;
  }
`

export const TimeForRace = observer(() => {
  const { GameSettingsStore } = useStore()

  const setSelectedTime = (time) => {
    GameSettingsStore.setSelectedTime(time)
  }
  return (
    <TimeForRaceContainer>
      How long will your race last?
      <TimeForRaceList>
        {GameSettingsStore.timeForRace.map((t) => {
          return (
            <TimeForRaceItem
              disabled={GameSettingsStore.gameMode}
              active={t.isActive}
              key={t.time}
              onClick={() => setSelectedTime(t.time)}>
              {t.label}
            </TimeForRaceItem>
          )
        })}
      </TimeForRaceList>
    </TimeForRaceContainer>
  )
})