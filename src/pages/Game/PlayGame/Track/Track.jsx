import React, { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Vehicle } from './Vehicle/Vehicle'
import { GameStoreContext, useStore } from '../../../../stores/RootStore/RootStoreContext'
import { useScreenWidth } from '../../../../assets/hooks/ResizeHook'

const TrackContainer = styled.div`
  padding: 50px;
`
const StyledTrack = styled.div`
  position: relative;
  width: 80%;
  border-bottom: 3px dashed #000000;
`

export const Track = observer(() => {
  const { GameSettingsStore } = useStore()
  const { PlayGameState } = useContext(GameStoreContext)
  const screenWidth = useScreenWidth()
  const trackRef = useRef(null)

  useEffect(() => {
    PlayGameState.updateTrackLength(trackRef.current.offsetWidth)
  }, [screenWidth])

  return (
    <TrackContainer>
      <StyledTrack ref={trackRef} length={PlayGameState.trackLength}>
        <Vehicle model={GameSettingsStore.activeVehicleModel} />
      </StyledTrack>
    </TrackContainer>
  )
})
