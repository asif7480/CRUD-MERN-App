import React, { useContext } from 'react'
import { FeedbackContext } from '../contexts/FeedbackContext'

const FeedbackList = () => {
  const { feedbacks, deleteFeedback, handleEditFeedback } = useContext(FeedbackContext)
  return (
   <>
      <ul className='w-full flex flex-wrap justify-center gap-2.5 p-5 mt-2 '>
      {
        feedbacks.map( (feedback, idx) => (
            <li
              className='border-2 border-purple-500 py-4 px-4 rounded-2xl' 
              key={idx}>
                <h4 className='text-center'> {feedback.comment}</h4>
                <h4 className='text-center'><span className='font-semibold'>Rating:</span> {feedback.rating}</h4>
                <div className='flex justify-center'>
                  <button
                    className='btn-update'
                    onClick={() => handleEditFeedback(feedback)}>
                      Edit
                    </button>
                  <button 
                    className='btn-delete'
                    onClick={() => deleteFeedback(feedback._id)}>
                      Delete
                  </button>
                </div>

            </li>
        ))
      }
      </ul>
   </>
  )
}

export default FeedbackList