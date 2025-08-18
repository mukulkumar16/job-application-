import JobCard from "@/app/component/JobCard";
import { GetUserFromCookies } from "@/helper"
import prismaclient from "@/services/prisma"

export default async function page(){

    const user = await GetUserFromCookies();
    if(!user){
        return <div>Not found</div>
    }

    const application = await prismaclient.applictaion.findMany({
        where : {
            user_id : user?.id

        },
        include : {
            job : {
                include : {
                    company : true
                }
            }
        }
    });

    if(!application.length){
        return <div>No applied job</div>
    }
    return (
        <div>
           <h1> Your Application : </h1>
           <div>
            {
                application.map((app )=>{
                    return (
                        <div key={app.id} className="p-5">
                            <JobCard key={app.id} job={app.job}/>
                        </div>
                    )
                   
                })
            }
           </div>
        </div>
    )
}