import React, { createContext, useContext, useState, useCallback } from 'react';

const FlowContext = createContext(null);

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = useCallback((nodeType, position) => {
    const newNode = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position,
      data: {
        label: `${nodeType} node`,
      }
    };
    setNodes((nds) => [...nds, newNode]);
    return newNode;
  }, []);

  const updateNode = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== nodeId && edge.target !== nodeId
    ));
  }, []);

  const saveFlow = useCallback(async () => {
    try {
      const response = await fetch('/api/sequences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ nodes, edges })
      });
      if (!response.ok) throw new Error('Failed to save flow');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }, [nodes, edges]);

  const loadFlow = useCallback(async (flowId) => {
    try {
      const response = await fetch(`/api/sequences/${flowId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to load flow');
      const flow = await response.json();
      setNodes(flow.nodes);
      setEdges(flow.edges);
      return flow;
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <FlowContext.Provider value={{
      nodes,
      edges,
      setNodes,
      setEdges,
      selectedNode,
      setSelectedNode,
      addNode,
      updateNode,
      deleteNode,
      saveFlow,
      loadFlow
    }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};

export default FlowContext;