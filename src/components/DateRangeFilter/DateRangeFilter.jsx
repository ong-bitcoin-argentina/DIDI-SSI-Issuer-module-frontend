import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./_style.scss";
import moment from "moment";
import { DATE_FORMAT } from "../../utils/constants/Constants";
moment.locale("es-AR", {
	months: [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	],
	weekdaysMin: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
});

const DateRangeFilter = ({ label, onChange }) => {
	const [start, setStart] = useState();
	const [end, setEnd] = useState();
	const [focused, setFocused] = useState();

	const handleChange = ({ startDate, endDate }) => {
		setStart(startDate);
		setEnd(endDate);
	};

	useEffect(() => {
		onChange({ start, end });
	}, [start, end]);

	return (
		<div className="DateContainer">
			<div>{label}</div>
			<DateRangePicker
				startDate={start}
				startDateId="start_date"
				endDate={end}
				endDateId="end_date"
				onDatesChange={handleChange}
				focusedInput={focused}
				onFocusChange={val => setFocused(val)}
				startDatePlaceholderText="Desde"
				endDatePlaceholderText="Hasta"
				displayFormat={DATE_FORMAT}
				withPortal
				showClearDates
				small
				hideKeyboardShortcutsPanel
				isOutsideRange={() => false}
			/>
		</div>
	);
};

export default DateRangeFilter;
