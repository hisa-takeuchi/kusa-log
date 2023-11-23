import { FC } from 'react'
import useStore from '../store'
import { useMutateRecord } from '../hooks/useMutateRecord'
import { useQueryMyPlants } from '../hooks/useQueryMyPlants'
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Textarea,
} from '@nextui-org/react'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import Rating, { IconContainerProps } from '@mui/material/Rating'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Typography } from '@mui/material'
import { WindPower } from '../types/types'

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}))

export const customIcons: {
  [index: string]: {
    icon: React.ReactElement
    label: string
  }
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
    label: '絶不調',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="large" />,
    label: '不調',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="large" />,
    label: '普通',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
    label: '好調',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
    label: '絶好調',
  },
}

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props
  return <span {...other}>{customIcons[value].icon}</span>
}
export const RecordForm: FC = () => {
  const { editedRecord } = useStore()
  const update = useStore((state) => state.updateEditedRecord)

  return (
    <div className="mb-3">
      <Input
        isRequired
        label="日付"
        type="date"
        placeholder="Enter your email"
        variant="bordered"
        defaultValue={editedRecord.record_date}
        onChange={(e) =>
          update({ ...editedRecord, record_date: e.target.value })
        }
      />
      <Spacer y={4} />
      <div className="flex justify-between px-1 py-2">
        <Checkbox
          size="lg"
          classNames={{
            label: 'text-small',
          }}
          checked={editedRecord.is_water}
          onChange={(e) =>
            update({ ...editedRecord, is_water: e.target.checked })
          }
        >
          みずやり
        </Checkbox>

        <Checkbox
          size="lg"
          classNames={{
            label: 'text-small',
          }}
          checked={editedRecord.is_fertilizer}
          onChange={(e) =>
            update({ ...editedRecord, is_fertilizer: e.target.checked })
          }
        >
          肥料
        </Checkbox>

        <Checkbox
          size="lg"
          name="殺虫・殺菌"
          classNames={{
            label: 'text-small',
          }}
          checked={editedRecord.is_chemical}
          onChange={(e) =>
            update({ ...editedRecord, is_chemical: e.target.checked })
          }
        >
          殺虫・殺菌
        </Checkbox>
      </div>
      <Spacer y={4} />
      <Accordion isCompact>
        <AccordionItem title="もっと詳細に記録する">
          <Spacer y={4} />
          <div className="px-1 py-2">
            <Typography component="legend">植物の様子</Typography>
            <Spacer y={4} />
            <StyledRating
              size="large"
              name="highlight-selected-only"
              className="w-full"
              IconContainerComponent={IconContainer}
              getLabelText={(value: number) => customIcons[value].label}
              highlightSelectedOnly
              onChange={(e, newVal) =>
                update({ ...editedRecord, condition: newVal })
              }
            />
          </div>
          <div className="flex justify-between px-1 py-2">
            <CheckboxGroup
              className="gap-unit-1"
              label="天気"
              value={editedRecord.weather}
              orientation="horizontal"
              onValueChange={(val) => {
                if (val.length > 1) return
                update({ ...editedRecord, weather: val })
              }}
            >
              <Checkbox value="1">晴れ</Checkbox>
              <Checkbox value="2">雨</Checkbox>
              <Checkbox value="3">くもり</Checkbox>
              <Checkbox value="4">雪</Checkbox>
            </CheckboxGroup>
          </div>
          <Spacer y={4} />
          <div className="flex justify-between px-1 py-2">
            <CheckboxGroup
              className="gap-unit-1"
              label="風の強さ"
              value={editedRecord.wind_power}
              orientation="horizontal"
              onValueChange={(val) => {
                if (val.length > 1) return
                update({ ...editedRecord, wind_power: val as WindPower[] })
              }}
            >
              <Checkbox value="1">弱</Checkbox>
              <Checkbox value="2">普通</Checkbox>
              <Checkbox value="3">強</Checkbox>
            </CheckboxGroup>
          </div>
          <Spacer y={4} />
          <div className="flex justify-between px-1 py-2">
            <Input
              labelPlacement="outside"
              radius="sm"
              label="光量"
              placeholder="5万ルクス"
              variant="bordered"
              value={editedRecord.light_power}
              onChange={(e) =>
                update({ ...editedRecord, light_power: e.target.value })
              }
            />
          </div>
          <Spacer y={4} />
          <div className="flex justify-between px-1 py-2">
            <Input
              labelPlacement="outside"
              radius="sm"
              label="温度"
              placeholder="25℃"
              variant="bordered"
              value={editedRecord.temp}
              onChange={(e) =>
                update({ ...editedRecord, temp: e.target.value })
              }
            />
          </div>
          <Spacer y={4} />
          <div className="flex justify-between px-1 py-2">
            <Textarea
              labelPlacement="outside"
              radius="sm"
              label="メモ"
              placeholder="新芽が出た"
              variant="bordered"
              value={editedRecord.memo}
              onChange={(e) =>
                update({ ...editedRecord, memo: e.target.value })
              }
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
