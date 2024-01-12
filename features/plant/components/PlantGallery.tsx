import { FC, useState } from 'react'
import { MyPlant } from '../../../types/types'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import NextImage from 'next/image'
import '@splidejs/react-splide/css'
import { ImageRecordsContext } from '../hooks/ImageRecordsContext'
import { ImageCarousel } from '../../../components/organisms/ImageCarousel'

export const PlantGallery: FC<Pick<MyPlant, 'records'>> = ({ records }) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleOpen = (index: number) => {
    setPhotoIndex(index)
    onOpen()
  }

  const imageRecords = records.filter((record) => record.photo_url)

  return (
    <div>
      <ImageRecordsContext.Provider value={imageRecords}>
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
                classes={{ title: 'text-xs' }}
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
            backdrop:
              'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader></ModalHeader>
                <ModalBody>
                  <ImageCarousel
                    photoIndex={photoIndex}
                    dispatch={setPhotoIndex}
                  />
                </ModalBody>
                <ModalFooter className="justify-center text-white">
                  {imageRecords[photoIndex].record_date}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </ImageRecordsContext.Provider>
    </div>
  )
}
