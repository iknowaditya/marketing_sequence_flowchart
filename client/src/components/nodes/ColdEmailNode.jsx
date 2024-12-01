import React from 'react';
import { Handle, Position } from 'reactflow';

const ColdEmailNode = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <Handle type="target" position={Position.Top} />
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Subject:</label>
        <input
          type="text"
          value={data.subject || ''}
          onChange={(e) => data.onChange({ ...data, subject: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Content:</label>
        <textarea
          value={data.content || ''}
          onChange={(e) => data.onChange({ ...data, content: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows="3"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ColdEmailNode;