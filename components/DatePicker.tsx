import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'
import ja from 'date-fns/locale/ja'

registerLocale('ja', ja)

export const DatePicker = (props: ReactDatePickerProps) => {
  return (
    <ReactDatePicker
      popperPlacement="auto"
      locale={ja}
      className="border border-gray-300 text-base"
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="datepicker__header">
          <button className="datepicker__button" onClick={decreaseMonth}>
            {'<'}
          </button>
          <div className="datepicker__header-date">
            <div className="datepicker__header-date__year">
              {dayjs(date).year()}年
            </div>
            <div className="datepicker__header-date__month">
              {dayjs(date).month() + 1}月
            </div>
          </div>
          <button className="datepicker__button" onClick={increaseMonth}>
            {'>'}
          </button>
        </div>
      )}
      {...props}
    />
  )
}
