import { Fragment, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './editor.css';
import Chat from './chat';

export default function MyEditor() {
	const editorRef = useRef(null);
	const log = () => {
	  if (editorRef.current) {
		console.log(editorRef.current.getContent());
	  }
	};

	return (
		<div id='container'>
			<div className='docs-header'>
				<a href='http://localhost:5173/editor' style={{zIndex: 100}}><img className='docs__icon' src='https://cdn4.iconfinder.com/data/icons/free-colorful-icons/360/google_docs.png'/></a>
				<h3 className='docs__name'>Tài liệu không có tiêu đề</h3>
			</div>
			<Editor
			apiKey='tok1lhzg5h155ewt8cpsahu9pcvc5sh95ufqmjluksnky6ot'
			init={{
			plugins: 'fullscreen save pagebreak tableofcontents anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
			toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table tableofcontents mergetags pagebreak | addcomment showcomments | spellcheckdialog a11ycheck typography | alignleft aligncenter alignright alignjustify lineheight | checklist numlist bullist indent outdent | emoticons charmap | fullscreen removeformat preview save',
			tinycomments_mode: 'embedded',
			tinycomments_author: 'Author name',
			menubar: 'favs file edit view insert format tools table help',
			mergetags_list: [
				{ value: 'First.Name', title: 'First Name' },
				{ value: 'Email', title: 'Email' },
			],
			fullscreen_native: true,
			}}
			initialValue=""/>
			<Chat/>
		</div>
	);
}