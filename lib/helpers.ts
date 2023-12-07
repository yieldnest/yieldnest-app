import { parseUnits } from 'viem'
import type { TNormalizedBN } from '@/lib/format.bigNumber'

/**
 * This function handles the change event of an input element.
 * It takes the event and an optional number of decimals as arguments.
 * The function returns an object with the raw and normalized values of the input.
 * The raw value is the parsed units of the input value, and the normalized value is the input value as a string.
 * If the input value is not a number, the function returns an object with raw as 0n and normalized as an empty string.
 * If the input value is 0, the function processes the value to handle cases like '0.00' and '0,00'.
 * In the end, if the input value is a number other than 0, the function returns an object with the 
 * raw and normalized values.
 */

export function handleInputChangeEventValue(e: React.ChangeEvent<HTMLInputElement>, decimals?: number): TNormalizedBN {
  const {valueAsNumber, value} = e.target
  const amount = value

  if (isNaN(valueAsNumber)) {
    return ({raw: 0n, normalized: ''})
  }
  if (valueAsNumber === 0) {
    let	amountStr = value.replace(/,/g, '.').replace(/[^0-9.]/g, '')
    const	amountParts = amountStr.split('.')
    if ((amountParts[0])?.length > 1 && Number(amountParts[0]) === 0) {
      // Placeholder 
    } else {
      //check if we have 0 everywhere
      if (amountParts.every((part: string): boolean => Number(part) === 0)) {
        if (amountParts.length === 2) {
          amountStr = amountParts[0] + '.' + amountParts[1].slice(0, decimals)
        }
        const	raw = parseUnits((amountStr || '0') as `${number}`, decimals || 18)
        return ({raw: raw, normalized: amountStr || '0'})
      }
    }
  }
  const	raw = parseUnits(value, decimals || 18)
  return ({raw: raw, normalized: amount.toString() || '0'})
}
