import React, { useContext, useEffect, useState } from 'react'
import { FeedbackContext } from '../contexts/FeedbackContext'

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState({
    comment: "",
    rating: ""
  })

  const { addFeedback, editFeedback, updateFeedback, setEditFeedback } = useContext(FeedbackContext)

  useEffect( () => {
    if(editFeedback){
        const { comment, rating } = editFeedback
        setFeedbackData({ comment, rating })
    }else{
        setFeedbackData({ comment:"", rating:""})
    }
  }, [editFeedback])

  const handleChange = (e) => {
    setFeedbackData({...feedbackData, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(editFeedback){
        await updateFeedback(editFeedback._id, feedbackData)
    }else{
        await addFeedback(feedbackData)
    }
    setFeedbackData({ comment: "", rating: ""})
  }

  const cancelUpdate = () => {
    setFeedbackData({ comment:"", rating: "" })
    setEditFeedback(null)
  }

  
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                  className='input-control'
                  type="text" 
                  name="comment" 
                  placeholder='Enter comment' 
                  value={feedbackData.comment} 
                  onChange={handleChange} 
                />
            </div>

            <div>
                <select 
                  className='input-control'
                  name="rating" 
                  value={feedbackData.rating} 
                  onChange={handleChange}
                >

                  <option value="">Select Rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
            </div>

            <div className='flex justify-center'>
                <input
                  // className='border-2 border-purple-500 rounded py-1 px-3 m-2 hover:text-white hover:bg-purple-500 transition-all ease-in-out'
                  className='btn-primary'
                  type="submit" 
                  value={editFeedback ? `Update Feedback` : `Add Feedback`} 
                />
                {
                  editFeedback && (
                    <button 
                      // className='border-2 border-purple-500 rounded py-1 px-3 m-2 hover:text-white hover:bg-purple-500 transition-all ease-in-out'
                      className='btn-primary'
                      type='button' 
                      onClick={cancelUpdate}
                    >
                      Cancel
                    </button>
                  )
                }
            </div>

        </form>
    </>
  )
}

export default FeedbackForm