// @ts-nocheck
'use client';

import { Button, Card, TextArea } from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";
import { useContext, useState } from "react";
import { userContext } from "../(group)/layout";

// import { Link } from "lucide-react";
import Link from "next/link";

export default function CompanyReviewAndJobContainer({ company, Reviews }) {
  const user = useContext(userContext);
  const jobs = company.job;


  // Ensure Reviews is always an array
  const [allReviews, setAllReviews] = useState(
    Array.isArray(Reviews) ? Reviews : []
  );

  const [review, setReview] = useState("");

  async function handleClick() {
    const reviewData = {
      content: review,
      company_id: company.id,
    };

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });

    const data = await res.json();
    if (data.success) {
      alert("Review created");

      // Add the new review to the frontend list
      setAllReviews((prev) => [
        ...prev,
        { content: review, id: data.data.id },
      ]);

      setReview("");
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className="w-full mt-8">
      <Tabs.Root defaultValue="listed-jobs" className="w-full">
        <Tabs.List className="flex gap-4 mb-4">
          <Tabs.Trigger
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            value="listed-jobs"
          >
            Listed Jobs
          </Tabs.Trigger>

          <Tabs.Trigger
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            value="reviews"
          >
            Reviews
          </Tabs.Trigger>
        </Tabs.List>

        {/* Jobs */}
        <Tabs.Content value="listed-jobs" className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id}>
              <Link href={"/view-applicants/"+job.id}>View Applicants</Link>
              <Card key={job.id} className="p-4 shadow-md">
              <h2 className="text-lg font-semibold">Job: {job.title}</h2>
              <p className="text-gray-600">Description: {job.description}</p>
            </Card>
            </div>
          ))}
        </Tabs.Content>

        {/* Reviews */}
        <Tabs.Content value="reviews">
          {!user?.data?.role == 'admin' && <div className="flex flex-col gap-4">
            <TextArea
              placeholder="Add a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleClick}
              className="w-full sm:w-fit bg-green-600 text-white hover:bg-green-700"
            >
              Add Review
            </Button>
          </div>}

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold">Top Reviews</h3>

            {/* Safely render reviews */}
            {Array.isArray(allReviews) && allReviews.length > 0 ? (
              allReviews.map((rev) => (
                <Card key={rev.id || Math.random()} className="p-4 shadow-md">
                  <p className="text-gray-700">{rev.content}</p>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
