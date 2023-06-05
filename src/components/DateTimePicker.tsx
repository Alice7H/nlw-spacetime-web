'use client'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { X, Calendar } from 'lucide-react'

interface Props {
  memoryDateTime: string | Date
  changeMemoryDateTime: (value: Date) => void
}

export function DTimePicker({ memoryDateTime, changeMemoryDateTime }: Props) {
  return (
    <div>
      <DateTimePicker
        name="createdAt"
        id="createdAt"
        value={memoryDateTime}
        onChange={(value) =>
          changeMemoryDateTime(value ? (value as Date) : new Date())
        }
        calendarClassName="border rounded-sm text-gray-700 color-white"
        renderNumbers={true}
        clockClassName="text-gray-700"
        minuteHandWidth={3}
        format="dd-MM-yyyy HH:mm:ss"
        maxDate={new Date()}
        clearIcon={
          <X size={19} className="text-bold text-gray-200 hover:text-red-600" />
        }
        calendarIcon={
          <Calendar
            size={19}
            className="text-bold text-gray-200 hover:text-blue-600"
          />
        }
      />
    </div>
  )
}
