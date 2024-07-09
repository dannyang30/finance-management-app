import addIcon from "../assets/img/addIcon.svg";

function AddButton({ handleAddClick }) {
    return(
        <button className="add-button" onClick={handleAddClick}>
            <img src={addIcon} alt="Add Transaction" className="addIcon" />
        </button>
    )
}
export default AddButton;

