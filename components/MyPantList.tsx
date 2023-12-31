import { FC } from 'react'
import { useQueryMyPlants } from '../hooks/useQueryMyPlants'
import { LoadingSpinner } from './LoadingSpinner'
import { MyPlantItem } from './MyPlantItem'

export const MyPantList: FC = () => {
  const { data: myPlants, status } = useQueryMyPlants()
  if (status === 'loading') return <LoadingSpinner />
  if (status === 'error') return <p>{'エラー'}</p>
  return (
    <ul className="grid grid-cols-2 gap-unit-sm md:grid-cols-3 md:gap-unit-lg">
      {myPlants?.map((plant) => <MyPlantItem key={plant.id} {...plant} />)}
    </ul>
  )
}
