import { FC } from 'react'
import { useQueryRecords } from '../hooks/useQueryRecords'
import { useQueryDistinctRecordDate } from '../hooks/useQueryDistinctRecordDate'
import { LoadingSpinner } from './LoadingSpinner'
import { RecordItem } from './RecordItem'
import { Accordion, AccordionItem } from '@nextui-org/react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material'
import { LocalPharmacy, Science, WaterDrop } from '@mui/icons-material'
import { blue, green, yellow } from '@mui/material/colors'

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
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem>
              {record.is_water && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>
                    <WaterDrop />
                  </Avatar>
                </ListItemAvatar>
              )}
              {record.is_chemical && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: yellow[700] }}>
                    <Science />
                  </Avatar>
                </ListItemAvatar>
              )}
              {record.is_fertilizer && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: green[500] }}>
                    <LocalPharmacy />
                  </Avatar>
                </ListItemAvatar>
              )}
            </ListItem>
          </List>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
