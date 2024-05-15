import React from 'react';

const DatePickerCustomHeader = ({ date, decreaseMonth, increaseMonth, changeMonth, changeYear}) => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 20; i++) {
      years.push(i);
    }
  
  
    const months = Array.from({ length: 12 }, (_, i) => new Date(date.getFullYear(), i, 1));
  
    const handleMonthChange = e => {
      const selectedMonth = parseInt(e.target.value, 10);
      changeMonth(selectedMonth);
    };
  
    const handleYearChange = e => {
      const selectedYear = parseInt(e.target.value, 10);
      changeYear(selectedYear);
    };
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <button onClick={decreaseMonth} type="button" className="react-datepicker__navigation react-datepicker__navigation--previous" aria-label="Previous Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">Previous Month</span></button>
        <select value={date.getMonth()} onChange={handleMonthChange} style={{ marginLeft: '60px'}}>
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month.toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        
        <select value={date.getFullYear()} onChange={handleYearChange} style={{ marginRight: '60px'}}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
       
        <button onClick={increaseMonth} type="button" className="react-datepicker__navigation react-datepicker__navigation--next" aria-label="Next Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">Next Month</span></button>
      </div>
    );
}

export default DatePickerCustomHeader
