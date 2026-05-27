//@ts-nocheck
"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Separator,
  Card,
  Avatar,
} from "@radix-ui/themes";

import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../../layout";
import { useRouter } from "next/navigation";

import {
  MapPin,
  Briefcase,
  IndianRupee,
  Building2,
  FileText,
  Sparkles,
} from "lucide-react";

import { User } from "../../../../../generated/prisma";

import ApplyDelete from "@/app/component/apply-delete-btn";
import Editjob from "@/app/component/EditJob";

type Company = {
  id: string;
  name: string;
};

type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  employment_type: string;
  job_type: string;
  apply_through: string;
  company: Company;
};

export default function Page() {

  const [job, setJob] = useState<Job | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [applicants, setApplicants] = useState<User[]>([]);

  const [appliedUser, setAppliedUser] = useState(false);

  const { id } = useParams();

  const userContextValue = useContext(userContext);

  const authUser = userContextValue.user;

  const router = useRouter();



  // FETCH JOB
  useEffect(() => {

    async function fetchJob() {

      setLoading(true);

      try {

        const res = await fetch(`/api/product/${id}`);

        if (!res.ok) throw new Error("Job not found");

        const data = await res.json();

        setAppliedUser(data.userapplied);

        setJob(data);

      } catch (err) {

        console.error("Failed to load job:", err);

      } finally {

        setLoading(false);
      }
    }

    fetchJob();

  }, [id]);



  // FETCH APPLICANTS
  useEffect(() => {

    async function fetchApplicants() {

      try {

        const res = await fetch(`/api/application/${job?.id}`);

        const data = await res.json();

        setApplicants(data.data);

      } catch (err) {

        console.error("Failed to load applicants:", err);
      }
    }

    if (job) fetchApplicants();

  }, [job]);



  // LOADING UI
  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-slate-950
          flex items-center justify-center
          text-white text-xl
        "
      >
        Loading...
      </div>
    );
  }

  // NOT FOUND
  if (!job) {
    return (
      <div
        className="
          min-h-screen
          bg-slate-950
          flex items-center justify-center
          text-red-400 text-xl
        "
      >
        Job not found
      </div>
    );
  }



  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-4 py-8 md:px-8
      "
    >

      <Box
        className="
          max-w-6xl mx-auto
          rounded-[32px]
          border border-slate-800
          bg-slate-950/80
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* TOP HERO */}
        <div
          className="
            relative
            overflow-hidden
            p-6 md:p-10
            border-b border-slate-800
          "
        >

          {/* GLOW */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-cyan-500/10
              via-transparent
              to-violet-500/10
              pointer-events-none
            "
          />

          <Flex
            align="start"
            justify="between"
            direction={{ initial: "column", md: "row" }}
            className="relative gap-6"
          >

            {/* LEFT */}
            <Box className="flex-1">

              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-slate-900 border border-slate-800
                  text-cyan-400 text-sm mb-5
                "
              >
                <Sparkles size={16} />
                Premium Opportunity
              </div>

              <Heading
                size="8"
                className="
                  text-white
                  leading-tight
                  break-words
                "
              >
                {job.title}
              </Heading>

              <Flex
                wrap="wrap"
                gap="4"
                className="mt-6"
              >

                <div
                  className="
                    flex items-center gap-2
                    text-slate-300 text-sm
                  "
                >
                  <MapPin size={16} className="text-cyan-400" />
                  {job.location}
                </div>

                <div
                  className="
                    flex items-center gap-2
                    text-slate-300 text-sm
                  "
                >
                  <Briefcase
                    size={16}
                    className="text-violet-400"
                  />
                  {job.job_type}
                </div>

                <div
                  className="
                    flex items-center gap-2
                    text-slate-300 text-sm
                  "
                >
                  <FileText
                    size={16}
                    className="text-emerald-400"
                  />
                  {job.employment_type}
                </div>

              </Flex>
            </Box>

            {/* RIGHT */}
            <div className="w-full md:w-auto">
              {authUser?.role !== "admin" && (
                <ApplyDelete
                  job={job}
                  userapply={appliedUser}
                />
              )}
            </div>

          </Flex>
        </div>



        {/* COMPANY CARD */}
        <div className="p-6 md:p-10">

          <Card
            size="3"
            className="
              border border-slate-800
              bg-slate-900/70
              rounded-3xl
              shadow-xl
            "
          >

            <Flex
              align="center"
              gap="5"
              className="flex-wrap"
            >

              <Avatar
                fallback={job.company.name
                  .charAt(0)
                  .toUpperCase()}
                size="6"
                radius="full"
                src=""
              />

              <Box>

                <Text
                  size="6"
                  weight="bold"
                  className="text-white"
                >
                  {job.company.name}
                </Text>

                <Text
                  size="3"
                  className="text-slate-600"
                >
                  Trusted Employer
                </Text>

              </Box>

            </Flex>
          </Card>



          {/* DESCRIPTION */}
          <div className="mt-10">

            <Heading
              size="6"
              className="text-white mb-5"
            >
              📝 Job Description
            </Heading>

            <Text
              as="p"
              size="4"
              className="
                text-slate-300
                leading-8
              "
            >
              {job.description}
            </Text>

          </div>



          <Separator
            size="4"
            className="my-10 bg-slate-800"
          />



          {/* JOB DETAILS */}
          <div>

            <Heading
              size="6"
              className="text-white mb-6"
            >
              📌 Job Details
            </Heading>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
              "
            >

              {/* SALARY */}
              <div
                className="
                  rounded-3xl
                  border border-slate-800
                  bg-slate-900/70
                  p-5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-gradient-to-br
                      from-emerald-500
                      to-green-600
                      flex items-center justify-center
                    "
                  >
                    <IndianRupee
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Salary
                    </p>

                    <p className="text-white font-semibold">
                      ₹{job.salary.toLocaleString()}
                    </p>
                  </div>

                </div>

              </div>



              {/* EMPLOYMENT */}
              <div
                className="
                  rounded-3xl
                  border border-slate-800
                  bg-slate-900/70
                  p-5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-gradient-to-br
                      from-violet-500
                      to-indigo-600
                      flex items-center justify-center
                    "
                  >
                    <Briefcase
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Employment Type
                    </p>

                    <p className="text-white font-semibold">
                      {job.employment_type}
                    </p>
                  </div>

                </div>

              </div>



              {/* JOB TYPE */}
              <div
                className="
                  rounded-3xl
                  border border-slate-800
                  bg-slate-900/70
                  p-5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-blue-600
                      flex items-center justify-center
                    "
                  >
                    <FileText
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Job Type
                    </p>

                    <p className="text-white font-semibold">
                      {job.job_type}
                    </p>
                  </div>

                </div>

              </div>



              {/* LOCATION */}
              <div
                className="
                  rounded-3xl
                  border border-slate-800
                  bg-slate-900/70
                  p-5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-gradient-to-br
                      from-rose-500
                      to-red-600
                      flex items-center justify-center
                    "
                  >
                    <MapPin
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Location
                    </p>

                    <p className="text-white font-semibold">
                      {job.location}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>



          {/* EDIT BUTTON */}
          {authUser?.role === "admin" && (
            <div className="mt-10">
              <Editjob job={job} />
            </div>
          )}

        </div>
      </Box>
    </div>
  );
}