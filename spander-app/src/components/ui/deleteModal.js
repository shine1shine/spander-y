import { useDispatch, useSelector } from "react-redux";
import { modalsActions, modalsSelectors } from "../../redux/slices/modalsSlice";
import { Button, Modal } from "react-bootstrap";

export const DeleteModal = ({ onDelete }) => {
    const { isVisible, data } = useSelector(modalsSelectors.modalsSelector('deleteNode'))
    const dispatch = useDispatch()
    const onHide = () => {
        dispatch(modalsActions.updateModal({ key: "deleteNode", isVisible: false, modalState: null }))
    }
    const deletedNodeName = data?.name
    return (
        <Modal show={isVisible} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete node: <i>{deletedNodeName}</i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this node and all its children?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={()=>{onDelete(data?.uniqueIndex)}}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};