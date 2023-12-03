import { Record } from '../types/types'

export const CalcTimeInterval = (records: Record[]) => {
  const isWaterRecords = records.filter((record) => record.is_water)
  const isWaterCount = isWaterRecords.length

  if (isWaterCount < 5) return null

  const today = new Date()
  const firstRecordDate = isWaterRecords[isWaterCount - 1].record_date

  const totalDays = Math.ceil(
    (today.getTime() - new Date(firstRecordDate).getTime()) /
      (24 * 60 * 60 * 1000),
  )

  // 1週間あたりの水やり回数
  const wateringFrequencyPerWeek = (isWaterCount / totalDays) * 7

  // 小数点2位以下切り捨て
  return Math.floor(wateringFrequencyPerWeek * 10) / 10
}
