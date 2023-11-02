import iconHeart from '../../assets/heart.svg'
import { fetchLikes, likeSelector, addLike, deleteLike } from "../../store/like";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Button from '../Button';
const LikeButton = ({songId}) => {
    const {id } = useParams()

    const dispatch = useDispatch();


    const likes = useSelector(likeSelector)
    const getIsLike = () => likes && likes.includes(songId)
    const [isLike, setIsLike] = useState(getIsLike())

    useEffect(() => {
        setIsLike(getIsLike())
    },[likes])

    const likefunction = (e) => {
        e.stopPropagation();
        if( isLike) dispatch(deleteLike(songId))
        else dispatch(addLike(id))

        setIsLike(!isLike)
    }

    return (
        <Button iconOnly onClick={likefunction}  className={`${isLike ? "btnActive" : ""}`}>
        <img src={iconHeart} alt="" />

      </Button>
    )
}
export default LikeButton
