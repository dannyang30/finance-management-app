import editIcon from "../assets/img/editIcon.svg"

function EditButton({ handleEditClick }) {
    return(
        <button className="edit-button" onClick={handleEditClick}>
            <img src={editIcon} className="editIcon"></img>
        </button>
    )
}
export default EditButton