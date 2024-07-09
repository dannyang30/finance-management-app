import resetButtonIcon from '../assets/img/resetButtonIcon.svg'

function ResetButton({ handleResetClick }) {
    return(<button className='reset-button' onClick={handleResetClick}>
        <p>Reset</p>
        <img src={resetButtonIcon} className='resetButtonIcon'></img>
    </button>)
}
export default ResetButton;
