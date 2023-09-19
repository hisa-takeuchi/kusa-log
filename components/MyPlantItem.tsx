import { FC, useEffect, useState } from 'react'
import { MyPlant } from '../types/types'
import useStore from '../store'
import { useMutateMyPlants } from '../hooks/useMutateMyPlant'
import { supabase } from '../utils/supabase'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export const MyPlantItem: FC<Omit<MyPlant, 'created_at'>> = ({
  id,
  name,
  cut_date,
  replanted_date,
  user_id,
  soil_info,
  buy_at,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedMyPlant)
  const { deleteMyPlantMutation } = useMutateMyPlants()
  useEffect(() => {
    setUserId(supabase.auth.user()?.id)
  }, [])

  return (
    <li className="my-3 text-lg font-extrabold flex justify-between">
      <div>
        <span>{name}</span>
        <span>{cut_date}</span>
        <span>{replanted_date}</span>
        <span>{buy_at}</span>
        <span>{soil_info}</span>
      </div>
      {userId === user_id && (
        <div className="flex">
          <PencilAltIcon
            className="mx-1 h-5 w-5 cursor-pointer text-green-500"
            onClick={() => {
              update({
                id,
                name,
                buy_at,
                cut_date,
                replanted_date,
                soil_info,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-green-500"
            onClick={() => {
              deleteMyPlantMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
