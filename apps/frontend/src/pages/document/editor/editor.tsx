import { Editor } from '@tinymce/tinymce-react';
import './editor.css';

function MyEditor(data: any) {

    return (
        <div id='container'>
            <div className='docs-header'>
                <a href='' style={{ zIndex: 100 }}><img className='docs__icon' src='https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_docs.png' /></a>
                <h3 className='docs__name'>Tài liệu không có tiêu đề</h3>
            </div>

            <Editor
                apiKey='tok1lhzg5h155ewt8cpsahu9pcvc5sh95ufqmjluksnky6ot'
                init={{
                    plugins: 'fullscreen save pagebreak anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
			        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags pagebreak | spellcheckdialog typography | alignleft aligncenter alignright alignjustify lineheight | checklist numlist bullist indent outdent | emoticons charmap | fullscreen removeformat preview save',
                    menubar: 'favs file edit view insert format tools table help',
                    fullscreen_native: true,
                }}
                value={data.content}
                onEditorChange={data.handleEditText}
            />
        </div>
    );
}

export default MyEditor