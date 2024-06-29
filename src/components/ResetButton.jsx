import resetButtonIcon from '../assets/img/resetButtonIcon.svg'

function ResetButton() {
    return(<button className='reset-button'>
        <p>Reset</p>
        <img src={resetButtonIcon} className='resetButtonIcon'></img>
    </button>)
}
export default ResetButton
