import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bgLocale from 'date-fns/locale/bg';


export default function DatePickerBG() {

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={bgLocale} // for DatePicker component - locale={bgLocale}
    >
      <CalendarPicker />
    </LocalizationProvider>
  )
};

