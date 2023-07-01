import React,{useEffect,useRef,useState} from 'react';
import {Typography, TextField, Button } from '@material-ui/core';
import { useDispatch, } from 'react-redux';
import {commentPost} from '../../actions/posts'
import useStyles from './styles';

const CommentSection = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef()
    const handleComment = async () => {
      const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
  
      setComment('');
      setComments(newComments);
  
       commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <diV>
         <div className={classes.commentsOuterContainer}>
             <div className={classes.commentsInnerContainer}>
                 <Typography gutterBottom variant='h6'>Comment</Typography>
                 {comments?.map((c,i)=>(
                    <Typography key={i} gutterBottom variant='subtitle1'>
                       <strong>{c.split(':')[0]}</strong>
                       {c.split(':')[1]}
                    </Typography>
                 ))}
                 <div ref={commentsRef}/>
             </div>
             {user?.result?.name && (
             <div style={{ width:'70%' }}>
             <Typography gutterBottom variant='h6'> Write a comment  </Typography>
             <TextField
                fullWidth
                maxRows={4}
                variant='outlined'
                label='Comment'
                multiline
                value={comment}
                 onChange={(e)=>setComment(e.target.value)}
             />
             <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleComment} color='primary'>
                     Comment
             </Button>
             </div>
             ) }
         </div>
    </diV>
  )
}

export default CommentSection
