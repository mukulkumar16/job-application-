//@ts-nocheck

'use client';

import {
  Card,
  TextArea,
} from "@radix-ui/themes";

import * as Tabs from "@radix-ui/react-tabs";

import {
  useContext,
  useState,
} from "react";

import { userContext } from "../(group)/layout";

import Link from "next/link";

import {
  Briefcase,
  MessageSquare,
  Star,
  Send,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";



export default function CompanyReviewAndJobContainer({
  company,
  Reviews,
}) {

  const user =
    useContext(userContext);

  const jobs = company.job;



  // REVIEWS STATE
  const [allReviews, setAllReviews] =
    useState(
      Array.isArray(Reviews)
        ? Reviews
        : []
    );

  const [review, setReview] =
    useState("");



  // ADD REVIEW
  async function handleClick() {

    const reviewData = {
      content: review,
      company_id: company.id,
    };

    const res = await fetch(
      "/api/review",
      {
        method: "POST",
        body: JSON.stringify(reviewData),
      }
    );

    const data = await res.json();

    if (data.success) {

      alert("Review created");

      setAllReviews((prev) => [
        ...prev,
        {
          content: review,
          id: data.data.id,
        },
      ]);

      setReview("");

    } else {

      alert("Something went wrong");
    }
  }



  return (

    <div className="w-full mt-10">

      <Tabs.Root
        defaultValue="listed-jobs"
        className="w-full"
      >

        {/* TAB BUTTONS */}
        <Tabs.List
          className="
            flex flex-wrap gap-4
            mb-8
          "
        >

          {/* JOBS TAB */}
          <Tabs.Trigger
            value="listed-jobs"
            className="
              group
              flex items-center gap-2

              px-5 py-3

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              text-white
              font-semibold

              shadow-lg

              hover:scale-[1.03]
              active:scale-[0.98]

              transition-all duration-300

              data-[state=active]:ring-4
              data-[state=active]:ring-cyan-300/30
            "
          >

            <Briefcase size={18} />
            Listed Jobs

          </Tabs.Trigger>



          {/* REVIEWS TAB */}
          <Tabs.Trigger
            value="reviews"
            className="
              group
              flex items-center gap-2

              px-5 py-3

              rounded-2xl

              bg-gradient-to-r
              from-violet-500
              to-fuchsia-600

              text-white
              font-semibold

              shadow-lg

              hover:scale-[1.03]
              active:scale-[0.98]

              transition-all duration-300

              data-[state=active]:ring-4
              data-[state=active]:ring-fuchsia-300/30
            "
          >

            <MessageSquare size={18} />
            Reviews

          </Tabs.Trigger>

        </Tabs.List>



        {/* JOBS CONTENT */}
        <Tabs.Content
          value="listed-jobs"
          className="space-y-5"
        >

          {jobs.length > 0 ? (

            jobs.map((job) => (

              <Card
                key={job.id}
                className="
                  relative
                  overflow-hidden

                  rounded-[28px]

                  border border-slate-800

                  bg-slate-950/90

                  p-6

                  shadow-2xl
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute inset-0

                    bg-gradient-to-br
                    from-cyan-500/10
                    via-transparent
                    to-violet-500/10

                    pointer-events-none
                  "
                />



                <div className="relative">

                  {/* TOP */}
                  <div
                    className="
                      flex flex-col lg:flex-row
                      lg:items-center
                      lg:justify-between

                      gap-5
                    "
                  >

                    {/* LEFT */}
                    <div className="space-y-3">

                      <div
                        className="
                          flex items-center gap-3
                        "
                      >

                        <div
                          className="
                            w-14 h-14

                            rounded-2xl

                            bg-gradient-to-br
                            from-cyan-500
                            to-violet-600

                            flex items-center justify-center

                            shadow-xl
                          "
                        >

                          <Briefcase
                            className="text-white"
                            size={24}
                          />

                        </div>



                        <div>

                          <h2
                            className="
                              text-xl md:text-2xl
                              font-black
                              text-white
                            "
                          >
                            {job.title}
                          </h2>

                          <p
                            className="
                              text-slate-400
                              text-sm
                            "
                          >
                            Job Opportunity
                          </p>

                        </div>

                      </div>



                      {/* DESCRIPTION */}
                      <p
                        className="
                          text-slate-300
                          leading-relaxed
                          max-w-3xl
                        "
                      >
                        {job.description}
                      </p>

                    </div>



                    {/* BUTTON */}
                    <div className="flex flex-col gap-3">

                      <Link
                        href={
                          "/view-applicants/" +
                          job.id
                        }
                        className="
                          flex items-center justify-center gap-2

                          px-5 py-3

                          rounded-2xl

                          bg-gradient-to-r
                          from-emerald-500
                          to-green-600

                          text-white
                          font-semibold

                          shadow-lg

                          hover:scale-[1.03]
                          active:scale-[0.98]

                          transition-all duration-300
                        "
                      >

                        <Users size={18} />
                        View Applicants

                      </Link>

                    </div>

                  </div>

                </div>

              </Card>

            ))

          ) : (

            <div
              className="
                rounded-[28px]

                border border-slate-800

                bg-slate-950/90

                p-10

                text-center
              "
            >

              <Building2
                size={50}
                className="
                  mx-auto
                  text-cyan-400
                  mb-4
                "
              />

              <h2
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                No Jobs Listed
              </h2>

              <p
                className="
                  text-slate-400
                  mt-2
                "
              >
                This company has not posted any jobs yet.
              </p>

            </div>

          )}

        </Tabs.Content>



        {/* REVIEWS CONTENT */}
        <Tabs.Content value="reviews">

          {/* REVIEW FORM */}
          {user?.data?.role !== "admin" && (

            <div
              className="
                rounded-[28px]

                border border-slate-800

                bg-slate-950/90

                p-6 md:p-8

                shadow-2xl

                mb-8
              "
            >

              <div
                className="
                  flex items-center gap-3
                  mb-5
                "
              >

                <div
                  className="
                    w-14 h-14

                    rounded-2xl

                    bg-gradient-to-br
                    from-fuchsia-500
                    to-violet-600

                    flex items-center justify-center

                    shadow-xl
                  "
                >

                  <Sparkles
                    className="text-white"
                    size={24}
                  />

                </div>



                <div>

                  <h2
                    className="
                      text-2xl
                      font-black
                      text-white
                    "
                  >
                    Share Your Review
                  </h2>

                  <p
                    className="
                      text-slate-400
                      text-sm
                    "
                  >
                    Help others by sharing your experience
                  </p>

                </div>

              </div>



              {/* TEXTAREA */}
              <TextArea
                placeholder="Write your review here..."
                value={review}
                onChange={(e) =>
                  setReview(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border border-slate-700
                  bg-slate-900
                  text-white
                "
              />



              {/* BUTTON */}
              <button
                onClick={handleClick}
                className="
                  mt-5

                  flex items-center justify-center gap-2

                  px-6 py-3

                  rounded-2xl

                  bg-gradient-to-r
                  from-fuchsia-500
                  to-violet-600

                  text-white
                  font-semibold

                  shadow-lg

                  hover:scale-[1.03]
                  active:scale-[0.98]

                  transition-all duration-300
                "
              >

                <Send size={18} />
                Add Review

              </button>

            </div>

          )}



          {/* REVIEWS LIST */}
          <div className="space-y-5">

            <div
              className="
                flex items-center gap-3
              "
            >

              <Star
                className="text-yellow-400"
                size={24}
              />

              <h3
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                Top Reviews
              </h3>

            </div>



            {/* REVIEW ITEMS */}
            {Array.isArray(allReviews) &&
            allReviews.length > 0 ? (

              allReviews.map((rev) => (

                <Card
                  key={
                    rev.id ||
                    Math.random()
                  }
                  className="
                    relative
                    overflow-hidden

                    rounded-[26px]

                    border border-slate-800

                    bg-slate-950/90

                    p-6

                    shadow-xl
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute inset-0

                      bg-gradient-to-r
                      from-fuchsia-500/10
                      via-transparent
                      to-violet-500/10

                      pointer-events-none
                    "
                  />



                  <div className="relative">

                    <div
                      className="
                        flex items-center gap-3
                        mb-4
                      "
                    >

                      <div
                        className="
                          w-12 h-12

                          rounded-2xl

                          bg-gradient-to-br
                          from-fuchsia-500
                          to-violet-600

                          flex items-center justify-center

                          shadow-lg
                        "
                      >

                        <MessageSquare
                          className="text-white"
                          size={20}
                        />

                      </div>



                      <div>

                        <h2
                          className="
                            text-lg
                            font-bold
                            text-white
                          "
                        >
                          User Review
                        </h2>

                        <p
                          className="
                            text-slate-400
                            text-sm
                          "
                        >
                          Community Feedback
                        </p>

                      </div>

                    </div>



                    <p
                      className="
                        text-slate-300
                        leading-relaxed
                      "
                    >
                      {rev.content}
                    </p>

                  </div>

                </Card>

              ))

            ) : (

              <div
                className="
                  rounded-[28px]

                  border border-slate-800

                  bg-slate-950/90

                  p-10

                  text-center
                "
              >

                <MessageSquare
                  size={50}
                  className="
                    mx-auto
                    text-fuchsia-400
                    mb-4
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-black
                    text-white
                  "
                >
                  No Reviews Yet
                </h2>

                <p
                  className="
                    text-slate-400
                    mt-2
                  "
                >
                  Be the first person to review this company.
                </p>

              </div>

            )}

          </div>

        </Tabs.Content>

      </Tabs.Root>

    </div>
  );
}