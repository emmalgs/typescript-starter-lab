import { Event } from "./models"

const scoreFirstFiveSubarrays = (eventStream: Event[]): number => { 
  let sum: number = 0 
  for (let i=0; i < 5; i++) {
    eventStream[i].eventType === 'new message' 
      ? sum += 1 
      : eventStream[i].eventType === 'view' 
        ? sum += 2 
        : sum += 3
  }
  return sum
}

const scoreRemainingSubarrays = (eventStreamSlice: Event[], subarraySum: number) => {
  let highScoreFinalIndex = 4 // update?  
  let subarraySumToCompare = subarraySum  
  for (let i = 5; i < eventStreamSlice.length; i++) { 
      let lastEventValue = 0
      eventStreamSlice[i].eventType === 'new message' 
        ? subarraySumToCompare += 1 
        : eventStreamSlice[i].eventType === 'view' 
          ? subarraySumToCompare += 2 
          : subarraySumToCompare += 3

        eventStreamSlice[i-5].eventType === 'new message' 
        ? lastEventValue += 1 
        : eventStreamSlice[i-5].eventType === 'view' 
          ? lastEventValue += 2 
          : lastEventValue += 3
        subarraySumToCompare -= lastEventValue

    if (subarraySumToCompare > subarraySum) {
      highScoreFinalIndex = i
    }
    subarraySum = Math.max(subarraySum, subarraySumToCompare)
  }
  return highScoreFinalIndex
}

export function scoreEventStream(eventStream: Event[]): Event[] {

  if (eventStream.length < 5) { 
    return eventStream
  } else {

    let subarraySum = scoreFirstFiveSubarrays(eventStream) 

    const index = scoreRemainingSubarrays(eventStream, subarraySum)

    const highScoreSubarrayFirstIndex = index - 4 
    const highScoreSubarrayLastIndex = index + 1

    const finalHighScoreSubarray: Event[] = eventStream.slice(highScoreSubarrayFirstIndex, highScoreSubarrayLastIndex)

    return finalHighScoreSubarray
  }
}       