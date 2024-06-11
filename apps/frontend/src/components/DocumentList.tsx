import Document from './Document'
import Loading from './Loading'
import { useGlobalContext } from '../context'

export default function DocumentList() {
  const { documents, loading } = useGlobalContext()
  if (loading) {
    return <Loading/>
  }
  if (documents.length < 1) {
    return (
      <h2 className='section-title'>
        no document matched your search
      </h2>
    )
  }
  return (
    <section className='docs-container'>
      <div className='docs-center'>
        {documents.map((item, index) => {
          return <Document key={index}/>
        })}
      </div>
    </section>
  )
}
