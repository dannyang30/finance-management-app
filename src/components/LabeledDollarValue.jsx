import PropTypes from 'prop-types';

function LabeledDollarValue(props) {
    
    return(
        <div className='labeled-dollar-value'>
            <span>{props.label}</span>
            <span>{props.value}</span>
        </div>
    )
}

LabeledDollarValue.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};


export default LabeledDollarValue
