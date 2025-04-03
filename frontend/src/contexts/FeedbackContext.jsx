import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

export const FeedbackContext = createContext(null)

export const FeedbackContextProvider = ({ children }) => {

    const [feedbacks, setFeedbacks] = useState([])
    const [editFeedback, setEditFeedback] = useState(null)

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    const fetchFeedbacks = async () => {
        try {
            const { data } = await axiosInstance.get(`/feedback`)
            setFeedbacks(data)
        } catch (err) {
            console.log(err.message);
        }
    }

    const addFeedback = async (newFeedback) => {
        try {
            const { data } = await axiosInstance.post(`/feedback`, newFeedback)
            // setFeedbacks([...feedbacks, newFeedback])
            setFeedbacks([...feedbacks, data.feedback])
            fetchFeedbacks()
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleEditFeedback = (feedback) => {
        setEditFeedback(feedback)
    }

    const updateFeedback = async (id, updatedFeedback) => {
        const { data } = await axiosInstance.put(`/feedback/${id}`, updatedFeedback)
        setEditFeedback(null)
        // setFeedbacks(feedbacks.map( (feedback) => feedback._id === id ? {...feedback, ...updatedFeedback} : feedback))   
        setFeedbacks(feedbacks.map( (feedback) => feedback._id === id ? {...feedback, ...data.feedback} : feedback))   
    }


    const deleteFeedback = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/feedback/${id}`)
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id))
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <FeedbackContext.Provider value={{ 
                feedbacks, 
                setFeedbacks, 
                editFeedback, 
                setEditFeedback, 
                fetchFeedbacks, 
                addFeedback,
                handleEditFeedback,
                updateFeedback, 
                deleteFeedback 
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}