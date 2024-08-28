import { MatDateFormats } from "@angular/material/core";

export const DayMonthYearPickerFormat: MatDateFormats = {
  parse: {
    dateInput: "DD-MM-YYYY",
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "MM-YYYY",
    dateA11yLabel: "DD-MM-YYYY",
    monthYearA11yLabel: "MM-YYYY",
  },
};
