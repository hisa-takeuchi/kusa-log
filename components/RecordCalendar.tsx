import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import { useQueryDistinctRecordDate } from '../hooks/useQueryDistinctRecordDate'
import { LoadingSpinner } from './LoadingSpinner'
import { EventContentArg } from '@fullcalendar/core'
import { CalendarEventButton } from './atoms/CalendarEventButton'

export const RecordCalendar = () => {
  const { data: record_dates, status } = useQueryDistinctRecordDate()
  if (status === 'loading') return <LoadingSpinner />
  const recordEvents = record_dates?.map((date) => {
    return {
      title: String(date.plant_names),
      start: new Date(date.record_date),
      end: new Date(date.record_date),
      description: 'test',
      backgroundColor: 'green',
      borderColor: 'green',
    }
  })

  return (
    <div className="rounded-sm border border-gray-300 p-5">
      <FullCalendar
        aspectRatio={0.7}
        events={recordEvents}
        locale={jaLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: '',
          center: 'title',
          end: 'prev,next',
        }}
        fixedWeekCount={false}
        showNonCurrentDates={false}
        dayCellContent={(e) => e.dayNumberText.replace('日', '')}
        eventContent={(arg: EventContentArg) => (
          <CalendarEventButton plants={arg.event.title} />
        )}
      />
    </div>
  )
}
