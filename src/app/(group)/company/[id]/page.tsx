// @ts-nocheck
import CompanyReviewAndJobContainer from "@/app/component/Company-review";

type searchQuery = Promise<{
  id: string;
}>;

export default async function page({ params }: { params: searchQuery }) {
  const q = await params;
  const id = q.id;

  const res = await fetch("http://localhost:3000/api/company/" + id);
  const data = await res.json();
  console.log("company ==== ", data);

  const company = data.data;
  const owner = data.data.owner;
  const jobs = data.data.job;
  console.log("jobss === ", jobs);

  const res2 = await fetch("http://localhost:3000/api/review/" + id);
  const data2 = await res2.json();
  console.log("responce of res2 ", res2);
  const reviews = data2;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">Company Details</h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
          <p className="text-gray-700">{company.description}</p>
          <p className="text-sm text-gray-500">Owner Email: {owner.email}</p>
        </div>

        <div className="mt-6">
          <CompanyReviewAndJobContainer Reviews={reviews} company={company} />
        </div>
      </div>
    </div>
  );
}
