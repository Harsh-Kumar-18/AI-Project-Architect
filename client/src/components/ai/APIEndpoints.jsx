import React, { useMemo, useState } from "react";
import {
  FaLock,
  FaUnlock,
  FaServer,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const METHOD_STYLES = {
  GET: "text-green-700 bg-green-50",
  POST: "text-blue-700 bg-blue-50",
  PUT: "text-amber-700 bg-amber-50",
  PATCH: "text-purple-700 bg-purple-50",
  DELETE: "text-red-700 bg-red-50",
};

// Groups a flat endpoint array by its "group" field
const groupEndpoints = (endpoints = []) => {
  const groups = {};

  for (const ep of endpoints) {
    const key = ep.group || "API";
    if (!groups[key]) groups[key] = [];
    groups[key].push(ep);
  }

  return Object.entries(groups).map(([name, items]) => ({ name, items }));
};

const APIEndpoints = ({ endpoints = [] }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const groups = useMemo(() => groupEndpoints(endpoints), [endpoints]);

  if (!endpoints.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-gray-400">No API endpoints available.</p>
      </div>
    );
  }

  const toggleRow = (key) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Count endpoints per HTTP method for the summary bar
  const methodCounts = endpoints.reduce((acc, ep) => {
    const method = ep.method || "GET";
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <FaServer className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">API Endpoints</h2>
              <p className="text-gray-500 text-sm">
                {endpoints.length} endpoints across {groups.length} groups
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(methodCounts).map(([method, count]) => (
              <span
                key={method}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${METHOD_STYLES[method] || "text-gray-600 bg-gray-50"}`}
              >
                {method} · {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Groups */}
      {groups.map((group, gIdx) => (
        <div key={gIdx} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Group header */}
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{group.name}</h3>
            <span className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-500">
              {group.items.length} endpoints
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500">
                  <th className="text-left px-5 py-3 font-semibold">Method</th>
                  <th className="text-left px-5 py-3 font-semibold">Endpoint</th>
                  <th className="text-left px-5 py-3 font-semibold">Description</th>
                  <th className="text-left px-5 py-3 font-semibold">Auth</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>

              <tbody>
                {group.items.map((ep, i) => {
                  const rowKey = `${gIdx}-${i}`;
                  const isExpanded = expandedRows.has(rowKey);
                  const hasDetails = ep.requestBody || ep.response;

                  return (
                    <React.Fragment key={rowKey}>
                      <tr
                        className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors ${hasDetails ? "cursor-pointer" : ""}`}
                        onClick={() => hasDetails && toggleRow(rowKey)}
                      >
                        <td className="px-5 py-3">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold font-mono ${METHOD_STYLES[ep.method] || "text-gray-600 bg-gray-50"}`}>
                            {ep.method || "GET"}
                          </span>
                        </td>

                        <td className="px-5 py-3 font-mono text-gray-700">
                          {ep.endpoint || "-"}
                        </td>

                        <td className="px-5 py-3 text-gray-600">
                          {ep.description || "No description"}
                        </td>

                        <td className="px-5 py-3">
                          {ep.authRequired ? (
                            <span className="flex items-center gap-1.5 text-amber-600 text-xs font-medium">
                              <FaLock size={11} /> Required
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                              <FaUnlock size={11} /> Public
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-3 text-gray-300">
                          {hasDetails && (isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />)}
                        </td>
                      </tr>

                      {isExpanded && hasDetails && (
                        <tr className="bg-gray-50/60 border-b border-gray-100 last:border-0">
                          <td colSpan={5} className="px-5 py-4">
                            <div className="grid sm:grid-cols-2 gap-4 text-xs">
                              {ep.requestBody && (
                                <div>
                                  <p className="font-semibold text-gray-500 uppercase tracking-wide mb-1">Request body</p>
                                  <p className="text-gray-700">{ep.requestBody}</p>
                                </div>
                              )}
                              {ep.response && (
                                <div>
                                  <p className="font-semibold text-gray-500 uppercase tracking-wide mb-1">Response</p>
                                  <p className="text-gray-700">{ep.response}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default APIEndpoints;