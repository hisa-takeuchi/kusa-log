import { useQueryClient, useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Record, EditedRecord } from '../types/types'

export const useMutateRecord = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedRecord)
  const createRecordMutation = useMutation(
    async (record: Omit<Record, 'id' | 'created_at' | 'my_plants'>) => {
      const { data, error } = await supabase
        .from('records')
        .insert(record)
        .select()

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (res) => {
        const previousRecords = queryClient.getQueryData<Record[]>(['records'])

        if (previousRecords) {
          queryClient.setQueryData(['records'], [...previousRecords, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        console.log(err.message)
        reset()
      },
    },
  )
  const updateRecordMutation = useMutation(
    async (record: EditedRecord) => {
      const { data, error } = await supabase
        .from('records')
        .update({
          is_water: record.is_water,
          is_fertilizer: record.is_fertilizer,
          is_chemical: record.is_chemical,
          record_date: record.record_date,
        })
        .eq('id', record.id)
        .select()

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousRecords = queryClient.getQueryData<Record[]>(['records'])
        if (previousRecords) {
          queryClient.setQueryData(
            ['records'],
            previousRecords.map((record) =>
              record.id === variables.id ? res[0] : record,
            ),
          )
        }
        reset()
      },
      onError: (err: any) => {
        console.log(err.message)
        reset()
      },
    },
  )
  const deleteRecordMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('records')
        .delete()
        .eq('id', id)
        .select()

      if (error) throw new Error(error.message)

      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousRecords = queryClient.getQueryData<Record[]>(['records'])
        if (previousRecords) {
          queryClient.setQueryData(
            ['records'],
            previousRecords.filter((record) => record.id !== variables),
          )
        }
        reset()
      },
      onError: (err: any) => {
        console.log(err.message)
        reset()
      },
    },
  )
  return {
    createRecordMutation,
    updateRecordMutation,
    deleteRecordMutation,
  }
}
