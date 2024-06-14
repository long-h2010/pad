import DocItem from './doc-item'
import Loading from './Loading'
import { useGlobalContext } from '../context'

function DocumentList() {
    const { documents, loading } = useGlobalContext();

    if (loading) return <Loading />;

    if (documents.length < 1) 
        return <h2 className='section-title'>No document matched your search</h2>;

    return (
        <section className='docs-container'>
            <div className='docs-center'>
                {documents.map((doc: any) => {
                    return <DocItem key={doc._id} thumnail={''} title={doc.name} time={doc.updateAt} />
                })}
            </div>
        </section>
    );
}

export default DocumentList
