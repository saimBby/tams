import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import Axios from "axios"

export const useLogin = () => {

    

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [data, setData] = useState(null)

    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)
        setData(null)

        const response = await fetch("http://localhost:4000/api/insta/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password})
        })
        const json = await response.json()  

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
      
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
          }

        setData(json.message)
    }   

    return { login, isLoading, error, data }
}