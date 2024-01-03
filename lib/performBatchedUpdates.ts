import { unstable_batchedUpdates } from 'react-dom'

// This function wraps a callback function within React's batched updates.
// This ensures that multiple state updates within the callback are grouped into 
// a single update, improving performance by avoiding unnecessary re-renders.

export function performBatchedUpdates(callback: () => void): void {
  unstable_batchedUpdates((): void => {
    callback()
  })
}
