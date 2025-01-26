import React from 'react'
import { UseVoiceToText } from '../UseVoiceToText'

interface Modalprops{
transcript: string
}

const VoiceRecorModal:React.FC<Modalprops> = ({transcript}) => {

  console.log(transcript);
  
  return (
    <div>
      {transcript}
    </div>
  )
}

export default VoiceRecorModal
