import { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

// Define an interface for the rows
interface ScrapeItem {
  id: number;
  name: string;
  category?: string; // Assuming category might be optional
  price: number;
}

const ScrapePricingTable = () => {
  const [rows, setRows] = useState<ScrapeItem[]>([]);

  const token = localStorage.getItem("token") || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/scrapeitems/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data: ScrapeItem[] = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]); // Add token as a dependency

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">SN</TableCell>
              <TableCell>Scrape Item</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Pricing</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.category || 'N/A'}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <button className="bg-accent-1 text-white px-4 py-2 rounded-lg">
                    Request Pickup
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ScrapePricingTable;
