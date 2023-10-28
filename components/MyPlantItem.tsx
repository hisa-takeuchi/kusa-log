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
  Spacer,
  Accordion,
  AccordionItem,
} from '@nextui-org/react'
import { RecordForm } from './RecordForm'
import { useMutateRecord } from '../hooks/useMutateRecord'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { FormatDate } from '../libs/formatDate'
import { History } from '@mui/icons-material'

export const MyPlantItem: FC<Omit<MyPlant, 'created_at'>> = ({
  id,
  name,
  cut_date,
  replanted_date,
  user_id,
  soil_info,
  buy_at,
  photo_url,
  records,
}) => {
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
  const { editedRecord } = useStore()
  const { createRecordMutation, updateRecordMutation } = useMutateRecord()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isShowTooltip, setIsShowTooltip] = useState(false)

  const formatted = (date: string) => {
    if (!date) return null

    return new Date(date)
  }
  const latestDate = () => {
    const recordDate = records[records.length - 1]?.record_date
    if (!recordDate) return

    const d = new Date(recordDate)
    return FormatDate(d)
  }
  const submitHandler = () => {
    // 2秒止める
    setIsSubmitLoading(true)

    // TODO: promise 使用する
    setTimeout(() => {
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
        })
      }
      setIsSubmitLoading(false)
      setIsShowTooltip(true)
      onOpenChange()
    }, 1000)
  }

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
              shadow="sm"
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
        isDismissable={!isSubmitLoading}
        classNames={{
          closeButton:
            'absolute rounded-full bg-danger text-white -top-9 hover:bg-white hover:text-primary',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Accordion isCompact hidden={false}>
                  <AccordionItem title={name}>
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}
                    >
                      {latestDate() && (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 34, height: 34 }}>
                              <History></History>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText className="[&>span]:text-sm">
                            前回お世話した日：{latestDate()}
                          </ListItemText>
                        </ListItem>
                      )}
                      {/*{soil_info && (*/}
                      {/*  <ListItem>*/}
                      {/*    <ListItemText className="[&>span]:text-sm">*/}
                      {/*      土の配合：{soil_info}*/}
                      {/*    </ListItemText>*/}
                      {/*  </ListItem>*/}
                      {/*)}*/}
                      {/*{replanted_date && (*/}
                      {/*  <ListItem>*/}
                      {/*    <ListItemAvatar>*/}
                      {/*      <Avatar sx={{ width: 34, height: 34 }}></Avatar>*/}
                      {/*    </ListItemAvatar>*/}
                      {/*    <ListItemText className="[&>span]:text-sm">*/}
                      {/*      植え替えした日：*/}
                      {/*      {FormatDate(formatted(replanted_date))}*/}
                      {/*    </ListItemText>*/}
                      {/*  </ListItem>*/}
                      {/*)}*/}
                      {/*{cut_date && (*/}
                      {/*  <ListItem>*/}
                      {/*    <ListItemText className="[&>span]:text-sm">*/}
                      {/*      剪定した日：{FormatDate(formatted(cut_date))}*/}
                      {/*    </ListItemText>*/}
                      {/*  </ListItem>*/}
                      {/*)}*/}
                    </List>
                  </AccordionItem>
                </Accordion>
                <span className="text-sm font-medium">
                  お世話記録を追加する
                </span>
              </ModalHeader>
              <ModalBody>
                <RecordForm />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-white"
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
    </>
  )
}
