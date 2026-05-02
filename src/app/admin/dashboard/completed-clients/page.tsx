"use client";

import { useEffect, useState, useRef } from "react";
import {
  getClients,
  ClientType,
  deleteClient,
  sendReview,
} from "@/app/admin/actions/clientsTableOperations";
import toast from "react-hot-toast";
import ClientsTable from "./ClientsTable";

export default function ClientsPage() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  const fetchClients = async (index: number) => {
    setLoading(true);
    
    // Only show toast on subsequent fetches, not on initial load
    if (!isFirstRender.current) {
      await toast.promise(
        getClients(index).then((result) => {
          if (!result.success) throw new Error(result.message);
          setClients(result.data);
          setHasMore(result.hasMore);
        }),
        {
          loading: "Fetching clients...",
          success: "Clients loaded",
          error: (err) => err.message ?? "Failed to fetch clients",
        },
      );
    } else {
      // Initial load - no toast
      try {
        const result = await getClients(index);
        if (!result.success) throw new Error(result.message);
        setClients(result.data);
        setHasMore(result.hasMore);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to fetch clients");
      }
      isFirstRender.current = false;
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchClients(page);
  }, [page]);

  const onDelete = async (name: string, id: string) => {
    if (window.confirm(`Are you sure you want to delete: ${name} details from your database?`)) {
      await deleteConfirmed(id);
    }
  };

  const deleteConfirmed = async (id: string) => {
    await toast.promise(
      deleteClient(id).then((result) => {
        if (!result.success) throw new Error(result.message);
        setClients((prev) => prev.filter((c) => c.id !== id));
      }),
      {
        loading: "Deleting client...",
        success: "Client deleted",
        error: (err) => err.message ?? "Failed to delete client",
      },
    );
  };

  const onSendReview = async (client: ClientType) => {
    await toast.promise(
      sendReview(client).then((result) => {
        if (!result.success) throw new Error(result.message);
      }),
      {
        loading: "Sending review request...",
        success: "Review request sent!",
        error: (err) => err.message ?? "Failed to send review",
      },
    );
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ClientsTable
            clients={clients}
            onDelete={onDelete}
            onSendReview={onSendReview}
          />

          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  page === 1
                    ? "bg-gray-300 cursor-not-allowed opacity-50"
                    : "bg-blue-600 text-white hover:scale-105 active:translate-y-0.5 hover:shadow-lg"
                }
              `}
            >
              Previous
            </button>
            <button
              disabled={!hasMore}
              onClick={() => setPage((p) => p + 1)}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  !hasMore
                    ? "bg-gray-300 cursor-not-allowed opacity-50"
                    : "bg-blue-600 text-white hover:scale-105 active:translate-y-0.5 hover:shadow-lg"
                }
              `}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}