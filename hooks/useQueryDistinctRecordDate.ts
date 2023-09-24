import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Record } from '../types/types'
export const useQueryDistinctRecordDate = () => {
  const getDistinctRecordDate = async () => {
    const { data, error } = await supabase
      .from('distinct_record_date')
      .select('*')
      .order('record_date', { ascending: false })
      .eq('user_id', supabase.auth.user()?.id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Record[], Error>({
    queryKey: ['record_date'],
    queryFn: getDistinctRecordDate,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
