import { FC, useContext } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import { ImageRecordsContext } from '../../features/plant/hooks/ImageRecordsContext'

interface Props {
  photoIndex: number
  dispatch: (i: number) => void
}

export const ImageCarousel: FC<Props> = ({ photoIndex, dispatch }) => {
  const imageRecords = useContext(ImageRecordsContext)
  return (
    <Splide
      options={{
        arrows: false,
        start: photoIndex,
        lazyLoad: 'nearby',
      }}
      onMove={(next, prev, dest) => {
        dispatch(prev)
      }}
    >
      {imageRecords?.map((record) => (
        <SplideSlide key={record.id}>
          <TransformWrapper
            doubleClick={{ mode: 'reset' }}
            panning={{ velocityDisabled: true }}
            disablePadding
          >
            <TransformComponent>
              <Image
                as={NextImage}
                radius="none"
                width={500}
                height={500}
                src={record.photo_url || ''}
                alt=""
                classNames={{
                  wrapper: '!max-w-full',
                  img: 'w-full',
                }}
              />
            </TransformComponent>
          </TransformWrapper>
        </SplideSlide>
      ))}
    </Splide>
  )
}
