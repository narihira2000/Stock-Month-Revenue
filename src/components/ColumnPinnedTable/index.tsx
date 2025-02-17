import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { useEffect } from 'react';

function ColumnPinnedTable({
  months,
  revenues,
  annualGrowths,
}: {
  months: Date[];
  revenues: number[];
  annualGrowths: number[];
}) {
  useEffect(() => {
    const table = document.getElementById('table');
    if (table && table.scrollLeft !== table.scrollWidth) {
      table.scrollLeft = table.scrollWidth;
    }
  });
  return (
    <div className="flex flex-row overflow-scroll">
      <div>
        <TableContainer sx={{ width: 170 }} component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="bg-action-hover border border-[##e0e0e0]">
                  年度月份
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border border-[##e0e0e0]">
                  每月營收 (千元)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-action-hover border border-[##e0e0e0]">
                  單月營收年增率 (%)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="overflow-scroll">
        <TableContainer id="table" component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                {months.map((month, index) => (
                  <TableCell
                    className="bg-action-hover border border-[##e0e0e0]"
                    key={index}
                    align="right"
                  >
                    {format(month, 'yyyyMM')}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {revenues.map((revenue, index) => (
                  <TableCell
                    className="border border-[##e0e0e0]"
                    key={index}
                    align="right"
                  >
                    {revenue.toLocaleString()}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {annualGrowths.map((annualGrowth, index) => (
                  <TableCell
                    className="bg-action-hover border border-[##e0e0e0]"
                    key={index}
                    align="right"
                  >
                    {annualGrowth === 0
                      ? '前期為0'
                      : Math.round(annualGrowth * 100) / 100}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ColumnPinnedTable;
