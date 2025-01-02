import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import requestApi from '../../hooks/useApi';
import { debounce } from 'lodash';
import { Input } from '@mui/joy';
import { Avatar, Box, Container } from '@mui/material';
import { Done, Groups, History, Mic } from '@mui/icons-material';
import { Editor } from '@tinymce/tinymce-react';
import LogoImg from '/images/logo.png';
import './document.css';
import Dashboard from '../../components/sections/dashboard';
import UsersGroup from './group/group-dashboard';
import RightDrawer from '../../components/sections/right-drawer';
import Chat from './chat/chat';
import TableOfContent from './tableofcontent';
import DocumentStyles from '../../assets/styles/document';
import { socket } from '../../socket';
import ExportPDF from '../../components/export/export-pdf';
import ExportWord from '../../components/export/export-word';
import Sign from '../../components/doc/sign';
import Comment from '../../components/doc/comment';
import { htmlToText } from 'html-to-text';
import { DataURIToBlob } from '../../utils/convert-image-to-file';
import html2canvas from 'html2canvas';
import Spelling from '../../components/doc/spelling';
import DocVersion from './history/doc-version';
import SpeechToText from './speech/speech-to-text';
import HtmlDiff from 'htmldiff-js';
import CorrectSpelling from '../../AI/correct-spelling';

