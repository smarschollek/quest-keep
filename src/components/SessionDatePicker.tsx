"use client"
import { Box } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import { ReactElement, useState } from "react"
import { LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers"

export const SessionDatePicker = () => {
    const [values, setValues] = useState<Dayjs[]>([])

    const handleOnChange = (value: Dayjs | null) => {
        if (value === null) {
            return
        }

        if (values.some((v) => v.isSame(value, 'day'))) {
            setValues(values.filter((v) => !v.isSame(value, 'day')))
            return
        }

        setValues([...values, value])
    }

    const CustomDay = (props: PickersDayProps<Dayjs>) => {

        const isSelected = values.some((value) => value.isSame(props.day, 'day'))



        return (
            <PickersDay {...props} selected={isSelected} />
        )
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                sx={{
                    backgroundColor: 'transparent'
                }}
                slots={{
                    day: CustomDay,
                    toolbar: () => null
                }}

                value={null}
                onChange={handleOnChange}
                minDate={dayjs('2022-04-01')}
                maxDate={dayjs('2022-05-31')}
            />
        </LocalizationProvider>
    )
}