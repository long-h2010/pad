function ExportWord(editorRef: any, name: string): void {
	const header = `
	<html xmlns:o='urn:schemas-microsoft-com:office:office' 
			xmlns:w='urn:schemas-microsoft-com:office:word' 
			xmlns='http://www.w3.org/TR/REC-html40'>
		<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>`;

	const footer = "</body></html>";
	const sourceCode = editorRef.current.getContent();

	const sourceHTML = header + sourceCode + footer;

	const source =
		"data:application/vnd.ms-word;charset=utf-8," +
		encodeURIComponent(sourceHTML);
	const fileDownload = document.createElement("a");
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = `${name}.doc`;
	fileDownload.click();
	document.body.removeChild(fileDownload);
}

export default ExportWord
