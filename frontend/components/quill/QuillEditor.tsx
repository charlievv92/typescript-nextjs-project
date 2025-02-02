"use client";

import axios from "axios";
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";

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

export default function QuillEditor({ html, setHtml, modules, style }) {
  const quillRef = useRef<ReactQuill>();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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
    <ReactQuill
      ref={(element) => {
        if (element !== null) {
          quillRef.current = element;
        }
      }}
      theme="snow"
      modules={modules || defaultModules}
      formats={formats}
      value={html}
      onChange={setHtml}
      style={style}
    />
  );
}
