
import CompanyReviewAndJobContainer from "@/app/component/Company-review";
import DeleteCompany from "@/app/component/DeleteCompany";
import JobCard from "@/app/component/JobCard";
type searchQuery = Promise<{
    id : string

}>

export default async function page({params } : {
    params : searchQuery
}  ){
    const q = await params
    const id = q.id;
    const res = await fetch("http://localhost:3000/api/company/" + id);
    const data = await res.json();
    console.log("company ==== " , data);

    const company = data.data;
    const owner  = data.data.owner;
    const jobs = data.data.job;
    console.log("jobss === " , jobs)


    const res2 = await fetch("http://localhost:3000/api/review/" + id);
    const data2 = await res2.json();
    console.log("responce of res2 " , res2);
    const reviews = data2;


    return ( 
        
        <div className="p-4 f ">
            <h1 className="text-2xl font-bold">company details </h1>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            
             <h1>{owner.email}</h1>



            {/* <DeleteCompany id={company.id} /> */}

            <div>
             
                <CompanyReviewAndJobContainer Reviews={reviews} company={company}/>
            </div>
        </div>
    )
}