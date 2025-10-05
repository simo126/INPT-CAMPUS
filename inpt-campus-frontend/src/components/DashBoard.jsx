import { useEffect, useState } from "react";
import axios from "axios";

export const DashBoard = () => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/issues`,
          {
            withCredentials: true,
            timeout: 5000,
          }
        );
        setIssues(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching issues:", err);
        setError("Failed to load issues. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);
  console.log(issues);
  const parseDescription = (description) => {
    try {
      return JSON.parse(description);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { description: description }; // fallback if not JSON
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      OPEN: "bg-green-100 text-green-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      RESOLVED: "bg-blue-100 text-blue-800",
      CLOSED: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-orange-100 text-orange-800",
      low: "bg-green-100 text-green-800",
    };
    return priorityColors[priority] || "bg-gray-100 text-gray-800";
  };

  const getIssueTypeBadge = (issueType) => {
    const typeColors = {
      plumbing: "bg-blue-100 text-blue-800",
      electrical: "bg-purple-100 text-purple-800",
      cleaning: "bg-teal-100 text-teal-800",
      maintenance: "bg-indigo-100 text-indigo-800",
      security: "bg-red-100 text-red-800",
      other: "bg-gray-100 text-gray-800",
    };
    return typeColors[issueType] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
            <div className="text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and track all campus issues ({issues.length} total)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">
              {issues.length}
            </div>
            <div className="text-sm text-gray-600">Open Issues</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {issues.filter((issue) => issue.status).length}
            </div>
            <div className="text-sm text-gray-600">Resolved</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-red-600">
              {
                issues.filter((issue) => {
                  const parsed = parseDescription(issue.description);
                  return parsed.issuePriority === "medium";
                }).length
              }
            </div>
            <div className="text-sm text-gray-600">Medium Priority</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-red-600">
              {
                issues.filter((issue) => {
                  const parsed = parseDescription(issue.description);
                  return parsed.issuePriority === "high";
                }).length
              }
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Issues
            </h2>
          </div>

          {issues.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-lg mb-2">No issues found</div>
              <div className="text-gray-500">
                All caught up! No issues to display.
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {issues.map((issue) => {
                const parsedDesc = parseDescription(issue.description);

                return (
                  <div
                    key={issue.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {issue.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                              issue.status
                            )}`}
                          >
                            {issue.status?.replace("_", " ") || "Unknown"}
                          </span>
                          {parsedDesc.issuePriority && (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(
                                parsedDesc.issuePriority
                              )}`}
                            >
                              {parsedDesc.issuePriority.toUpperCase()}
                            </span>
                          )}
                          {parsedDesc.issueType && (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIssueTypeBadge(
                                parsedDesc.issueType
                              )}`}
                            >
                              {parsedDesc.issueType.charAt(0).toUpperCase() +
                                parsedDesc.issueType.slice(1)}
                            </span>
                          )}
                        </div>

                        {parsedDesc.description && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {parsedDesc.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {issue.reportedBy && (
                            <span>Reported by: {issue.reportedBy}</span>
                          )}
                          {issue.location && (
                            <span>Location: {issue.location}</span>
                          )}
                          {issue.createdAt && (
                            <span>
                              {new Date(issue.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ml-6 flex-shrink-0">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
