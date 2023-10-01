import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { MyPlant } from '../types/types'
export const useQueryMyPlants = () => {
  const getMyPlants = async () => {
    const { data, error } = await supabase
      .from('my_plants')
      .select('*, records(*)')
      .order('created_at', { ascending: false })
      .eq('user_id', supabase.auth.user()?.id)
    if (error) {
      throw new Error(`${error.message}: ${error.details}`)
    }
    return data
  }
  return useQuery<MyPlant[], Error>({
    queryKey: ['my_plants'],
    queryFn: getMyPlants,
    // staleTime: 10000,
    refetchOnWindowFocus: true,
  })
}
