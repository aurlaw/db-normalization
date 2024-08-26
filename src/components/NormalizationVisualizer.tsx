import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const sampleData = [
    { BookID: 1, Title: "To Kill a Mockingbird", Author: "Harper Lee", Genre: "Fiction", BorrowerName: "John Doe", BorrowerPhone: "123-456-7890", BorrowerAddress: "123 Main St, City" },
    { BookID: 2, Title: "1984", Author: "George Orwell", Genre: "Fiction", BorrowerName: "Jane Smith", BorrowerPhone: "987-654-3210", BorrowerAddress: "456 Elm St, Town" },
    { BookID: 2, Title: "1984", Author: "George Orwell", Genre: "Fiction", BorrowerName: "Alice Johnson", BorrowerPhone: "555-123-4567", BorrowerAddress: "789 Oak St, Village" },
  ];
  
  const normalizationSteps = [
    {
      title: "Unnormalized",
      description: "All data in a single table with redundancies",
      tables: [
        {
          name: "Books_Borrowers",
          columns: ["BookID", "Title", "Author", "Genre", "BorrowerName", "BorrowerPhone", "BorrowerAddress"],
          data: sampleData
        }
      ]
    },
    {
      title: "First Normal Form (1NF)",
      description: "Atomic values, no repeating groups",
      tables: [
        {
          name: "Books_Borrowers",
          columns: ["BookID", "Title", "Author", "Genre", "BorrowerName", "BorrowerPhone", "BorrowerAddress"],
          data: sampleData
        }
      ]
    },
    {
      title: "Second Normal Form (2NF)",
      description: "Remove partial dependencies",
      tables: [
        {
          name: "Books",
          columns: ["BookID", "Title", "Author", "Genre"],
          data: [
            { BookID: 1, Title: "To Kill a Mockingbird", Author: "Harper Lee", Genre: "Fiction" },
            { BookID: 2, Title: "1984", Author: "George Orwell", Genre: "Fiction" },
          ]
        },
        {
          name: "Borrowers",
          columns: ["BorrowerID", "BorrowerName", "BorrowerPhone", "BorrowerAddress"],
          data: [
            { BorrowerID: 1, BorrowerName: "John Doe", BorrowerPhone: "123-456-7890", BorrowerAddress: "123 Main St, City" },
            { BorrowerID: 2, BorrowerName: "Jane Smith", BorrowerPhone: "987-654-3210", BorrowerAddress: "456 Elm St, Town" },
            { BorrowerID: 3, BorrowerName: "Alice Johnson", BorrowerPhone: "555-123-4567", BorrowerAddress: "789 Oak St, Village" },
          ]
        },
        {
          name: "Loans",
          columns: ["LoanID", "BookID", "BorrowerID"],
          data: [
            { LoanID: 1, BookID: 1, BorrowerID: 1 },
            { LoanID: 2, BookID: 2, BorrowerID: 2 },
            { LoanID: 3, BookID: 2, BorrowerID: 3 },
          ]
        }
      ]
    },
    {
      title: "Third Normal Form (3NF)",
      description: "Remove transitive dependencies",
      tables: [
        {
          name: "Books",
          columns: ["BookID", "Title", "Author", "Genre"],
          data: [
            { BookID: 1, Title: "To Kill a Mockingbird", Author: "Harper Lee", Genre: "Fiction" },
            { BookID: 2, Title: "1984", Author: "George Orwell", Genre: "Fiction" },
          ]
        },
        {
          name: "Borrowers",
          columns: ["BorrowerID", "BorrowerName", "BorrowerPhone", "AddressID"],
          data: [
            { BorrowerID: 1, BorrowerName: "John Doe", BorrowerPhone: "123-456-7890", AddressID: 1 },
            { BorrowerID: 2, BorrowerName: "Jane Smith", BorrowerPhone: "987-654-3210", AddressID: 2 },
            { BorrowerID: 3, BorrowerName: "Alice Johnson", BorrowerPhone: "555-123-4567", AddressID: 3 },
          ]
        },
        {
          name: "Addresses",
          columns: ["AddressID", "Street", "City"],
          data: [
            { AddressID: 1, Street: "123 Main St", City: "City" },
            { AddressID: 2, Street: "456 Elm St", City: "Town" },
            { AddressID: 3, Street: "789 Oak St", City: "Village" },
          ]
        },
        {
          name: "Loans",
          columns: ["LoanID", "BookID", "BorrowerID"],
          data: [
            { LoanID: 1, BookID: 1, BorrowerID: 1 },
            { LoanID: 2, BookID: 2, BorrowerID: 2 },
            { LoanID: 3, BookID: 2, BorrowerID: 3 },
          ]
        }
      ]
    }
  ];

  const Table = ({ name, columns, data }) => (
    <div className="mb-4 p-4 bg-white rounded shadow overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border-t">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


function NormalizationVisualizer() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, normalizationSteps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  
    const currentNormalization = normalizationSteps[currentStep];

    return(
<div className="max-w-6xl mx-auto p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Database Normalization Visualizer</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        <h3 className="text-xl font-semibold">{currentNormalization.title}</h3>
        <button
          onClick={nextStep}
          disabled={currentStep === normalizationSteps.length - 1}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="mb-4 text-gray-600">{currentNormalization.description}</p>
      <div className="space-y-4">
        {currentNormalization.tables.map((table, index) => (
          <Table key={index} name={table.name} columns={table.columns} data={table.data} />
        ))}
      </div>
    </div>        
    );
}
// ... [rest of the component code, including sampleData, normalizationSteps, Table component, etc.]

export default NormalizationVisualizer;