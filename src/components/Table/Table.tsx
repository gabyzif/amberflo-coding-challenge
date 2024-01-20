import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { formatText, formatTime } from '../../utils/formatText';
import { Column } from '../../types';
import CustomTableHead from './TableHead';

interface TableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
}

const CustomTable: React.FC<TableProps> = ({ data, columns }) => {
  if (!data.length) {
    return <div>Loading...</div>;
  }

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (sortColumn.includes('time')) {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table style={{ tableLayout: 'fixed' }}>
        <CustomTableHead
          columns={columns}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow key={`row-${index}`}>
              {columns.map((column) => (
                <TableCell
                  key={`cell-${index}-${column.id}`}
                  style={{
                    textAlign: column.alignment,
                    padding: '10px',
                  }}
                >
                  {column.id.includes('time')
                    ? formatTime(row[column.id])
                    : formatText(row[column.id].toString())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
