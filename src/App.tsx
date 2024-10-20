import { useEffect, useState } from "react";
import Papa from "papaparse";

interface TemperatureData {
  YEAR: string;
  JAN: string;
  FEB: string;
  MAR: string;
  APR: string;
  MAY: string;
  JUN: string;
  JUL: string;
  AUG: string;
  SEP: string;
  OCT: string;
  NOV: string;
  DEC: string;
  ANNUAL: string;
  "JAN-FEB": string;
  "MAR-MAY": string;
  "JUN-SEP": string;
  "OCT-DEC": string;
}

const App = () => {
  const [data, setData] = useState<TemperatureData[]>([]);

  useEffect(() => {
    fetch("/TEMP_ANNUAL_MAX_1901-2021.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const cleanedData = csvData.replace(/"/g, "");

        Papa.parse(cleanedData, {
          delimiter: ",",
          header: true,
          skipEmptyLines: true,
          complete: (result: { data: TemperatureData[] }) => {
            setData(result.data);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching CSV file", error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
