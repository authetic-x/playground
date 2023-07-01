import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function IndexPage () {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const go = () => {
    if (name) {
      navigate(`/hello/${encodeURIComponent(name)}`)
    }
  }

  return (
    <div className="text-center">
      <Icon icon='carbon:logo-react' className='text-4xl m-auto'/>
      <p>
        <a href="https://github.com/prall1024/react-mould" target='_blank' rel='noreferrer'>
          React mould
        </a>
      </p>

      <p>
        <em className="text-sm opacity-75">Opinionated React Starter Template</em>
      </p>

      <div className="py-4"></div>

      <input
        className="px-4 py-2 text-center focus:outline-none bg-transparent w-64 border rounded border-gray-200 drak:border-gray-700"
        type="text" placeholder="What's your name?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div>
        <button className="m-3 text-sm btn-primary" onClick={go}>
          Go
        </button>
      </div>
    </div>
  )
}
