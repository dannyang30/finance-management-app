import moment from "moment"

function formatDate(dateString) {
    const formattedDate = moment(dateString).format('YYYY-MM-DD');
    return formattedDate;
}

function DateField({ name, label, defaultValue }) {
   return(
        <div className="date-field">
            <label htmlFor={name}>{label}</label>
            <input id={name} type="date" name={name} defaultValue={formatDate(defaultValue)}/>
        </div>
    )
};
export default DateField    



 


















