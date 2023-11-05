import { MyPlant } from '../../../types/types'
import { FC, useEffect, useState } from 'react'
import { Alert, Box, Card, CardContent, CardMedia } from '@mui/material'
import { Spacer } from '@nextui-org/react'
import { PlantInfoCard } from './PlantInfoCard'
import { PlantTimeline } from './PlantTimeline'

export const ShowPlant: FC<Omit<MyPlant, 'created_at'>> = (props) => {
  const {
    id,
    name,
    cut_date,
    replanted_date,
    user_id,
    soil_info,
    buy_at,
    photo_url,
    records,
  } = props

  const [diffDate, setDiffDate] = useState(0)
  const waterRecords = records?.filter((record) => record.is_water)

  const getDiffDate = () => {
    if (!waterRecords || waterRecords.length === 0) return

    const lastRecordDateStr = waterRecords[0].record_date
    const lastRecordDate = new Date(lastRecordDateStr)

    const today = new Date()

    const diff = today.getTime() - lastRecordDate.getTime()

    const date = Math.floor(Math.abs(diff) / (24 * 60 * 60 * 1000))

    setDiffDate(date)
  }

  useEffect(() => {
    getDiffDate()
  }, [])

  return (
    <div>
      <Spacer y={3} />
      {waterRecords && waterRecords.length > 0 && (
        <Alert severity="info">
          前回の水やりから<span> {diffDate}</span>日が経過しています。
        </Alert>
      )}
      <Spacer y={5} />
      <PlantInfoCard {...props} />
      <Spacer y={5} />
      <PlantTimeline records={records} />
    </div>
  )
}
