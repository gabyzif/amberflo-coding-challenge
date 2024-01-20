import React, { useState } from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { formatText } from '../../utils/formatText';
import { Column } from '../../types';

interface CustomTableHeadProps {
  columns: Column[];
  handleSort: (column: string) => void;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
}
const CustomTableHead: React.FC<CustomTableHeadProps> = ({
  columns,
  handleSort,
  sortColumn,
  sortDirection,
}) => {
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={`header-${column.id}`}
            align="center"
            style={{
              width: column.width,
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: column.alignment,
            }}
            onMouseEnter={() => setHoveredColumn(column.id)}
            onMouseLeave={() => setHoveredColumn(null)}
            onClick={() => handleSort(column.id)}
          >
            <p
              style={{ height: 20, display: 'flex', justifyContent: 'center' }}
            >
              {formatText(column.displayName)}
              {sortColumn === column.id ? (
                sortDirection === 'asc' ? (
                  <KeyboardArrowDownIcon fontSize="small" />
                ) : (
                  <KeyboardArrowUpIcon fontSize="small" />
                )
              ) : hoveredColumn === column.id ? (
                // Show the opposite arrow on hover if it's not the current sort column
                <KeyboardArrowUpIcon
                  fontSize="small"
                  style={{ visibility: 'visible' }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  fontSize="small"
                  style={{ visibility: 'hidden' }}
                />
              )}
            </p>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
