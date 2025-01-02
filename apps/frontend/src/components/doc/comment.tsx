import { Avatar, Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

interface Comment {
  id: number;
  top: number | null;
  content: string;
}

const Comment: React.FC<any> = (props) => {
	const { editorRef } = props;
	const [openComment, setOpenComment] = useState(false);
	const [openIcon, setOpenIcon] = useState(false);
	const [openDisplayComment, setOpenDisplayComment] = useState(false);
	const [top, setTop] = useState<number>(0);
	const [contentComment, setContentComment] = useState("");
	const [position, setPosition] = useState<Comment[]>([]);

	const editor = editorRef.current as any;
	useEffect(() => {
		const handleSelectionChange = () => {
		if (editorRef.current) {
			const contentWindow = editor.getWin();
			const selection = contentWindow.getSelection();
			const range = editor.selection.getRng();

			if (selection) {
			const text = selection.toString();
			if (text && text.length > 0) {
				const rect = range.getBoundingClientRect();
				setTop(rect.top);
				setOpenIcon(true);
			} else {
				setOpenIcon(false);
        setOpenComment(false);
			}
			}
		}
		};

		if (editor) {
		const contentWindow = editor.getWin();
		contentWindow.addEventListener("mouseup", handleSelectionChange);
		contentWindow.addEventListener("keyup", handleSelectionChange);
		}

		return () => {
		if (editor) {
			const contentWindow = editor.getWin();
      if (contentWindow) {
        contentWindow.removeEventListener("mouseup", handleSelectionChange);
        contentWindow.removeEventListener("keyup", handleSelectionChange);
      }
		}
		};
	}, [editorRef.current]);

	const handleAddComment = () => {
		setOpenComment(true);
		setOpenIcon(false);
	};

	const handleInputComment = () => {
		setPosition((position: Comment[]) => {
		return [
			...position,
			{ id: position.length + 1, top: top, content: contentComment },
		];
		});
		handleChangeBackgroundColor("#eff573");
		setOpenComment(false);
		setOpenDisplayComment(true);
		setTop(0);
		setContentComment("");
	};

	const handleChangeBackgroundColor = (color: String) => {
		if (editorRef.current) {
		editor.formatter.apply("hilitecolor", { value: color });
		}
	};

	return (
    <Container>
      {position.map((p: Comment) => {
        return (
          <Box
            key={p.id}
            className={openDisplayComment ? "comment open" : "comment"}
            sx={{ top: `${(p as any).top + 180}px !important` }}
          >
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ marginRight: "10px" }}
              />
              <Box>
                <Typography variant="subtitle2">Thao Yi</Typography>
                <Typography variant="caption">17:59 Hôm nay</Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="body2">{p.content}</Typography>
            </Box>
          </Box>
        );
      })}
      <Box
        className={openIcon ? "icon open" : "icon"}
        sx={{ top: `${top + 200}px !important` }}
      >
        <IconButton aria-label="add" onClick={handleAddComment}>
          <AddCommentOutlinedIcon style={{ color: "black" }} />
        </IconButton>
      </Box>

      <Box
        className={openComment ? "dialog open" : "dialog"}
        sx={{ top: `${top + 200}px !important` }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#106b1f", fontWeight: "bold", fontSize: "20px" }}
        >
          Thêm bình luận
        </Typography>
        <TextField
          onChange={(e) => setContentComment(e.target.value)}
          id="outlined-basic"
          variant="outlined"
          multiline
          sx={{ width: "100%" }}
          value={contentComment}
        />
        <Box sx={{ float: "right", marginTop: "10px" }}>
          <Button color="success" onClick={() => setOpenComment(false)}>
            Hủy
          </Button>
          <Button color="success" onClick={handleInputComment}>
            Bình luận
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Comment;