import { FC, useState } from 'react'
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

export const PlantGallery: FC<Pick<MyPlant, 'records'>> = ({ records }) => {
  const [imagePath, setImagePath] = useState<string | null>('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleOpen = (record: Record) => {
    setImagePath(record.photo_url)
    onOpen()
  }
  return (
    <div>
      <h3 className="font-bold">ギャラリー</h3>
      <Spacer y={3} />
      {(!records || records?.length === 0) && <p>お世話記録がありません</p>}
      <ImageList cols={3}>
        {records?.map((record) => (
          <>
            {record.photo_url && (
              <ImageListItem key={record.id} onClick={() => handleOpen(record)}>
                <Image
                  className="rounded-none"
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
            )}
          </>
        ))}
      </ImageList>
      {imagePath && (
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
                  <Splide options={{ arrows: false }}>
                    <SplideSlide>
                      <Image
                        as={NextImage}
                        width={400}
                        height={400}
                        src={imagePath || ''}
                        alt=""
                        classNames={{ wrapper: '!max-w-full', img: 'w-full' }}
                      />
                    </SplideSlide>
                  </Splide>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
