import html2pdf from 'html2pdf.js';

function ExportPDF(editorRef: any, name: String) {
    if (editorRef.current) {
        const content = editorRef.current.getContent();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;

        const options = {
            margin: 1,
            filename: `${name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().from(tempElement).set(options).save();
    } else {
        console.error('Editor reference is null or undefined.');
    }
}

export default ExportPDF
