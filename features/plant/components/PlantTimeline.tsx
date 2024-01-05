import { Accordion, AccordionItem, Spacer } from '@nextui-org/react'
import { MyPlant } from '../../../types/types'
import { FC, ReactNode } from 'react'
import { FormatDate } from '../../../utils/formatDate'
import { Avatar } from '@mui/material'
import {
  AcUnit,
  Cloud,
  LocalPharmacy,
  Note,
  Science,
  Thunderstorm,
  WaterDrop,
  WbSunny,
} from '@mui/icons-material'
import {
  blue,
  green,
  grey,
  lightBlue,
  orange,
  yellow,
} from '@mui/material/colors'

const RecordIcon: FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'water':
      return (
        <Avatar sx={{ bgcolor: blue[500] }}>
          <WaterDrop />
        </Avatar>
      )
    case 'fertilizer':
      return (
        <Avatar sx={{ bgcolor: green[500] }}>
          <LocalPharmacy />
        </Avatar>
      )
    case 'chemical':
      return (
        <Avatar sx={{ bgcolor: yellow[700] }}>
          <Science />
        </Avatar>
      )
    default:
      return (
        <Avatar>
          <Note />
        </Avatar>
      )
  }
}
export const PlantTimeline: FC<Pick<MyPlant, 'records'>> = ({ records }) => {
  return (
    <div>
      <h3 className="font-bold">タイムライン</h3>
      <Spacer y={3} />
      {(!records || records?.length === 0) && <p>お世話記録がありません</p>}
      <Accordion selectionMode="multiple" isCompact>
        {records?.map((record) => (
          <AccordionItem
            key={record.id}
            title={FormatDate(new Date(record.record_date))}
            startContent={
              <RecordIcon
                status={
                  record.is_water
                    ? 'water'
                    : record.is_fertilizer
                    ? 'fertilizer'
                    : record.is_chemical
                    ? 'chemical'
                    : 'note'
                }
              />
            }
          ></AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
