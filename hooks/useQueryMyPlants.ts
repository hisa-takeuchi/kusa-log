import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { MyPlant } from '../types/types'
export const useQueryMyPlants = () => {
  const getMyPlants = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('my_plants')
      .select('*, records(*)')
      .order('record_date', { foreignTable: 'records', ascending: false })
      .order('created_at', { ascending: false })
      .eq('user_id', user?.id)
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery<MyPlant[], Error>({
    queryKey: ['my_plants'],
    queryFn: getMyPlants,
    staleTime: 0,
  })
}
