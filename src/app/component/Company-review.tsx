//@ts-nocheck
'use client'
import { Button, Card, TextArea, TextField } from "@radix-ui/themes";
import { Tabs } from "radix-ui";
import { useState } from "react";


export default function CompanyReviewAndJobContainer({company , Reviews}){


	console.log("reviews === " , Reviews )

	const jobs = company.job;
	console.log(company);

	const [reviews , setreviews] = useState(Reviews);

	async function handleClick(){
		const reviewData = {
		content : review,
		company_id : company.id
	}

	const res = await fetch("/api/review",{
		method : "POST",
		body : JSON.stringify(reviewData)
	} )

	const data = await res.json();
	if(data.success){
		alert("review create")
	}
	else{
		alert("something wents wrong")
	}
	}




	// console.log("review == > ", review);


    
    return (
        <div>
            
            <Tabs.Root className="TabsRoot " defaultValue="listed-jobs">
		<Tabs.List className="TabsList " aria-label="Manage your account">
			<div className="flex gap-4">
				<Tabs.Trigger className="TabsTrigger p-2 boreder rounded-lg bg-green-500 text-amber-50" value="listed-jobs">
				Listed jobs 
			</Tabs.Trigger>
			<Tabs.Trigger className="TabsTrigger p-2 border rounded-lg bg-green-500 text-amber-50" value="reviews">
				Reviews 
			</Tabs.Trigger>
			</div>
		</Tabs.List>
		<Tabs.Content className="TabsContent  " value="listed-jobs">
			<div className="Text ">
				 {
                    jobs.map((job)=>{
                        return (
                            <div key={job.id}>
                                <h1> Job  : {job.title}</h1>
                                <h1> Job description : {job.description}</h1>

                            </div>
                        )
                    })
                }
			</div>
			
			
			
		</Tabs.Content>
		<Tabs.Content className="TabsContent" value="reviews">

			<div className="flex-col ">
				<TextArea placehoder="add a review " value={reviews} onChange={(e)=>{setreviews(e.target.value)}} />
			<Button onClick={handleClick} className="mt-10">Add review</Button>
			</div>
			<Card className="mt-10">
				<p className="Text">
				Top review 
			</p>
			</Card>
			<div>
				{/* {
					reviews.map((rev)=>{
						return (
							<Card key={rev.id}>
								<p>{rev.content}</p>
							</Card>
						)
					})
				} */}
			</div>
			
			
		
		</Tabs.Content>
	</Tabs.Root>
        </div>
    )
}