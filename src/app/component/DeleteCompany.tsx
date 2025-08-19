// @ts-nocheck
'use client';

export default function DeleteCompany({ id }) {
  async function handleDelete() {
    try {
      const res = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Company deleted");
        // Optionally refresh or redirect here
      } else {
        alert("Failed to delete company");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
      >
        Delete Company
      </button>
    </div>
  );
}
