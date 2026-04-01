// @ts-nocheck
'use client';

export default function DeleteCompany({ id }) {
  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete your company?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/company/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Company deleted successfully");
        // Add redirect if needed
        // window.location.reload();
      } else {
        alert("Failed to delete company");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="
        w-full text-left 
        
        text-sm 
        text-red-600
        font-medium
        rounded-md 
        hover:bg-red-100 
        transition 
        duration-200
      "
    >
      Delete Company
    </button>
  );
}
