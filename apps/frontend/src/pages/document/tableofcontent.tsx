import { useEffect, useRef, useState } from "react";

// Định nghĩa kiểu dữ liệu HeadingType
type HeadingType = { id: string; text: string; level: number };

// Hook lấy tất cả các heading trong trang
function useHeadings() {
  const [headings, setHeadings] = useState<HeadingType[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6, [data-heading]"))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? "",
        level: Number(element.tagName.substring(1))
      }));
    setHeadings(elements);
  }, []);
  
  return headings;
}

// Hàm tạo id từ chuỗi
function getId(children: string) {
  return children
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
}

// Định nghĩa props cho Heading component
type HeadingProps = {
  children: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
};

// Component Heading
function Heading({ children, id, as: Element, ...props }: HeadingProps) {
  const theId = id ?? getId(children);
  return (
    <Element id={theId} data-heading {...props}>
      {children}
    </Element>
  );
}

// Hook theo dõi các heading để kích hoạt khi scroll tới
function useScrollSpy(ids: string[], options: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>();
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id));
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [ids, options]);

  return activeId;
}

// Component Table of Content
function TableOfContent() {
  const headings = useHeadings();
  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: "0% 0% -25% 0%" }
  );

  return (
    <nav className="toc">
      <h2>Table of content</h2>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              style={{
                marginLeft: `${heading.level - 2}em`,
                fontWeight: activeId === heading.id ? "bold" : "normal"
              }}
              href={`#${heading.id}`}
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
