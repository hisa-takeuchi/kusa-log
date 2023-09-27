import { FC } from 'react'
import useStore from '../store'
import { useMutateRecord } from '../hooks/useMutateRecord'
import { Record } from '../types/types'
import { AccordionItem, Avatar } from '@nextui-org/react'

export const RecordItem: FC<Omit<Record, 'created_at' | 'user_id'>> = ({
  id,
  record_date,
  plant_id,
  is_water,
  is_fertilizer,
  is_chemical,
}) => {
  const update = useStore((state) => state.updateEditedRecord)
  const { deleteRecordMutation } = useMutateRecord()
  return (
    <AccordionItem aria-label={id} title={record_date} key={id}></AccordionItem>
  )
}
