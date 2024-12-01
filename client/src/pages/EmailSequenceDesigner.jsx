import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background,
  addEdge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import ColdEmailNode from '../components/nodes/ColdEmailNode';
import WaitDelayNode from '../components/nodes/WaitDelayNode';
import LeadSourceNode from '../components/nodes/LeadSourceNode';
// import { useAuth } from '../hooks/useAuth';

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode
};

const EmailSequenceDesigner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const { user } = useAuth();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = (type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 250, y: 100 },
      data: { label: `${type} node`, onChange: updateNodeData }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const updateNodeData = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  };

  const saveSequence = async () => {
    try {
      const response = await fetch('/api/sequences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ nodes, edges })
      });
      if (!response.ok) throw new Error('Failed to save sequence');
      // Handle success
    } catch (error) {
      console.error('Error saving sequence:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b">
        <div className="flex gap-4">
          <button
            onClick={() => addNode('coldEmail')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Email Node
          </button>
          <button
            onClick={() => addNode('waitDelay')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Delay Node
          </button>
          <button
            onClick={() => addNode('leadSource')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add Lead Source
          </button>
          <button
            onClick={saveSequence}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Save Sequence
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default EmailSequenceDesigner;