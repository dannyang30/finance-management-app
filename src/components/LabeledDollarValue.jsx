function LabledDollarValue(props) {
    
    return(
        <div className='labeled-dollar-value'>
            <span>{props.label}</span>
            <span>{props.value}</span>
        </div>
    )
}
export default LabledDollarValue