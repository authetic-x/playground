import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function Hello ({ name }: { name: string }) {
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div className="p-4">
      <Icon className="m-auto text-3xl" icon="simple-icons:hellofresh"/>

      <p className='p-4'>Hello, { params.name } </p>

      <div>
        <button className='btn-primary mt-4' onClick={ () => navigate(-1) }>
          Back
        </button>
      </div>
    </div>
  )
}
