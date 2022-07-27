import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'

const ActionButtons = ({ url, _id}) => {
    const { findPost, setShowUpdatePostModal, setShowConfirmDeleteModal} = useContext(PostContext)

    const choosePost = postId => {
        findPost(postId)
        setShowUpdatePostModal(true)
    }

    const choosePostToDelete = postId => {
        setShowConfirmDeleteModal(true)
    }
    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt="play" width='32' height='32'></img>
            </Button>
            <Button className='post-button' onClick={choosePost.bind(this, _id)} >
                <img src={editIcon} alt="edit" width='24' height='24'></img>
            </Button>
            <Button className='post-button' id="delete-btn" data-id={_id} onClick={choosePostToDelete.bind(this, _id)}>
                <img src={deleteIcon} alt="delete" width='24' height='24'></img>
            </Button>
        </>
    )
}

export default ActionButtons