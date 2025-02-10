"use client"
import React, { useEffect, useState } from 'react'
import { deletePost, getPost } from './PostApi'
import { toast } from 'react-toastify'
import Form from './Form'

const Posts = () => {
    const [data, setData] = useState([])
    const [updateDataApi, setUpdateDataApi] = useState({})
    
    
    const getPostData = async () => {
        const response = await getPost();
        setData(response.data)
    }
    

    useEffect(() => {
        getPostData()
    }, [])




    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id)
            if (res.status === 200) {
                const newUpdatePosts = data.filter((currentPost) => {
                    return currentPost.id !== id
                })
                setData(newUpdatePosts)
                toast.success("Deleted Successfully")
            }
            else{
                console.log("Failed to delete the post : ",res.status);
                
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleUpdatePost = (currentElement) => {
        setUpdateDataApi(currentElement)
    }

    
    return (
        <div>
        <section>
            <Form data={data} setData={setData} updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
        </section>

            <div className='grid grid-cols-4 justify-center items-center gap-4'>
                {
                    data.map((item, index) => {
                        const { id, title, body } = item
                        return (
                            <div key={index} className='border-4 border-blue-500 bg-gray-400'>
                                <p className='text-center'>ID : {id}</p>
                                <p>Title : {title}</p>
                                <p>Body : {body}</p>
                                <div className='grid grid-cols-2 items-center justify-center gap-2 '>
                                    <button className='bg-blue-500 p-1' onClick={() => handleUpdatePost(item)}>Edit</button>
                                    <button className='bg-red-500 p-1' onClick={() => handleDeletePost(id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Posts