function Document() {
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar") as string;
  const user = localStorage.getItem("name");
  const { id } = useParams();
  const { classes } = DocumentStyles();
  const navigateTo = useNavigate();
  const { doc_url, user_url, cloud_url } = useGlobalContext();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("reader");
  const [openSign, setOpenSign] = useState(false);
  const [spell, setSpell] = useState<any>({});
  const [saved, setSaved] = useState(true);

  let docId = "";
  try {
    docId = atob(id as string);
  } catch {
    navigateTo("/page-not-found");
  }

  const updateDoc = useCallback(
    debounce((text) => {
      requestApi(`${doc_url}/${docId}`, "put", { data: { content: text } })
        .then((res) => {
          console.log(res.data.message);
          setContent(text);
          setSaved(true);
        })
        .catch((err) => {
          console.log("Error when update documents data: ", err);
        });
    }, 2000),
    []
  );

  const createThumbnail = useCallback(
    debounce(async () => {
      const input = (editorRef.current as any)?.contentDocument
        .activeElement as HTMLElement;

      if (input) {
        html2canvas(input)
          .then((canvas) => {
            const img = DataURIToBlob(canvas.toDataURL("image/png"));
            const file = new FormData();
            file.append("thumbnail", img);

            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            };

            axios
              .post(`${cloud_url}/update-thumbnail/${docId}`, file, config)
              .then((res) => console.log(res))
              .catch((err) => console.error(err));
          })
          .catch();
      } else {
        console.log("Element not found");
      }
    }, 10000),
    []
  );

  const handleUpdateName = useCallback(
    debounce((newName: string) => {
      requestApi(`${doc_url}/${docId}`, "put", { data: { name: newName } })
        .then((res) => console.log(res))
        .catch((err) => console.log("Error when update documents data: ", err));
    }, 500),
    []
  );

  useEffect(() => {
    axios
      .get(`${doc_url}/${docId}`)
      .then((res) => {
        setName(res.data.name);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log("Error when retrieving documents data: ", err);
        navigateTo("page-not-found");
      });

    axios
      .get(`${doc_url}/${docId}/get-role`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => setRole(res.data))
      .catch((err) =>
        console.log("Error when retrieving documents data: ", err)
      );
  }, []);

  const handleClickSign = () => setOpenSign(true);

  const handleCloseSign = () => setOpenSign(false);

  const handleWordReplace = (
    word: string,
    startIndex: number,
    endIndex: number
  ) => {
    const editor: any = editorRef.current;
    if (editor) {
      const text = editor.getContent({ format: "text" });
      const replace = text.slice(0, startIndex) + word + text.slice(endIndex);
      editor.setContent(
        replace
          .split(/\n+/)
          .map((line: string) => `<p>${line}</p>`)
          .join("")
      );
    }
  };

  const getCurrentSentence = () => {
    const editor = editorRef.current as any;
    const selection = editor.selection;
    const range = selection.getRng();

    const startContainer = range.startContainer;

    if (startContainer.nodeType === Node.TEXT_NODE) {
      const textContent = startContainer.textContent;

      const startOffset = range.startOffset;

      const beforeCursor = textContent.slice(0, startOffset);
      const afterCursor = textContent.slice(startOffset);

      const sentenceStart =
        beforeCursor.lastIndexOf(". ") + 1 ||
        beforeCursor.lastIndexOf("? ") + 1 ||
        beforeCursor.lastIndexOf("! ") + 1;
      const sentenceEnd =
        afterCursor.indexOf(". ") ||
        afterCursor.indexOf("? ") ||
        afterCursor.indexOf("! ");

      const start = sentenceStart >= 0 ? sentenceStart : 0;
      const end =
        sentenceEnd >= 0 ? startOffset + sentenceEnd + 1 : textContent.length;

      return textContent.slice(start, end).trim();
    }

    return null;
  };

  // const temp = `Tôi là sinh viên`;
  // const correct = temp.split(" ");
  const spellingCorrect = useCallback(
    debounce(async (html) => {
      const textContent = htmlToText(html);

      const currentSentence = getCurrentSentence();
      // const sentences = textContent.match(/[^.!?]+[.!?]?/g);
      // let currentSentence = '';
      // if (sentences) {
      //     currentSentence = sentences[sentences.length - 1].trim();
      // }
      // const sentenceIndex = textContent.indexOf(currentSentence);

      const editor = editorRef.current as any;
      const paragraphs = editor.getBody().getElementsByTagName("p");
      let textNode: any;
      for (let i = 0; i < paragraphs.length; i++) {
        const sentences: string[] =
          paragraphs[i].innerText.match(/[^.!?]+[.!?]?/g);
        for (let j = 0; j < sentences.length; j++) {
          if (sentences[j].trim() == currentSentence) {
            textNode = paragraphs[i];
            break;
          }
        }
      }
      console.log(textNode);
      const sentenceIndex = textContent.indexOf(currentSentence);
      // const textNode = paragraphs[paragraphs.length - 1];

      const currentSentenceWords = currentSentence.split(" ");
      const correct = (await CorrectSpelling(currentSentence)).split(' ');

      for (
        let i = 0;
        i < correct.length && i < currentSentenceWords.length;
        i++
      ) {
        if (
          correct[i] !== currentSentenceWords[i]?.replace(/[^a-zA-ZÀ-ỹ]/g, "")
        ) {
          const wordIndex = currentSentence.indexOf(currentSentenceWords[i]);

          const startOffset = wordIndex;
          const endOffset = startOffset + currentSentenceWords[i].length;

          const rng = document.createRange();
          console.log(textNode, startOffset);
          rng.setStart(textNode.firstChild, startOffset);
          rng.setEnd(textNode.firstChild, endOffset);

          const rect = rng.getBoundingClientRect();
          const top = rect.top;
          const left = rect.left;

          setSpell({
            text: correct[i],
            top: top,
            left: left,
            open: true,
            handleWordReplace: () =>
              handleWordReplace(
                correct[i],
                startOffset + sentenceIndex,
                endOffset + sentenceIndex
              ),
          });
        }
      }
    }, 2000),
    []
  );

  const updatePointers = (pointers: any) => {
    const editor = editorRef.current as any;
    const range = editor?.selection.getRng();
    const rect = range?.getBoundingClientRect();

    if (!pointers || pointers.length === 0) {
      document.querySelectorAll(".pointer-box").forEach((box) => box.remove());
      return;
    }

    pointers.forEach((pointer: any) => {
      let boxUser = document.getElementById(pointer.userId);

      if (boxUser == null) {
        boxUser = document.createElement("div");
        boxUser.id = `${pointer.userId}`;
        boxUser.className = "pointer-box";
        boxUser.style.position = "absolute";
        boxUser.style.padding = "5px";
        boxUser.style.backgroundColor = "red";
        boxUser.style.color = "white";
        boxUser.style.borderRadius = "5px";
        boxUser.textContent = pointer.name;

        document.body.appendChild(boxUser);
      }

      boxUser.style.top = `${pointer.position.top + window.scrollY + (rect?.height || 0) + 130}px`;
      boxUser.style.left = `${pointer.position.left + window.scrollX + 420}px`;
      boxUser.style.display = "block";
    });

    document.querySelectorAll(".pointer-box").forEach((box) => {
      const userId = box.getAttribute("id");
      if (!pointers.some((pointer: any) => pointer.userId === userId)) {
        box.remove();
      }
    });

    let inputTimeout: NodeJS.Timeout;
    editor.on("onchange", () => {
      clearTimeout(inputTimeout);
    });

    inputTimeout = setTimeout(() => {
      document.querySelectorAll(".pointer-box").forEach((box) => box.remove());
    }, 3000);

    window.addEventListener("blur", () => {
      document.querySelectorAll(".pointer-box").forEach((box) => box.remove());
    });

    const checkPointerVisibility = () => {
      const editorRect = editor.getBoundingClientRect();
      const pointersOnScreen = pointers.filter((pointer: any) => {
        const box = document.getElementById(pointer.userId);
        if (box) {
          const boxRect = box.getBoundingClientRect();
          return (
            boxRect.top >= editorRect.top &&
            boxRect.bottom <= editorRect.bottom &&
            boxRect.left >= editorRect.left &&
            boxRect.right <= editorRect.right
          );
        }
        return false;
      });

      document.querySelectorAll(".pointer-box").forEach((box) => {
        const userId = box.getAttribute("id");
        if (
          !pointersOnScreen.some((pointer: any) => pointer.userId === userId)
        ) {
          box.remove();
        }
      });
    };

    setInterval(checkPointerVisibility, 5000);
  };

  useEffect(() => {
    socket.emit("join-document", docId);

    socket.on("update-text", (data) => {
      setContent(data.content);
      updateDoc(data.content);
    });

    socket.on("update-pointers", (data) => {
      updatePointers(data.pointers);
    });

    return () => {
      socket.off("update-text");
      socket.off("update-pointers");
    };
  }, []);

  useEffect(() => {
    return () => {
      socket.emit("leave-document", docId);
    };
  }, [docId]);

  const handleEditText = debounce((html: string) => {
    setSaved(false);
    const editor = editorRef.current as any;
    const range = editor?.selection.getRng();
    const rect = range?.getBoundingClientRect();
    const userPointer = { userId: token, pointer: rect };

    const diff = HtmlDiff.execute(content, html).replace(
      /<del[^>]*>.*?<\/del>/g,
      ""
    );
    const diffText = diff.match(/<ins[^>]*>(.*?)<\/ins>/)?.[1] || "";
    let position = 0;
    while (
      position < content.length &&
      position < diff.length &&
      content[position] === diff[position]
    ) {
      position++;
    }

    // const selecction = window.getSelection();
    // const rgn = selecction?.getRangeAt(0);
    // console.log(range?.startOffset, position)

    const operation = {
      position: position,
      text: html,
    };
    // console.log(
    //     `html: ${diff} - length: ${diff.length}, content: ${content} - length: ${content.length}`
    // );
    // console.log(`diff text: `, operation.text, position);

    setContent(html);

    createThumbnail();
    spellingCorrect(html);
    socket.emit("edit", { docId: docId, operation: operation });
    socket.emit("send-pointer", { docId: docId, pointer: userPointer });
  }, 0);

  return (
    <React.Fragment>
      <Container maxWidth="mobile" disableGutters className={classes.docHeader}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Link to={"/"}>
              <img
                src={LogoImg}
                alt=""
                style={{
                  width: "45px",
                  height: "45px",
                  position: "absolute",
                  top: "30px",
                  zIndex: 10,
                }}
              />
            </Link>
            <Input
              name="input-doc-title"
              variant="outlined"
              color="success"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleUpdateName(e.target.value);
              }}
              className={classes.inputTitleDoc}
            />
            <Done sx={{ display: saved ? "" : "none", marginTop: "8px" }} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Dashboard
              {...{
                iconButton: <Mic sx={{ color: "rgb(34, 47, 62)" }} />,
                element: <SpeechToText {...{ content, setContent }} />,
              }}
            />
            <Dashboard
              {...{
                iconButton: <History sx={{ color: "rgb(34, 47, 62)" }} />,
                element: <DocVersion {...{ setContent }} />,
              }}
            />
            <Dashboard
              {...{
                iconButton: <Groups sx={{ color: "rgb(34, 47, 62)" }} />,
                element: <UsersGroup />,
              }}
            />
            <RightDrawer {...{ element: <Chat /> }} />
            <Avatar sx={{ margin: "0 10px" }} src={avatar} />
          </Box>
        </Box>
      </Container>
      <Editor
        disabled={role === "reader" || (role !== "owner" && role !== "writer")}
        apiKey={import.meta.env.VITE_APP_TINYMCE_API_KEY}
        onInit={(_evt, editor: any) => (editorRef.current = editor)}
        init={{
          // content_style: `
          //   body { caret-color: red; }
          // `,
          plugins: `autocorrect tinycomments tableofcontents exportpdf exportword 
                        help lists advlist directionality insertdatetime fullscreen 
                        save pagebreak anchor preview autolink charmap codesample emoticons image 
                        link lists media searchreplace table visualblocks wordcount linkchecker code`,
          toolbar: `undo redo | blocks fontfamily fontsize | 
                        bold italic underline strikethrough backcolor | 
                        link image media table mergetags pagebreak | ltr rtl | 
                        alignleft aligncenter alignright alignjustify lineheight | 
                        tableofcontents checklist numlist bullist indent outdent | 
                        emoticons charmap insertdatetime | preview addcomment showcomments exportpdf exportword | 
                        searchreplace fullscreen removeformat | restoredraft save`,
          tinycomments_author: "author",
          tinycomments_author_name: user,
          tinycomments_mode: "embedded",
          menubar: "favs file edit view insert format tools table help",
          fullscreen_native: true,
          pagebreak_split_block: true,
          end_container_on_empty_block: true,
          newdocument_content: `<div contenteditable='true'></div>`,
          browser_spellcheck: true,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_caption: true,
          pagebreak_separator: `<pre><br clear=all style='mso-special-character:line-break;page-break-before:always'></pre>`,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_class: "mceNonEditable",
          contextmenu: "link image table",
          toolbar_sticky: true,
          setup: (editor) => {
            editor.ui.registry.addButton("PDF", {
              icon: "export-pdf",
              onAction: () => {
                ExportPDF(editorRef, name);
              },
            });
            editor.ui.registry.addButton("Word", {
              icon: "export-word",
              onAction: () => {
                ExportWord(editorRef, name);
              },
            });
            editor.ui.registry.addButton("Sign", {
              icon: "line",
              onAction: () => {
                handleClickSign();
              },
            });
          },
        }}
        onEditorChange={(html) => handleEditText(html)}
        value={content}
      />
      {/* <TableOfContent content={content} editorRef={editorRef} /> */}
      <Sign
        openSign={openSign}
        setOpenSign={setOpenSign}
        handleCloseSign={handleCloseSign}
        editorRef={editorRef}
      />
      {/* <Comment editorRef={editorRef} /> */}
      <Spelling spell={spell} />
    </React.Fragment>
  );
}

export default Document;
