import { MyPlant } from '../../../types/types'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
} from '@mui/material'
import { Spacer } from '@nextui-org/react'
import { PlantInfoCard } from './PlantInfoCard'
import { PlantTimeline } from './PlantTimeline'
import { PlantGallery } from './PlantGallery'
import { TabPanel } from '../../../components/organisms/TabPanel'
import {
  GridOnOutlined,
  HistoryOutlined,
  PhotoLibraryOutlined,
} from '@mui/icons-material'

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
  const [tabValue, setTabValue] = useState(0)
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

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const a11yProps = (index: number) => {
    return {
      id: `plant-tab-${index}`,
      'aria-controls': `plant-tabpanel-${index}`,
    }
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
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={tabValue}
        onChange={handleTabChange}
        aria-label="plant tabs"
        variant="fullWidth"
      >
        <Tab
          icon={<HistoryOutlined />}
          label="お世話記録"
          wrapped
          {...a11yProps(0)}
        />
        <Tab
          icon={<GridOnOutlined />}
          label="ギャラリー"
          wrapped
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel index={0} value={tabValue}>
        <PlantTimeline records={records} />
      </TabPanel>
      <TabPanel index={1} value={tabValue}>
        <PlantGallery records={records} />
      </TabPanel>
    </div>
  )
}
