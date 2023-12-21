
/**
 * This function formats a given amount (number or string) into a string with a specific number of fraction digits.
 * It also allows for the display of a specific number of digits, truncating the rest and replacing them with ellipsis.
 * The function first sets the locale to 'fr-FR' and then checks if the navigator object is defined. 
 * If it is, it sets the locale to the navigator's language.
 * It then checks if the maximum number of fraction digits is less than the minimum number of fraction digits. 
 * If it is, it sets the maximum number of fraction digits to the minimum number.
 * If the amount is not defined, it sets it to 0. If the amount is a string, it converts it to a number.
 * If the amount is not a number (NaN), it sets it to 0.
 * It then formats the amount using the Intl.NumberFormat function with the locale and the minimum and 
 * maximum number of fraction digits.
 * If the number of display digits is greater than 0 and the length of the formatted amount is greater 
 * than the number of display digits, it truncates the formatted amount and replaces the truncated part with ellipsis.
 * Finally, it returns the formatted amount.
 */

export function	formatAmount(amount: number | string, 
  minimumFractionDigits = 2, maximumFractionDigits = 2, displayDigits = 0): string {
  let		locale = 'en-US'
  if (typeof(navigator) !== 'undefined') {
    locale = navigator.language || 'en-US'
  }
  if (maximumFractionDigits < minimumFractionDigits) {
    maximumFractionDigits = minimumFractionDigits
  }
  if (!amount) {
    amount = 0
  }
  if (typeof(amount) === 'string') {
    amount = Number(amount)
  }
  if (isNaN(amount)) {
    amount = 0
  }
  let formattedAmount = new Intl.NumberFormat([locale, 'en-US'], 
    {minimumFractionDigits, maximumFractionDigits}).format(amount)

  if (displayDigits > 0 && formattedAmount.length > displayDigits) {
    const leftSide = formattedAmount.slice(0, Math.ceil(displayDigits / 2))
    const rightSide = formattedAmount.slice(-Math.floor(displayDigits / 2))
    formattedAmount = `${leftSide}...${rightSide}`
  }

  return formattedAmount
}
