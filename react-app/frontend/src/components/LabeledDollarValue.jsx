import PropTypes from 'prop-types';

function LabeledDollarValue(props) {    
    return(
        <div className='labeled-dollar-value'>
            <div className='label'>{props.label}</div>
            <div className='value' style={props.style}>{props.value}</div>
        </div>
    )
};
export default LabeledDollarValue;
