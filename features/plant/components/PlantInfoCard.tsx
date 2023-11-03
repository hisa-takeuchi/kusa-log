import { FC } from 'react'
import { MyPlant } from '../../../types/types'
import { Box, Card, CardContent, CardMedia } from '@mui/material'
import { Spacer } from '@nextui-org/react'
import { FormatDate } from '../../../utils/formatDate'

export const PlantInfoCard: FC<
  Pick<
    MyPlant,
    'photo_url' | 'soil_info' | 'buy_at' | 'replanted_date' | 'cut_date'
  >
> = ({ photo_url, soil_info, buy_at, replanted_date, cut_date }) => {
  return (
    <Card sx={{ display: 'flex', minHeight: 150 }}>
      <CardMedia
        component="img"
        sx={{ width: '50%' }}
        image={photo_url || '/images/default_avatar.jpeg'}
      />
      <Box sx={{ width: '50%' }}>
        <CardContent>
          <dl>
            <dt className="text-xs text-theme-medium">用土の配合</dt>
            <Spacer y={2} />
            <dd className="text-right text-sm">
              {soil_info ? soil_info : '-'}
            </dd>
            <Spacer y={4} />
            <dt className="text-xs text-theme-medium">お迎えした日</dt>
            <Spacer y={2} />
            <dd className="text-right text-sm">
              {buy_at ? FormatDate(new Date(buy_at)) : '-'}
            </dd>
            <Spacer y={4} />
            <dt className="text-xs text-theme-medium">植え替えした日</dt>
            <Spacer y={2} />
            <dd className="text-right text-sm">
              {replanted_date ? FormatDate(new Date(replanted_date)) : '-'}
            </dd>
            <Spacer y={4} />
            <dt className="text-xs text-theme-medium">剪定した日</dt>
            <Spacer y={2} />
            <dd className="text-right text-sm">
              {cut_date ? FormatDate(new Date(cut_date)) : '-'}
            </dd>
          </dl>
        </CardContent>
      </Box>
    </Card>
  )
}
