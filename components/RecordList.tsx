import { FC } from 'react'
import { useQueryRecords } from '../hooks/useQueryRecords'
import { LoadingSpinner } from './LoadingSpinner'
import { RecordItem } from './RecordItem'

export const RecordList: FC = () => {
  const { data: records, status } = useQueryRecords()
  if (status === 'loading') return <LoadingSpinner />
  // TODO:エラー用のTooltipを追加する
  if (status === 'error') return <p>{'エラー'}</p>

  return (
    <ul>
      {records?.map((record) => <RecordItem key={record.id} {...record} />)}
    </ul>
  )
}
