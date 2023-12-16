import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useState } from 'react';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import useLocale from '../../../hooks/useLocale';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatepicker = ({ onChange, maxDate, minDate, isDayDisabled, selectableDates, closeOnSelect, customInput, name }) => {
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate() + 1);

    const [selected, setSelected] = useState(new Date(eighteenYearsAgo.getFullYear(), eighteenYearsAgo.getMonth(), eighteenYearsAgo.getDate() - 1));
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const locale = useLocale();
    registerLocale(`${i18n.language}`, i18n.language)

    const isDateDisabled = (date) => {

        if (selectableDates) {

            selectableDates.map((dateRange) => {
                return date.getDate() < dateRange.startDate && date.getDate() > dateRange.endDate;
            })
        } else {

            return date < eighteenYearsAgo
        }
    };


    const handleChange = (date) => {
        // setIsOpen(false)
        setSelected(date)

        if (onChange) {
            onChange(date)
        }
    }

    const handleInputClick = () => {
        setIsOpen(true)
    }

    // const isDisabled = (date) => {
    // };

    registerLocale(i18n.language, locale)
    setDefaultLocale(i18n.language)

    const startDate = minDate ?? new Date(1900, 0, 1);
    const endDate = maxDate ?? eighteenYearsAgo;

    return (
        <DatePicker
            name={name}
            onInputClick={handleInputClick}
            selected={selected}
            onChange={handleChange}
            className="custom-datepicker"
            closeOnSelect={closeOnSelect ?? true}
            customInput={customInput}
            showMonthYearDropdown
            filterDate={isDateDisabled}
            //excludeDateIntervals={[{ start: endDate, end: new Date() }]}
            minDate={startDate}
            maxDate={endDate}
            dropdownMode="scroll"
            // scrollToDate={new Date("2005", "17", "11")}
            previousMonthAriaLabel=''
        >
            <Button
                className={'simpleButtonLightBlue'}
                style={{ borderRadius: '24px', padding: '13px 31px' }}
                onClick={() => setSelected(null)}
                disabled={!selected}
            >
                ОТКАЗ
            </Button>
        </DatePicker>
    )
};

export default CustomDatepicker;