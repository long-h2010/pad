import { useEffect, useRef, useState } from 'react';
import './tableofcontent.css';
import { useHeadsObserver } from './hooks';

type Heading = {
  id: string;
  text: string;
  level: number;
};

const TableOfContent: React.FC<any> = (props) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const content = props.content;
  const editorRef = props.editorRef;
  const refContent = useRef<HTMLIFrameElement>(null);
  const [contentDocument, setContentDocument] = useState<Document | null>(null);

  useEffect(() => {
    refContent.current = editorRef.current;
  }, [editorRef.current]);

  useEffect(() => {
    const checkContentDocument = () => {
      if (refContent.current && refContent.current.contentDocument) {
        const contentDocument = refContent.current.contentDocument;
        setContentDocument(contentDocument);
        if (contentDocument) {
          const elements = Array.from(contentDocument.querySelectorAll<HTMLElement>("h2, h3, h4"))
            .map((elem, index) => ({
              id: elem.id || `heading-${index}`,
              text: elem.innerText,
              level: Number(elem.nodeName.charAt(1))
            }));
          setHeadings(elements);
        }
      }
    };

    const intervalId = setInterval(checkContentDocument, 500);
    setTimeout(() => clearInterval(intervalId), 10000);

    return () => clearInterval(intervalId);
  }, [content, refContent]);

  const getClassName = (level: number): string | null => {
    switch (level) {
      case 2:
        return 'head2';
      case 3:
        return 'head3';
      case 4:
        return 'head4';
      default:
        return null;
    }
  };

  const { activeId } = useHeadsObserver();

  const scrollElement = (e: any, id: String) => {
    e.preventDefault();
    if (contentDocument) {
      contentDocument.querySelector(`#${id}`)?.scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  return (
    <nav>
      {headings.length > 0 && (<h5 style={{ color: "black", fontWeight: "bold" }}>Table of contents</h5>)}
      <ul>

        {headings.map(heading => (
          <li
            key={heading.id}
            className={getClassName(heading.level) || ''}
          >
            <a
              style={{ fontWeight: activeId === heading.id ? "bold" : "normal" }}
              href={`#${heading.id}`}
              onClick={(e) => {
                scrollElement(e, heading.id)
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContent;
