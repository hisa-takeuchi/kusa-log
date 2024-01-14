import { FC, useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { RecordForm } from '../../../components/RecordForm'
import { RecordButton } from '../../../components/organisms/RecordButton'
import useStore from '../../../store'
import { useMutateRecord } from '../../../hooks/useMutateRecord'
import { supabase } from '../../../utils/supabase'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

export const CreateRecordModal: FC<Props> = ({ isOpen, onOpenChange }) => {
  const { editedRecord, resetEditedRecord } = useStore()
  const { editedMyPlant } = useStore()
  const { createRecordMutation } = useMutateRecord()
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>('')

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
  const submitHandler = () => {
    new Promise(async (resolve) => {
      setIsSubmitLoading(true)
      createRecordMutation.mutate({
        user_id: userId,
        plant_id: editedMyPlant.id,
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
      resolve(() => {})
    })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsSubmitLoading(false)
        // setIsShowTooltip(true)
        onOpenChange()
        // handleSpeedDialClose()
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={resetEditedRecord}
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
              <RecordForm handleUploading={setIsUploading} />
            </ModalBody>
            <ModalFooter>
              <RecordButton
                submitHandler={submitHandler}
                isLoading={isSubmitLoading}
                isDisabled={editedRecord.record_date === '' || isUploading}
                name="記録する"
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
