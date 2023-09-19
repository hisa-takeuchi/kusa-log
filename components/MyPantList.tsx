import { FC } from 'react'
import { useQueryMyPlants } from '../hooks/useQueryMyPlants'
import { Spinner } from './Spinner'
import { MyPlantItem } from './MyPlantItem'

export const MyPantList: FC = () => {
  const { data: myPlants, status } = useQueryMyPlants()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{'エラー'}</p>
  return (
    <ul className="my-2">
      {myPlants?.map((plant) => <MyPlantItem key={plant.id} {...plant} />)}
    </ul>
  )
}
