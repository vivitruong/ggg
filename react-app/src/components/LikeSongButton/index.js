import iconHeart from '../../assets/heart.svg'
import { fetchLikes, likeSelector, addLike, deleteLike } from "../../store/like";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const LikeButton = ({songId}) => {
    const {id } = useParams()
    console.log(id)
    const dispatch = useDispatch();
    const user = useSelector(state.session.user)
    console.log(songId)
    const likes = useSelector(likeSelector)
    const getIsLike = () => likes && likes.includes(songId)
    const [isLike, setIsLike] = useState(getIsLike())

    useEffect(() => {
        setIsLike(getIsLike())
    },[likes])

    const likefunction = (e) => {
        e.stopPropagation();
        if( isLike) dispatch(deleteLike(songId))
        else dispatch(addLike(songId))

        setIsLike(!isLike)
    }

    return (
        <Button iconOnly onClick={() => {}}>
        <img src={iconHeart} alt="" />
        <span> </span>


      </Button>
    )
}
export default LikeButton
