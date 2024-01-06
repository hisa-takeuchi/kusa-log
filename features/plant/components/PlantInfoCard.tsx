import { FC, useEffect, useState } from 'react'
import { MyPlant } from '../../../types/types'
import { Box, Card, CardContent, CardMedia } from '@mui/material'
import { Image, Spacer } from '@nextui-org/react'
import { FormatDate } from '../../../utils/formatDate'
import { CalcTimeInterval } from '../../../utils/calcTimeInterval'
import NextImage from 'next/image'

export const PlantInfoCard: FC<
  Pick<
    MyPlant,
    | 'photo_url'
    | 'soil_info'
    | 'buy_at'
    | 'replanted_date'
    | 'cut_date'
    | 'records'
  >
> = ({ photo_url, soil_info, buy_at, replanted_date, cut_date, records }) => {
  const [wateringInterval, setWateringInterval] = useState<number | null>(null)
  useEffect(() => {
    setWateringInterval(CalcTimeInterval(records))
  }, [])

  return (
    <>
      <Image
        radius="sm"
        as={NextImage}
        className="z-0 h-[350px] w-full object-cover"
        height="350"
        width="350"
        src={photo_url || '/images/default_avatar.jpeg'}
        alt=""
        blurDataURL={photo_url || '/images/default_avatar.jpeg'}
      />
      <Spacer y={4} />
      <Card sx={{ minHeight: 150 }}>
        <Box>
          <CardContent>
            <dl>
              <dt className="text-xs text-theme-medium">用土の配合</dt>
              <Spacer y={2} />
              <dd
                className={
                  soil_info ? 'whitespace-pre-wrap text-sm' : 'text-right'
                }
              >
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
              <Spacer y={4} />
              <dt className="text-xs text-theme-medium">
                これまでの平均水やり頻度
              </dt>
              <Spacer y={2} />
              <dd className="text-right text-sm">
                {wateringInterval ? `${wateringInterval}回/週` : '-'}
              </dd>
            </dl>
          </CardContent>
        </Box>
      </Card>
    </>
  )
}
