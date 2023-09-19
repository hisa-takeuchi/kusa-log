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
  return (
    <li className="my-3 justify-between text-lg font-extrabold">
      <div>
        <span>{plant_id}</span>
        <span>水やり：{is_water ? '◯' : '-'}</span>
        <span>肥料：{is_fertilizer ? '◯' : '-'}</span>
        <span>殺虫・殺菌：{is_chemical ? '◯' : '-'}</span>
      </div>
      <div className="flex">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-green-500"
          onClick={() => {
            update({
              id,
              record_date,
              plant_id,
              is_water,
              is_fertilizer,
              is_chemical,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-green-500"
          onClick={() => {
            deleteRecordMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
