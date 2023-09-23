import { FC } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import useStore from '../store'
import { useMutateRecord } from '../hooks/useMutateRecord'
import { Record } from '../types/types'

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
  return <li className="my-3 justify-between text-lg font-extrabold"></li>
}
