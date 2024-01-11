import { FC, useEffect, useState } from 'react'
import { MyPlant, Record } from '../../../types/types'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
  useDisclosure,
} from '@nextui-org/react'
import NextImage from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

export const PlantGallery: FC<Pick<MyPlant, 'records'>> = ({ records }) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0)
  const [imageRecords, setImageRecords] = useState<Record[] | []>([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleOpen = (index: number) => {
    setPhotoIndex(index)
    onOpen()
  }
  const filterPhotos = () => {
    const photoRecords = records.filter((record) => record.photo_url)
    setImageRecords(photoRecords)
  }
  useEffect(() => {
    filterPhotos()
  }, [])

  return (
    <div>
      {(!records || records?.length === 0) && (
        <p className="text-sm text-theme-medium">お世話記録がありません</p>
      )}
      {imageRecords.length === 0 && (
        <p className="text-sm text-theme-medium">画像がありません</p>
      )}

      <ImageList cols={3}>
        {imageRecords?.map((record, index) => (
          <ImageListItem key={record.id} onClick={() => handleOpen(index)}>
            <Image
              className="h-full"
              radius="none"
              as={NextImage}
              width={150}
              height={150}
              src={record.photo_url || ''}
              alt={record.plant_id}
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={record.record_date}
              position="top"
              classes={{ title: '!text-xs' }}
              className="z-10"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="3xl"
        classNames={{
          base: 'bg-transparent shadow-none',
          closeButton: 'text-white hover:opacity-5',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <Splide
                  options={{
                    arrows: false,
                    start: photoIndex,
                    lazyLoad: 'nearby',
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
