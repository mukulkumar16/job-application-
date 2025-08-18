
import prismaclient from "@/services/prisma";

export default async function page(){
    const companies = await prismaclient.company.findMany({
       where: {
    owner: {
      is:{}
    },
  },
  include: {
    owner: true,
    job: {
      select: {
        id: true
      }
    }
  }

    //    include : {
    //     owner : true
    //    }
    })

    console.log("comp === " , companies);
    return (
        <div>
            {
                companies.map((comp)=>{
                    return (
                        <div key={comp.id}>
                            <h1>{comp.name}</h1>
                            <p>{comp.description}</p>
                            <br />
                            <br />
                            <br />
                            <hr />
                            {/* <p>{comp.n}</p> */}

                        </div>
                    )
                })
            }
        </div>
    )
}