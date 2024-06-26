import { Editor } from "@tinymce/tinymce-react";
import "./editor.css";
import Input from "@mui/joy/Input";
import HistoryIcon from '@mui/icons-material/History';
import ToggleChat from "../../../components/document/toggle-chat";
import ToggleListUser from "../../../components/document/toggle-list-users";
import Button from "@mui/material/Button";

function MyEditor(data: any) {
  return (
    <div id="container">
      <div id="docs-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            name="input-doc-title"
            variant="outlined"
            color="success"
            sx={{ width: "30%", border: "none", fontWeight: "bold", fontSize: 20}}
          />
          <div style={{ display: "flex" }}>
            <Button>
              <HistoryIcon />
            </Button>
            <ToggleListUser />
            <ToggleChat />
          </div>
        </div>
      </div>
      <Editor
        apiKey="tok1lhzg5h155ewt8cpsahu9pcvc5sh95ufqmjluksnky6ot"
        init={{
          plugins:
            "fullscreen save pagebreak anchor preview autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags pagebreak | spellcheckdialog typography | alignleft aligncenter alignright alignjustify lineheight | checklist numlist bullist indent outdent | emoticons charmap | fullscreen removeformat preview save",
          menubar: "favs file edit view insert format tools table help",
          fullscreen_native: true,
        }}
        value={data.content}
        onEditorChange={data.handleEditText}
      />
    </div>
  );
}

export default MyEditor;
