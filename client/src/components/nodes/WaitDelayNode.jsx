import React from 'react';
import { Handle, Position } from 'reactflow';

const WaitDelayNode = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <Handle type="target" position={Position.Top} />
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Delay (hours):</label>
        <input
          type="number"
          value={data.delay || 1}
          onChange={(e) => data.onChange({ ...data, delay: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="1"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default WaitDelayNode;