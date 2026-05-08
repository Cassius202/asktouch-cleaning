'use client'

import Link from 'next/link'
import useSessionStorage from "@/hooks/useSessionStorage"
import { ClientFull, getRecentClients } from "../../actions/clientsTableOperations";
import { useEffect, useState } from "react";

export default function RecentClients() {
  const [recentClients, setRecentClients] = useSessionStorage<ClientFull[]>("recent-clients", []);
  const [isLoading, setIsLoading] = useState(true);

  const index = 5;

  useEffect(() => {
    const fetchRecentClients = async () => {
      setIsLoading(true);
      try {
        const result = await getRecentClients(index);
        if (!result.success) throw new Error("Failed to fetch clients");
        setRecentClients(result.data);
      } catch (error) {
        console.error("Error fetching recent clients:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentClients();
  }, [index, setRecentClients]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Clients</h2>

          <Link
            href="/admin/dashboard/completed-clients"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
          >
            See All Completed Clients
          </Link>
        </div>

        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Clients</h2>

        <Link
          href="/admin/dashboard/completed-clients"
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
        >
          See All Completed Clients
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No clients found
                  </td>
                </tr>
              ) : (
                recentClients.map((client, idx) => (
                  <tr key={client.id || idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {client.name || 'N/A'}
                    </td>

                    <td className="px-4 py-3">
                      {client.email || 'N/A'}
                    </td>

                    <td className="px-4 py-3">
                      {client.phone || 'N/A'}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {client.service || 'N/A'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {client.created_at
                        ? new Date(client.created_at).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}