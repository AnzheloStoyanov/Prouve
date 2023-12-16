import { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import styles from './DatePicker.module.css'

const theme = createTheme({
    overrides: {
        MuiPickersCalendarHeader: {
            label: {
                fontSize: '18px',
                fontWeight: 'bold',
            },
        },
        MuiDayCalendar: {
            root: {
                border: '2px solid red',
                borderRadius: '8px',
            },
        },
    },
});

const StyledDatePicker = styled(DatePicker)({
    '& input': {
        // Customize input styles
        padding: '0',
        paddingLeft: '10px',
        height: '100%',
    },
    // Customize other styles
    height: '44px',
    borderRadius: '8px',
    marginTop: '10px',
    '& > div': {
        height: '44px',
        borderRadius: '8px',
    },

    '& .MuiPaper-root': {
        backgroundColor: 'red'
    },
    '& .MuiPickersCalendar-root ': {
        // Customize the calendar header styles
        backgroundColor: 'green'
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
        // Customize other styles related to the calendar header
        backgroundColor: 'lightgray',
    },
    '& .MuiPickersBasePicker-pickerView': {
        // Customize styles for the entire calendar popper
        border: '2px solid red',
        borderRadius: '8px',
    },
    '& .MuiPickersCalendarHeader-label': {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    // Customize the entire calendar popper
    '& .MuiDayCalendar-root': {
        border: '2px solid red',
        borderRadius: '8px',
    },
});

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className={styles.header}>Дата на раждане</div>
            <ThemeProvider theme={theme} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker sx={{

                        'div': {
                            height: '44px',
                            borderRadius: '8px',
                            marginTop: '10px',

                            '& input': {
                                borderRadius: '8px',
                                padding: '0',
                                paddingLeft: '10px'
                            }
                        }
                    }} />
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
};

export default CustomDatePicker;