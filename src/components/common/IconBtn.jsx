import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className="text-yellow-50 bg-richblack-700"
    >
        {
            children?(<span>
               <>
                <span>
                    {text}
                </span>
                {children}
               </>
            </span>):(text)
        }
    </button>
  )
}

export default IconBtn