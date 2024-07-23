import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { Input } from "@mui/joy";
import { Button } from "@mui/material";
import { Groups, History } from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import "./document.css";
import Dashboard from "../../components/dashboard";
import UsersGroup from "./group/group-dashboard";
import RightDrawer from "../../components/right-drawer";
import Chat from "./chat/chat";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TableOfContent from "./tableofcontent";


function Document() {
    const docId = useParams().id;
    const { doc_url } = useGlobalContext();
    const socket = io("http://localhost:3000");
    const editorRef = useRef(null);
    const [content, setContent] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        axios
            .get(`${doc_url}/${docId}`)
            .then((res) => {
                setName(res.data.name);
                setContent(res.data.content);
            })
            .catch((err) => {
                console.log("Error when retrieving documents data: ", err);
            });
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected");
        });

        socket.on("updateText", (data) => {
            setContent(data);
            updateDoc(data);
        });

        return () => {
            socket.off("connect");
            socket.off("updateText");
        };
    }, []);

    const updateDoc = useCallback(
        debounce((text) => {
            axios
                .put(`${doc_url}/${docId}`, { content: text })
                .then((res) => {
                    console.log(res);
                    setContent(text);
                })
                .catch((err) => {
                    console.log("Error when update documents data: ", err);
                });
        }, 1200),
        []
    );

    const handleEditText = debounce((html: string) => {
        setContent(html);
        socket.emit("edit", { content: html });
    }, 0);

    const exportPDF = () => {
        if (editorRef.current) {
            const input = editorRef.current.contentDocument.activeElement as HTMLElement;
            if (input) {
                html2canvas(input).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    const pdf = new jsPDF("p", "mm", "a4", true);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    const imgWidth = canvas.width;
                    const imgHeight = canvas.height;
                    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                    const imgX = (pdfWidth - imgWidth * ratio) / 2;
                    const imgY = 30;
                    pdf.addImage(
                        imgData,
                        "PNG",
                        imgX,
                        imgY,
                        imgWidth * ratio,
                        imgHeight * ratio
                    );
                    pdf.save(`${name}.pdf`);
                });
            }
        }
    };
    const exportWord = () => {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        const footer = "</body></html>";
        if (editorRef.current) {
            const input = editorRef.current.contentDocument.activeElement as HTMLElement;
            if (input) {
                const sourceHTML = header + input.innerHTML + footer;
                const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);

                const fileDownload = document.createElement("a");
                document.body.appendChild(fileDownload);
                fileDownload.href = source;
                fileDownload.download = 'document.doc';
                fileDownload.click();
                document.body.removeChild(fileDownload);
            }
            else {
                console.error("Element with id 'source-html' not found.");
                return;
            }
        }
    }


    const addContent = () => {
        if (editorRef.current) {
            console.log(editorRef.current)
            const input = document.querySelector(".tox-sidebar-wrap");
            if (input) {
                input.style.display = "block";
            }
            if (input) {
                const newDiv = document.createElement("textarea");
                newDiv.className = "tox-edit-area";
                newDiv.style.height = "1123px"
                newDiv.style.width = "794px";
                newDiv.style.backgroundColor = "white"
                const newTextarea = document.createElement("textarea");
                newDiv.appendChild(newTextarea);
                input.appendChild(newDiv);

            }
        }
    };


    return (
        <div id="container">
            <div id="docs-header">
                <button onClick={addContent}>Append</button>
                <TableOfContent />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Input
                        name="input-doc-title"
                        variant="outlined"
                        color="success"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            width: "30%",
                            border: "none",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    />
                    <div style={{ display: "flex" }}>
                        <Button>
                            <History />
                        </Button>
                        <Dashboard
                            {...{ iconButton: <Groups />, element: <UsersGroup /> }}
                        />
                        <RightDrawer {...{ element: <Chat /> }} />
                    </div>
                </div>
            </div>
            <Editor
                apiKey="aejb5qweihjrg4au7khd60k41jslrwbqrf00cr9vg6q28jcy"
                onInit={(_evt, editor: any) => (editorRef.current = editor)}
                init={{
                    plugins:
                        "lists advlist directionality insertdatetime fullscreen save pagebreak anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker code",
                    toolbar:
                        "code undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags pagebreak | ltr rtl | alignleft aligncenter alignright alignjustify lineheight | checklist numlist bullist indent outdent | emoticons charmap insertdatetime | preview Word PDF | searchreplace fullscreen removeformat | restoredraft save",
                    menubar: "favs file edit view insert format tools table help",
                    fullscreen_native: true,
                    pagebreak_split_block: true,
                    content_style: 'body { overflow-y: hidden !important; } div { margin: 10px; border: 5px solid red; padding: 3px; }',
                    setup: (editor) => {
                        editor.ui.registry.addButton("PDF", {
                            icon: "export-pdf",
                            onAction: () => {
                                exportPDF();
                            },
                        });
                        editor.ui.registry.addButton("Word", {
                            icon: "export-word",
                            onAction: () => {
                                exportWord();
                            },
                        });
                    },
                }}
                onEditorChange={handleEditText}
                value={content}

            />
        </div>
    );
}

export default Document;
