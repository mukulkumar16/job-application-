// @ts-nocheck
import prismaclient from "@/services/prisma";

export default async function page() {
  const companies = await prismaclient.company.findMany({
    where: {
      owner: {
        is: {},
      },
    },
    include: {
      owner: true,
      job: {
        select: {
          id: true,
        },
      },
    },
  });

  console.log("comp === ", companies);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-700">All Companies</h1>

        {companies.map((comp) => (
          <div
            key={comp.id}
            className="bg-white shadow-md rounded-xl p-5 space-y-2 border border-gray-200"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{comp.name}</h2>
            <p className="text-gray-700">{comp.description}</p>

            <div className="text-sm text-gray-500">
              Jobs Available: {comp.job.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
