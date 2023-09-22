import React, { useEffect, useState } from 'react';
import AdminSideNav from './AdminSideNav';
import { Typography } from '@mui/material';
import { useParams } from "react-router";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Paper } from '@mui/material';

function AdminDashboard() {
    const { id } = useParams();
    const [chartData, setChartData] = useState({});

    const centerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    };

    useEffect(() => {
        fetch('https://backend-task-ra74.onrender.com/allTaskDist')
            .then((response) => response.json())
            .then((data) => {
                if (!data || data.length === 0) {
                    console.error('Undefined');
                    return;
                }
                const labels = data.map((item) => item.status);
                const counts = data.map((item) => item.count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            data: counts,
                            backgroundColor: [
                                '#FF6384', // Assigned
                                '#36A2EB', // In Progress
                                '#FFCE56', // Done
                            ],
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error('Error', error);
            });
    }, []);
    return (
        <div>
            <AdminSideNav id={id} />
            <Typography variant="h5">Dashboard</Typography>
            <div style={centerStyles}>
                <Paper>
                    {/* To avoid render issues, add div */}
                    <div style={{ width: '500px', height: '500px' }}>
                        {chartData.labels && chartData.labels.length > 0 ? (
                            <Pie data={chartData} />
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </Paper>
            </div>
        </div>
    );
}

export default AdminDashboard;
