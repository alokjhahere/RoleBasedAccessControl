import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Manage access, roles, and permissions from one central dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Your Role"
          value={user?.name || "N/A"}
          accent="bg-blue-500"
        />
        <StatCard
          title="Permissions"
          value={user?.role?.permissions?.length || 0}
          accent="bg-green-500"
        />
        <StatCard
          title="Account Status"
          value="Active"
          accent="bg-purple-500"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            System Overview
          </h2>

          <p className="text-gray-600 leading-relaxed">
            This Role-Based Access Control (RBAC) system ensures that users can
            only access features and resources they are authorized for. Roles
            define permissions, and permissions control actions on resources.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureItem
              title="Secure Authentication"
              description="JWT-based authentication with protected routes."
            />
            <FeatureItem
              title="Role Management"
              description="Create and manage roles with granular permissions."
            />
            <FeatureItem
              title="Permission Mapping"
              description="Define resource-level actions like READ, WRITE, DELETE."
            />
            <FeatureItem
              title="Scalable Architecture"
              description="Designed to scale with more users and roles."
            />
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <ActionButton label="View Profile" />
            <ActionButton label="Manage Roles" adminOnly />
            <ActionButton label="View Permissions" adminOnly />
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Some actions may be restricted based on your role.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Small Reusable Components ---------- */

const StatCard = ({ title, value, accent }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg ${accent} opacity-90`} />
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-gray-800 capitalize">{value}</p>
    </div>
  </div>
);

const FeatureItem = ({ title, description }) => (
  <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition">
    <h3 className="font-medium text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

const ActionButton = ({ label, adminOnly }) => {
  const { user } = useAuth();

  if (adminOnly && user?.role?.name !== "admin") return null;

  return (
    <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
      {label}
    </button>
  );
};

export default Home;
