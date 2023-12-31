import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Record } from '../types/types'

interface RecordDateProps {
  record_date: string
  plant_names: string[]
  user_id: string
}

export const useQueryDistinctRecordDate = () => {
  const getDistinctRecordDate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('distinct_record_date')
      .select('*')
      .order('record_date', { ascending: false })
      .eq('user_id', user?.id)
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<RecordDateProps[], Error>({
    queryKey: ['record_date'],
    queryFn: getDistinctRecordDate,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
