import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]); // 🔑 depends on token

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-6">Failed to load profile</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {profile.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profile.email}
        </p>

        {/* Permissions Table */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Permissions</h3>

          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Resource</th>
                <th className="border p-2">Action</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {profile.role.permissions.map((perm) => (
                <tr key={`${perm.resource}-${perm.action}`}>
                  <td className="border p-2">{perm.resource}</td>
                  <td className="border p-2">{perm.action}</td>
                  <td className="border p-2">{perm.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
