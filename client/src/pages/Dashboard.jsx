import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

const Dashboard = () => {
  const [sequences, setSequences] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      const response = await fetch('/api/sequences', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      setSequences(data);
    } catch (error) {
      console.error('Error fetching sequences:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Email Sequences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sequences.map(sequence => (
              <div key={sequence._id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold">{sequence.name}</h3>
                <p>Created: {new Date(sequence.createdAt).toLocaleDateString()}</p>
                <p>Nodes: {sequence.nodes.length}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;