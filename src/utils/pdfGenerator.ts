import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { EmissionData } from '../types/emissions';
import { Vehicle } from '../types/vehicle';

export const generateEmissionsPDF = (
  emissionsData: EmissionData[],
  timeFrame: string,
  selectedVehicle: Vehicle | null,
  startDate?: Date,
  endDate?: Date
) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('CO₂ Emissions Report', 14, 20);
  
  // Add report details
  doc.setFontSize(12);
  doc.text(`Generated: ${format(new Date(), 'PPP')}`, 14, 30);
  doc.text(`Time Frame: ${timeFrame}`, 14, 37);
  if (startDate && endDate) {
    doc.text(`Period: ${format(startDate, 'PP')} - ${format(endDate, 'PP')}`, 14, 44);
  }
  if (selectedVehicle) {
    doc.text(`Vehicle: ${selectedVehicle.plateNumber} (${selectedVehicle.model})`, 14, 51);
  }
  
  // Calculate totals
  const totalEmissions = emissionsData.reduce((sum, data) => sum + data.co2Amount, 0);
  const totalDistance = emissionsData.reduce((sum, data) => sum + data.distance, 0);
  
  // Add summary
  doc.text('Summary:', 14, 65);
  doc.text(`Total Emissions: ${(totalEmissions / 1000).toFixed(2)} kg`, 14, 72);
  doc.text(`Total Distance: ${totalDistance.toFixed(2)} km`, 14, 79);
  doc.text(`Average Emissions: ${((totalEmissions / totalDistance) / 1000).toFixed(2)} kg/km`, 14, 86);
  
  // Add detailed data table
  autoTable(doc, {
    startY: 100,
    head: [['Date', 'Vehicle', 'CO₂ (kg)', 'Distance (km)']],
    body: emissionsData.map((data) => [
      format(new Date(data.timestamp), 'PP'),
      data.plateNumber,
      (data.co2Amount / 1000).toFixed(2),
      data.distance.toFixed(2)
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [39, 110, 241] }
  });
  
  // Save the PDF
  doc.save('emissions-report.pdf');
};
