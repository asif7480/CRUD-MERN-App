import React, { useContext, useEffect } from 'react'
import FeedbackForm from './FeedbackForm'
import { FeedbackContext } from '../contexts/FeedbackContext'
import FeedbackList from './FeedbackList'

const Feedback = () => {
  const { feedbacks, fetchFeedbacks, deleteFeedback, handleEditFeedback } = useContext(FeedbackContext)

  useEffect( () => {
    fetchFeedbacks()
  }, [])

  console.log(feedbacks);
  
  return (
    <>
    <div className="w-1/2 mx-auto py-4 px-10">
      <FeedbackForm />
      <FeedbackList />        
    </div>
    </>
  )
}

export default Feedback