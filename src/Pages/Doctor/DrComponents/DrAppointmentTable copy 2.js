import React, { useState, useEffect, useContext } from 'react';
import { Table, ErrorText, H3,Button } from 'govuk-react';
import $ from 'jquery';
import DoctorContext from './DoctorContext';
import ViewMedicalRecords from './ViewMedicalRecords';
import { useNavigate } from 'react-router-dom';


const DrAppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNhsNumber, setSelectedNhsNumber] = useState(null);

  const { DoctorId } = useContext(DoctorContext);
  
  const navigate = useNavigate();


  useEffect(() => {
    fetchAppointments(DoctorId);
  }, [DoctorId]);

  const fetchAppointments = (DoctorId) => {
    $.ajax({
      url: 'http://localhost:8000/viewDrAppointment.php',
      method: 'POST',
      dataType: 'json',
      data: {
        'DoctorId': DoctorId,
      },
      success: (response) => {
        try {
          if (response.appointments) {
            setAppointments(response.appointments);
            setError(null);
          } else {
            setError(response.message || 'Empty response from the server');
          }
        } catch (error) {
          setError('No booked appointments ');
        }
      },
      error: (error) => {
        setError('Fetching appointments failed: ' + error.statusText);
      },
    });
  };

  const handleNhsNumberClick = (nhsNumber) => {
    setSelectedNhsNumber(nhsNumber);
    navigate(`/doctor-dashboard/view-medical-records/${nhsNumber}`); 
  };

  return (
    <>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : appointments.length ? (
        <Table caption="Your upcoming appointments">
          <Table.Row>
            <Table.CellHeader>Appointment No</Table.CellHeader>
            <Table.CellHeader>Vaccination Date</Table.CellHeader>
            <Table.CellHeader>Vaccination Time</Table.CellHeader>
            <Table.CellHeader>Patient NHS Number</Table.CellHeader>
          </Table.Row>
          {appointments.map((appointment, index) => (
            <Table.Row key={index}>
              <Table.Cell>{appointment.AppointmentNo}</Table.Cell>
              <Table.Cell>{appointment.AppointmentDate}</Table.Cell>
              <Table.Cell>{appointment.AppointmentTime}</Table.Cell>
              <Table.Cell>{appointment.NHSNumber}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleNhsNumberClick(appointment.NHSNumber)}>
                  View Medical Record
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      ) : (
        <H3>No appointments booked</H3>
      )}
      {selectedNhsNumber && <ViewMedicalRecords nhsNumber={selectedNhsNumber} />}
    </>
  );
};

export default DrAppointmentTable;