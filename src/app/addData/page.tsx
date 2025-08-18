//@ts-nocheck
import data from "../constant/data";
import prismaclient from "@/services/prisma";
export default async function addDataPage() {

    // const deletedata = async () => {
    //     await prismaclient.openings.deleteMany();
    //     console.log("deleted");
    // }
    const addJobData = async () => {
        const jobdata = data.data;
        const newJobData = jobdata.map((job) => {
            return {
                title: job.job_title || "Untitled",
                // image : job.employer_logo || "No image",
                // empName : job.employer_name || "Not available",
                description: job.job_description || "No description available",
                location: job.job_location || "Remote",
                salary:
                    typeof job.job_min_salary === "number"
                        ? job.job_min_salary
                        : Math.floor(Math.random() * (2000000 - 500000 + 1)) + 500000,
                employment_type: (job.job_employment_type || "full-time")
                    .toLowerCase()
                    .replace("-", ""),
                job_type: job.job_is_remote ? "remote" : "on-site",
            }
        })

        await prismaclient.openings.createMany({data:newJobData})
        console.log("Seeded job Data");
        

    }
    // addJobData();
    // deletedata();
    return (
        <div>
            Adding data
        </div>
    )
}