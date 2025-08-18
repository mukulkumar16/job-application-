//@ts-nocheck
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get('q');
    console.log(q);
    const mn = searchParams.get('min') ? Number.parseInt(searchParams.get('min')) : 0 ;
    const mx = searchParams.get('max') ? Number.parseInt(searchParams.get('max')) : 1000000 ;
    const jobtype = searchParams.get('jobType') || 'on-site';

    console.log(jobtype);

    try{

        const jobs = await prismaclient.openings.findMany({
            where : {
                // title : {
                //     contains : q , 
                //     mode : "insensitive"
                // },

                // salary : {
                //     gte : mn,
                //     lte : mx
                // },
                

                OR : [
                    {
                        title : {
                            contains : q,
                            mode : "insensitive"
                        },
                        salary : {
                            gte : mn,
                            lte : mx
                        },
                        job_type : jobtype
                    },
                    {
                        company : {
                            name : {
                                contains : q ,
                                mode : "insensitive"
                            }
                        }
                    }
                ]
                
            
        
                 
            },
            include : {
                company : true
            }
    
        })
    
        return NextResponse.json({
            success : true,
            data : jobs
        })
    }catch(error){
        console.error(error);
        

    }
}