// @ts-nocheck
'use client'
import { Dialog } from 'radix-ui';
import { useEffect, useState } from 'react';

export default function ViewJobApplicant({ job }) {
  const [applicants, setApplicants] = useState([]);

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/application/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setApplicants((prev) => prev.filter((app) => app.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete applicant:', error);
    }
  }

  useEffect(() => {
    async function GetApplicants() {
      try {
        const res = await fetch(`/api/application/${job.id}`);
        const data = await res.json();
        if (data.success) {
          setApplicants(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch applicants:', error);
      }
    }
    GetApplicants();
  }, [job.id]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
          View Applicants
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-w-lg w-[90vw] bg-white p-6 rounded-lg shadow-xl transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-4">Job Applicants</Dialog.Title>

          {applicants.length > 0 ? (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {applicants.map((app) => (
                <div
                  key={app.id}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <p className="text-sm">📧 {app.user.email}</p>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No applicants yet.</p>
          )}

          <div className="flex justify-end mt-6">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
