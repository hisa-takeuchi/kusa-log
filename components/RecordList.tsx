import { FC } from 'react'
import { useQueryRecords } from '../hooks/useQueryRecords'
import { useQueryDistinctRecordDate } from '../hooks/useQueryDistinctRecordDate'
import { LoadingSpinner } from './LoadingSpinner'
import { RecordItem } from './RecordItem'
import { Accordion, AccordionItem } from '@nextui-org/react'

export const RecordList: FC = () => {
  const { data: records, status } = useQueryRecords()
  if (status === 'loading') return <LoadingSpinner />
  // TODO:エラー用のTooltipを追加する
  if (status === 'error') return <p>{'エラー'}</p>
  return (
    <Accordion>
      {records!.map((record) => (
        <AccordionItem
          aria-label={record.id}
          title={record.record_date}
          key={record.id}
          subtitle={record.my_plants?.name}
        ></AccordionItem>
      ))}
    </Accordion>
  )
}
