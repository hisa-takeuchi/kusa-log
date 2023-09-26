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

export const MyPlantItem: FC<Omit<MyPlant, 'created_at'>> = ({
  id,
  name,
  cut_date,
  replanted_date,
  user_id,
  soil_info,
  buy_at,
  records,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedMyPlant)
  const { deleteMyPlantMutation } = useMutateMyPlants()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { editedRecord } = useStore()
  const { createRecordMutation, updateRecordMutation } = useMutateRecord()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isShowTooltip, setIsShowTooltip] = useState(false)
  const submitHandler = () => {
    // 2秒止める
    setIsSubmitLoading(true)

    // TODO: promise 使用する
    setTimeout(() => {
      if (editedRecord.id === '') {
        createRecordMutation.mutate({
          user_id: supabase.auth.user()?.id,
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
              src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
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
