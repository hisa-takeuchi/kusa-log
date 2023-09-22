import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { MyPlant, EditedMyPlant, Record, EditedRecord } from '../types/types'

export const useMutateMyPlants = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedMyPlant)
  const createMyPlantMutation = useMutation(
    async (myPlant: Omit<MyPlant, 'id' | 'created_at' | 'records'>) => {
      const { data, error } = await supabase.from('my_plants').insert(myPlant)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (res) => {
        const previousMyPlants = queryClient.getQueryData<Record[]>([
          'my_plants',
        ])
        if (previousMyPlants) {
          queryClient.setQueryData(['my_plants'], [...previousMyPlants, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    },
  )
  const updateMyPlantMutation = useMutation(
    async (myPlant: EditedMyPlant) => {
      const { data, error } = await supabase
        .from('my_plants')
        .update({
          name: myPlant.name,
          buy_at: myPlant.buy_at,
          soil_info: myPlant.soil_info,
          cut_date: myPlant.cut_date,
          replanted_date: myPlant.replanted_date,
        })
        .eq('id', myPlant.id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousMyPlant = queryClient.getQueryData<MyPlant[]>([
          'my_plants',
        ])
        if (previousMyPlant) {
          queryClient.setQueryData(
            ['my_plants'],
            previousMyPlant.map((myPlant) =>
              myPlant.id === variables.id ? res[0] : myPlant,
            ),
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    },
  )
  const deleteMyPlantMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('my_plants')
        .delete()
        .eq('id', id)

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousMyPlant = queryClient.getQueryData<Record[]>([
          'my_plants',
        ])
        if (previousMyPlant) {
          queryClient.setQueryData(
            ['my_plants'],
            previousMyPlant.filter((myPlant) => myPlant.id !== variables),
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    },
  )
  return {
    createMyPlantMutation,
    updateMyPlantMutation,
    deleteMyPlantMutation,
  }
}
