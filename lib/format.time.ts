import dayjs, {extend} from 'dayjs'
import dayjsDuration from 'dayjs/plugin/duration.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'

extend(relativeTime)
extend(dayjsDuration)

// This function takes a value representing a date or time and returns a string representing the time  
// elapsed since that value, relative to the current time.
// @param value - The date or time to calculate the elapsed time from, as a number or string.
// @returns A string representing the time elapsed since the provided value.

export function	since(value: number | string): string {
  return dayjs(value).from(dayjs())
}

export {since as formatSince}
