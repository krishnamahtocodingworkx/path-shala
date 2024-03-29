
import RenderSteps from "./RenderSteps";
import React from 'react'

export default function AddCourse() {
    return (
        <>
            <div className="text-white">
                <div>
                    <h1>Add Course</h1>
                    <div><RenderSteps /></div>
                </div>

                <p>Code Upload Tips</p>
                <ul>
                    <li>list item1</li>
                    <li>list item2</li>
                    <li>list item3</li>
                    <li>list item4</li>
                </ul>
            </div>
        </>
    )
}




