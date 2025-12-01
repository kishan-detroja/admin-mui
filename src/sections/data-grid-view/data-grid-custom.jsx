import { useState } from 'react';

import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { EmptyContent } from 'src/components/empty-content';
import { useToolbarSettings } from 'src/components/custom-data-grid';

export function DataGridCustom({
  columns,
  rows,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  ...other
}) {
  const toolbarOptions = useToolbarSettings();

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  return (
    <DataGrid
      {...toolbarOptions.settings}
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      rows={rows}
      columns={columns}
      loading={loading}
      getRowId={(row) => row._id}
      rowCount={rowCount}
      pageSizeOptions={[5, 10, 25, 50]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={onPaginationModelChange}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      slots={{
        noRowsOverlay: () => <EmptyContent />,
        noResultsOverlay: () => <EmptyContent title="No results found" />,
        toolbar: () => (
          <></>
          // <CustomToolbar
          //   settings={toolbarOptions.settings}
          //   onChangeSettings={toolbarOptions.onChangeSettings}
          // />
        ),
      }}
      slotProps={{
        columnsManagement: {
          getTogglableColumns: () =>
            columns.filter((col) => !['id', 'actions'].includes(col.field)).map((col) => col.field),
        },
      }}
      sx={{
        [`& .${gridClasses.cell}`]: {
          display: 'flex',
          alignItems: 'center',
        },
      }}
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

// function CustomToolbar({ settings, onChangeSettings }) {
//   return (
//     <Toolbar>
//       <ToolbarContainer>
//         <ToolbarLeftPanel>
//           <CustomToolbarQuickFilter />
//         </ToolbarLeftPanel>

//         <ToolbarRightPanel>
//           <CustomToolbarColumnsButton />
//           <CustomToolbarFilterButton />
//           <CustomToolbarExportButton />
//           <CustomToolbarSettingsButton settings={settings} onChangeSettings={onChangeSettings} />
//         </ToolbarRightPanel>
//       </ToolbarContainer>
//     </Toolbar>
//   );
// }

// ----------------------------------------------------------------------
