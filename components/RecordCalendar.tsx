import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import { useQueryDistinctRecordDate } from '../hooks/useQueryDistinctRecordDate'
import { LoadingSpinner } from './LoadingSpinner'
import { EventContentArg } from '@fullcalendar/core'
import { SunIcon } from '@heroicons/react/solid'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'
const EventComponent = (title: string) => {
  return (
    // <Tooltip showArrow={true} content={title}>
    <SunIcon className="h-6 text-red-500"></SunIcon>
    // </Tooltip>
  )
}
export const RecordCalendar = () => {
  const { data: record_dates, status } = useQueryDistinctRecordDate()
  if (status === 'loading') return <LoadingSpinner />
  const recordEvents = record_dates?.map((date) => {
    return {
      title: 'test',
      start: new Date(date.record_date),
      end: new Date(date.record_date),
      description: 'test',
      backgroundColor: 'green',
      borderColor: 'green',
    }
  })

  return (
    <FullCalendar
      events={recordEvents}
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        start: '',
        center: 'title',
        end: 'prev,next',
      }}
      contentHeight="400px"
      dayCellContent={(e) => e.dayNumberText.replace('日', '')}
      eventContent={(arg: EventContentArg) => EventComponent(arg.event.title)}
    />
  )
}
