import React, { useState } from 'react'

interface AccordionProps {
  title: string
  children: React.ReactNode
}
const Accordion = (props: AccordionProps) => {
  const { title, children } = props
  const [show, setShow] = useState(false)

  return (
        <div className="accordion">
            <div>
              <h3 className="accordion-title">{title}</h3>
              <button onClick={() => setShow(prev => !prev)}>{show ? 'hide' : 'show'}</button>
            </div>

            { show
              ? <div className="accordion-content">
                {children}
            </div>
              : null }
        </div>
  )
}

export default Accordion
