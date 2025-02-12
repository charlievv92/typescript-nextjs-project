"use client";

import axios from "axios";
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Box } from "@mui/material";

interface QuillEditorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  defaultValue?: string;
  style?: React.CSSProperties;
}

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "align",
  "color",
  "background",
  "size",
  "h1",
  "link",
  "image",
  "video",
];

export default function QuillEditor<T extends FieldValues>({
  name,
  control,
  rules,
  // defaultValue = '',
  style,
}: QuillEditorProps<T>) {
  const quillRef = useRef<ReactQuill>();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    // defaultValue
  });

  // 커스텀 이미지 핸들러
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("image", file);

      await axios
        .post(`${serverUrl}/api/board/upload-image`, formData)
        .then((res) => {
          const imgUrl = res.data.imageUrl;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection()?.index;
          if (range !== null && range !== undefined) {
            editor?.insertEmbed(range, "image", imgUrl);
            editor?.setSelection(range, 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  // useEffect(() => {
  //   if (quillRef.current) {
  //     console.log(quillRef.current);
  //   }
  // }, []);
  // const [values, setValues] = useState("");

  // console.log(values); // Use the 'values' state variable

  const defaultModules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
          ["link", "image", "video"],
        ],
        handlers: { image: imageHandler },
      },
    };
  }, []);

  return (
    <Box
      sx={{
        // "& .ql-container": { minHeight: "300px" },
        ...(error && {
          "& .ql-container": {
            border: "1px solid #d32f2f",
          },
        }),
      }}
    >
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            quillRef.current = element;
          }
        }}
        theme="snow"
        modules={defaultModules}
        formats={formats}
        value={value}
        onChange={onChange}
        style={style}
      />
      {/* {error && (
        <Box sx={{ color: "#d32f2f", mt: 5.5, fontSize: "0.75rem" }}>
          {error.message}
        </Box>
      )} */}
    </Box>
  );
}
