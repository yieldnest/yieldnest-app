import { useState } from 'react'
import Image from 'next/image'
import { useUpdateEffect } from '@react-hookz/web'
import { performBatchedUpdates } from '@/lib/performBatchedUpdates'

import type { ImageProps } from 'next/image'
import type { CSSProperties, ReactElement } from 'react'

/**
 * ImageWithFallback is a component that displays an image with a specified source.
 * If the image fails to load, it falls back to a placeholder image.
 */
function	ImageWithFallback(props: ImageProps): ReactElement {
  const {alt, src, ...rest} = props
  const [imageSrc, setImageSrc] = useState(`${src}?fallback=true`)
  const [imageStyle, setImageStyle] = useState<CSSProperties>({})


  useUpdateEffect((): void => {
    setImageSrc(`${src}?fallback=true`)
    setImageStyle({})
  }, [src])

  return (
    <Image
      alt={alt}
      src={imageSrc}
      style={imageStyle}
      loading={'eager'}
      onError={(): void => {
        performBatchedUpdates((): void => {
          setImageSrc('/placeholder.png')
          setImageStyle({filter: 'opacity(0.2)'})
        })
      }}
      {...rest}
    />
  )
}

export { ImageWithFallback }
