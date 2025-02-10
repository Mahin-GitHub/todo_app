import React, { useEffect, useState } from 'react'
import { postData, updateData } from './PostApi'

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: "",
    })

    let isEmpty = Object.keys(updateDataApi).length === 0;


    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || ""
        })
    }, [updateDataApi])



    const handlceInputChange = (e) => {
        const { name, value } = e.target
        setAddData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    // App Post Data 
    const addPostData = async () => {
        const res = await postData(addData)
        if (res.status === 201) {
            setData([...data, res.data])
            setAddData({ title: "", body: "" });
        }
    }


    // Update  Post Data
    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData)

            if (res.status === 200) {
                setData((prev) => {
                    return prev.map((currentElement) => {
                        return currentElement.id === res.data.id ? res.data : currentElement;
                    })
                })
                setAddData({ title: "", body: "" });
                setUpdateDataApi({});
            }
        } catch (err) {
            console.log(err);
        }
    }


    // Form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
            addPostData();
        }
        else if (action === "Update") {
            updatePostData()
        }
    }



    return (
        <div>
            <div className='grid items-center justify-center my-8  '>
                <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-2 bg-green-500 p-4'>
                    <input

                        className='border-2 border-black p-1'
                        type="text"
                        placeholder='Add Tite'
                        name='title'
                        value={addData.title}
                        onChange={handlceInputChange}
                    />
                    <input
                        className='border-2 border-black p-1'
                        type='text'
                        placeholder='Add Post'
                        name='body'
                        value={addData.body}
                        onChange={handlceInputChange}
                    />
                    <button className='bg-blue-500 p-1 border-2 border-black' type='submit' value={isEmpty ? "Add" : "Update"}>{isEmpty ? "Add" : "Update"}</button>
                </form>
            </div>
        </div>
    )
}

export default Form
