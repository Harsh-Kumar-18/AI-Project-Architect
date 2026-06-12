import React from "react";
import {
  FaDatabase,
  FaKey,
  FaCheckCircle,
  FaIdBadge,
} from "react-icons/fa";

// Detects primary/foreign key style fields for a small visual cue
const isKeyField = (name = "") =>
  name === "_id" || /id$/i.test(name);

const DatabaseSchema = ({ schema = [] }) => {
  if (!schema.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400">No database schema available.</p>
      </div>
    );
  }

  const totalFields = schema.reduce((sum, c) => sum + (c.fields?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <FaDatabase className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Database Schema</h2>
              <p className="text-gray-500 text-sm">Suggested collections and structure</p>
            </div>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold">
              {schema.length} collections
            </span>
            <span className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-xl text-sm font-semibold">
              {totalFields} fields
            </span>
          </div>
        </div>
      </div>

      {/* Collections */}
      {schema.map((collection, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Collection Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-5 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{collection.collection}</h3>
              <p className="text-gray-500 mt-1 text-sm">{collection.description}</p>
            </div>

            <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-500">
              {collection.fields?.length || 0} fields
            </span>
          </div>

          {/* Fields */}
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-sm font-semibold text-gray-500">Field</th>
                    <th className="text-left py-3 pr-4 text-sm font-semibold text-gray-500">Type</th>
                    <th className="text-left py-3 pr-4 text-sm font-semibold text-gray-500">Description</th>
                    <th className="text-left py-3 pr-4 text-sm font-semibold text-gray-500">Example</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Required</th>
                  </tr>
                </thead>

                <tbody>
                  {collection.fields?.map((field, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {isKeyField(field.name) && (
                            <FaKey className="text-amber-400 shrink-0" size={11} />
                          )}
                          {field.name}
                        </div>
                      </td>

                      <td className="py-3 pr-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                          {field.type}
                        </span>
                      </td>

                      <td className="py-3 pr-4 text-sm text-gray-600 max-w-xs">
                        {field.description}
                      </td>

                      <td className="py-3 pr-4">
                        {field.example && (
                          <code className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md break-all">
                            {field.example}
                          </code>
                        )}
                      </td>

                      <td className="py-3 whitespace-nowrap">
                        {field.required ? (
                          <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                            <FaCheckCircle size={12} />
                            Yes
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Indexes */}
            {collection.indexes?.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <FaIdBadge className="text-amber-500" />
                  Indexes
                </h4>

                <div className="flex flex-wrap gap-2">
                  {collection.indexes.map((indexName, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium"
                    >
                      <FaKey size={11} />
                      {indexName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DatabaseSchema;