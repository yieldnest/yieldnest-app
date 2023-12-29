import { useCallback } from 'react'
import copy from 'copy-to-clipboard'
import { useToast } from '@/components/ui/use-toast'


export const useCopyToClipboard = (text: string): (() => void) => {
  const { toast } = useToast()

  return useCallback(() => {
    copy(text)
    toast({
      description: 'Copied to clipboard.'
    })  
  }, [text])
}
