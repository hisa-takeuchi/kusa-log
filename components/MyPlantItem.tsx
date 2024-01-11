import { FC, useEffect, useState } from 'react'
import { MyPlant } from '../types/types'
import useStore from '../store'
import { useMutateMyPlants } from '../hooks/useMutateMyPlant'
import { supabase } from '../utils/supabase'
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from '@nextui-org/react'
import { RecordForm } from './RecordForm'
import { useMutateRecord } from '../hooks/useMutateRecord'
import {
  Backdrop,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from '@mui/material'
import NextImage from 'next/image'
import { ShowPlant } from '../features/plant/components/ShowPlant'
import { deleteStorage } from '../libs/storage'
import {
  PiPlant,
  PiPlantFill,
  PiPottedPlant,
  PiPottedPlantFill,
} from 'react-icons/pi'
import { MdOutlineClose } from 'react-icons/md'
import { TbCalendarPlus, TbEdit, TbTrash } from 'react-icons/tb'
import { EditMyPlantModal } from '../features/plant/components/EditMyPlantModal'

export const MyPlantItem: FC<Omit<MyPlant, 'created_at'>> = (props) => {
  const {
    id,
    name,
    cut_date,
    replanted_date,
    user_id,
    soil_info,
    buy_at,
    photo_url,
    records,
  } = props
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedMyPlant)
  const { deleteMyPlantMutation } = useMutateMyPlants()
  const getCurrentUserId = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user
    if (user) {
      setUserId(user?.id)
    }
  }
  useEffect(() => {
    getCurrentUserId()
  }, [])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onOpenConfirmChange,
  } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onOpenEditChange,
  } = useDisclosure()
  const {
    isOpen: childIsOpen,
    onOpen: onChildOpen,
    onOpenChange: childOnOpenChange,
  } = useDisclosure()
  const { editedRecord, editedMyPlant } = useStore()
  const { createRecordMutation, updateRecordMutation, deleteRecordMutation } =
    useMutateRecord()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isShowTooltip, setIsShowTooltip] = useState(false)

  const [speedDialOpen, setSpeedDialOpenOpen] = useState(false)
  const handleSpeedDialOpen = () => setSpeedDialOpenOpen(true)
  const handleSpeedDialClose = () => setSpeedDialOpenOpen(false)
  const submitHandler = async () => {
    await new Promise(() => {
      setIsSubmitLoading(true)
      console.log(isSubmitLoading)
      if (editedRecord.id === '') {
        createRecordMutation.mutate({
          user_id: userId,
          plant_id: id,
          is_water: editedRecord.is_water,
          is_fertilizer: editedRecord.is_fertilizer,
          is_chemical: editedRecord.is_chemical,
          record_date: editedRecord.record_date,
          light_power: editedRecord.light_power,
          weather: editedRecord.weather,
          wind_power: editedRecord.wind_power,
          memo: editedRecord.memo,
          temp: editedRecord.temp,
          condition: editedRecord.condition,
          photo_url: editedRecord.photo_url,
        })
      } else {
        updateRecordMutation.mutate({
          id: editedRecord.id,
          plant_id: editedRecord.plant_id,
          is_water: editedRecord.is_water,
          is_fertilizer: editedRecord.is_fertilizer,
          is_chemical: editedRecord.is_chemical,
          record_date: editedRecord.record_date,
          light_power: editedRecord.light_power,
          weather: editedRecord.weather,
          wind_power: editedRecord.wind_power,
          memo: editedRecord.memo,
          temp: editedRecord.temp,
          condition: editedRecord.condition,
          photo_url: editedRecord.photo_url,
        })
      }
    })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsSubmitLoading(false)
        setIsShowTooltip(true)
        onOpenChange()
        childOnOpenChange()
        handleSpeedDialClose()
      })
    console.log(isSubmitLoading)
  }

  const deletePlant = async () => {
    setIsSubmitLoading(true)
    // URLからオブジェクト名を抽出
    try {
      await new Promise(() => {
        deleteMyPlantMutation.mutate(id)
        if (photo_url) {
          const urlParts = new URL(photo_url)
          const objectName = urlParts.pathname.substring(
            '/storage/v1/object/public/plants_photos/'.length,
          )
          // storageから画像を削除
          deleteStorage({
            paths: [objectName],
            bucketName: 'plants_photos',
          })
        }
      })
      setIsSubmitLoading(false) // ローディング状態を解除
      handleSpeedDialClose()
      onOpenConfirmChange()
    } catch (error) {
      // エラーハンドリング
      console.error('削除処理エラー:', error)
      setIsSubmitLoading(false) // エラー時もローディング状態を解除
    }
  }

  const actions = [
    {
      icon: <TbCalendarPlus color="#16a34a" size="1.5rem" />,
      name: '記録する',
      func: () => {
        onChildOpen()
      },
    },
    {
      icon: <TbEdit color="#16a34a" size="1.5rem" />,
      name: '編集する',
      func: () => {
        update({ ...props })
        onOpenEditChange()
      },
    },
    {
      icon: <TbTrash color="#16a34a" size="1.5rem" />,
      name: '削除する',
      func: () => {
        onOpenConfirmChange()
      },
    },
  ]

  return (
    <>
      <Tooltip
        onOpenChange={(open) => {
          if (isShowTooltip) {
            setIsShowTooltip(open)
          }
        }}
        showArrow
        isOpen={isShowTooltip}
        content="完了！"
        color="success"
        placement="top"
        radius="sm"
        className="text-white"
      >
        <Card isPressable onPress={onOpen}>
          <CardBody className="overflow-visible p-0">
            <Image
              radius="none"
              as={NextImage}
              width={300}
              height={200}
              alt={name}
              className="h-[140px] w-full object-cover"
              src={photo_url ? photo_url : '/images/default_avatar.jpeg'}
            />
          </CardBody>
          <CardFooter className="flex-col justify-between gap-unit-1 text-small">
            <b>{name}</b>
            {/*<p className="text-default-500">{records[0]?.record_date}</p>*/}
          </CardFooter>
        </Card>
      </Tooltip>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        classNames={{
          header: 'border-b-[1px] border-[#cdcccc]',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {name}
              </ModalHeader>
              <ModalBody>
                {/*<RecordForm />*/}
                <ShowPlant {...props} />
              </ModalBody>
              <ModalFooter>
                <Backdrop sx={{ 'z-index': 50 }} open={speedDialOpen} />
                <SpeedDial
                  ariaLabel="Plant SpeedDial"
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                  }}
                  FabProps={{
                    color: 'success',
                  }}
                  icon={
                    <SpeedDialIcon
                      classes={{
                        root: '!h-fit',
                      }}
                      icon={
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <PiPottedPlantFill size="1.2rem" />
                          <Typography fontSize={9}>記録</Typography>
                        </Box>
                      }
                      openIcon={
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            left: '2%',
                          }}
                        >
                          <MdOutlineClose size="1.5rem" />
                          <Typography fontSize={9}>閉じる</Typography>
                        </Box>
                      }
                    />
                  }
                  onClose={handleSpeedDialClose}
                  onOpen={handleSpeedDialOpen}
                  open={speedDialOpen}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      tooltipOpen
                      TooltipClasses={{
                        tooltip: 'text-xl',
                      }}
                      onClick={action.func}
                      classes={{
                        staticTooltipLabel:
                          '!text-lg !font-medium !text-white !bg-transparent !shadow-none',
                      }}
                    />
                  ))}
                </SpeedDial>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        <Modal
          isOpen={childIsOpen}
          onOpenChange={childOnOpenChange}
          placement="center"
          scrollBehavior="inside"
          isDismissable={!isSubmitLoading}
          classNames={{
            closeButton:
              'absolute rounded-full bg-danger text-white -top-4 hover:bg-white hover:text-primary',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>お世話を記録する</ModalHeader>
                <ModalBody>
                  <RecordForm />
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="w-full text-white"
                    color="success"
                    onPress={submitHandler}
                    isLoading={isSubmitLoading}
                    isDisabled={editedRecord.record_date === ''}
                  >
                    記録する
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <EditMyPlantModal isOpen={isEditOpen} onOpenChange={onOpenEditChange} />
      </Modal>
      <Modal
        isOpen={isConfirmOpen}
        onOpenChange={onOpenConfirmChange}
        placement="center"
        scrollBehavior="inside"
        isDismissable={!isSubmitLoading}
        classNames={{
          closeButton:
            'absolute rounded-full bg-danger text-white -top-4 hover:bg-white hover:text-primary',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody className="text-center">
                <p className="text-xl">この植物を削除しますか？</p>
                <p className="text-sm">過去のお世話記録も削除されます。</p>
              </ModalBody>
              <ModalFooter>
                <Button className="text-white" onPress={onClose}>
                  キャンセル
                </Button>
                <Button
                  className="text-white"
                  color="danger"
                  onPress={deletePlant}
                  isLoading={isSubmitLoading}
                >
                  削除する
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
