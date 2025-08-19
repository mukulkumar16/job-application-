// @ts-nocheck
import JobCard from "@/app/component/JobCard";
import { GetUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";

export default async function page() {
  const user = await GetUserFromCookies();

  if (!user) {
    return <div className="text-center text-red-500 p-4">User not found</div>;
  }

  const application = await prismaclient.applictaion.findMany({
    where: {
      user_id: user?.id,
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!application.length) {
    return <div className="text-center text-gray-500 p-4">No applied job</div>;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Applications</h1>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {application.map((app) => (
          <div key={app.id} className="p-4 rounded-xl shadow-lg bg-white">
            <JobCard key={app.id} job={app.job} />
          </div>
        ))}
      </div>
    </div>
  );
}
