"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@internals/data/gridData";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchArticles } from "@/stores/articleSlice";

export default function CustomizedDataGrid() {
  const router = useRouter();
  // const filteredRows = rows.filter((row) => row.is_deleted === 0);

  const dispatch = useDispatch<AppDispatch>();
  const { rows, status, message } = useSelector(
    (state: RootState) => state.articles
  );

  const handleRowClick = (params) => {
    console.log(params.row);
    router.push(`/articles/${params.row.board_id}`);
  };

  React.useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={rows}
      getRowId={(rows) => rows.board_id}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      onRowClick={handleRowClick}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
