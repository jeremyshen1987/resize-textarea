import { useEffect, useState } from "react"

export default function About(){

    const [data, setData] = useState({
        name: null,
        description: null
    })

    const [textareaSize, setTextareaSize] = useState({
        height: null
    })

    const [showResult, setShowResult] = useState(false)

    let element_textarea

    let padTop
    let padBottom

    if(typeof window !== 'undefined'){
        element_textarea = document.querySelector('textarea')

        const styleData = getComputedStyle(element_textarea)
        padTop = parseInt(styleData.paddingTop)
        padBottom = parseInt(styleData.paddingBottom)

    }
   

    function handleChange(e){

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        if(e.target.name === 'description'){

            const height = e.target.scrollHeight
            console.log('height', height)

            const adjust_height = height - padTop - padBottom
            element_textarea.style.height = `${adjust_height}px`


            setTextareaSize({
                height: adjust_height
            })
        }

    }
    
    function handleSubmit(e){

        e.preventDefault()
        setShowResult(true)
    }


    return(
        <>
            <h1>About Me</h1>
            <form action="/about" method="POST">

                <div className="name_container">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name='name' onChange={handleChange} />
                </div>

                <div className="description_container">
                    <label>Description: </label>
                    <textarea name="description" placeholder="say something" onChange={handleChange} />
                </div>
                

                <div className="submit_btn">
                    <input type="button" value='Submit' onClick={handleSubmit}/>
                </div>
            </form>

            {showResult && <Result_AutoResize data={data} textareaSize={textareaSize}/>}

        </>
    )
}

function Result_AutoResize({data, textareaSize}){

    const {name, description} = data
    const { height} = textareaSize

    useEffect(() => {

        const textAreaResize = document.getElementsByClassName('textarea')[0]
        textAreaResize.style.height = `${height}px`

    }, [height])



    return(
        
        <>
            <h1>Mock Edit</h1>

            <form>
                <div className="name_container">
                    <label htmlFor="name">Name: </label>
                    <input id="name" name='name' value={name} />
                </div>

                <div className="description_container">
                    <label>Description: </label>
                    <textarea name="description" value={description} placeholder="auto resized" className="textarea"></textarea>
                </div>

                <div className="submit_btn">
                    <input type="button" value='Submit'/>
                </div>
            </form>
        </>


    )

}
