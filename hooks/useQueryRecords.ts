import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Record } from '../types/types'
export const useQueryRecords = () => {
  const getRecords = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('records')
      .select(`*, my_plants:plant_id (name)`)
      .order('record_date', { ascending: false })
      .eq('user_id', user?.id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Record[], Error>({
    queryKey: ['records'],
    queryFn: getRecords,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
