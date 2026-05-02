import { MoreVertical } from "lucide-react";
import { ClientType } from "../../actions/clientsTableOperations";
import { useState } from "react";

const colors = [
  { bg: "bg-teal-50", text: "text-teal-700" },
  { bg: "bg-blue-50", text: "text-blue-700" },
  { bg: "bg-purple-50", text: "text-purple-700" },
  { bg: "bg-amber-50", text: "text-amber-700" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ClientsTable({
  clients,
  onDelete,
  onSendReview,
}: {
  clients: ClientType[];
  onDelete: (id: string, name: string) => void;
  onSendReview: (client: ClientType) => void;
}) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto w-full">
      <table
        className="w-full text-sm border-collapse"
        style={{ minWidth: "700px" }}
      >
        <thead>
          <tr className="border-b border-gray-100">
            {["Name", "Email", "Phone", "Location", "Service", ""].map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => {
            const color = colors[i % colors.length];
            return (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 ${color.bg} ${color.text}`}
                    >
                      {getInitials(client.name)}
                    </div>
                    <span className="text-gray-900 truncate">
                      {client.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-gray-500 truncate max-w-[160px]">
                  {client.email}
                </td>
                <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">
                  {client.phone}
                </td>
                <td className="px-3 py-2.5 text-gray-500 truncate">
                  {client.location}
                </td>
                <td className="px-3 py-2.5">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
                    {client.service}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="relative flex items-center justify-end">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === client.id ? null : client.id)}
                      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {openMenuId === client.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[140px]">
                          <button
                            onClick={() => {
                              onSendReview(client);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
                          >
                            Send review
                          </button>
                          <button
                            onClick={() => {
                              onDelete(client.name, client.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}