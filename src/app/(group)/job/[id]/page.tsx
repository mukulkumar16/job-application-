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
  Button,
} from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { useEffect, useState , useContext} from "react";
import { userContext } from "../../layout";
import { useRouter } from "next/navigation";

import { User } from "../../../../../generated/prisma";

import ApplyJob from "@/app/component/ApplyJob";
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
  const [isAppModal, setIsAppModal] = useState<boolean>(false);
  const [applicants, setApplicants] = useState<User[]>([]);
  const [appliedUser, setAppliedUser] = useState(false);

  const { id } = useParams();

  const userContextValue = useContext(userContext);
  const authUser = userContextValue.user;
  const router = useRouter();



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
        router.refresh();
      }
    }
    fetchJob();
  }, [id]);


  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await fetch(`/api/application/${job?.id}`);
        const data = await res.json();
        setApplicants(data.data);
      } catch (err) {
        console.error("Failed to load applicants:", err);
      } finally {
        setIsAppModal(false);
        router.refresh();
      }
    }

    if (job) fetchApplicants();
  }, [job]);

  console.log("user from " , authUser)
  if (loading) return <div className="h-screen w-screen flex  items-center justify-center">Loading...</div>;
  if (!job) return <Text className="h-screen w-screen flex  items-center justify-center" color="red">Job not found.</Text>;

  // console.log("datadata :" , applicants);

  return (
    <Box className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-10 bg-white rounded-xl shadow-lg space-y-8">
      {/* Top Section */}
      <Flex
        align="start"
        justify="between"
        direction={{ initial: "column", md: "row" }}
        className="gap-4"
      >
        <Box>
          <Heading size="7" className="mb-2 text-wrap break-words">
            {job.title}
          </Heading>
          <Text size="4" color="gray">
            📍 {job.location} • 🛠️ {job.job_type} • 💼 {job.employment_type}
          </Text>
        </Box>

        <Flex gap="4" align="center" className="flex-wrap">
          {!authUser?.role === "admin" && <ApplyDelete job={job} userapply={appliedUser} />}
        </Flex>
      </Flex>

      <Separator size="4" />

      {/* Company Card */}
      <Card size="3" className="bg-gray-100 border rounded-lg">
        <Flex align="center" gap="4" className="flex-wrap">
          <Avatar
            fallback={job.company.name.charAt(0).toUpperCase()}
            size="5"
            radius="full"
            src=""
          />
          <Box>
            <Text size="5" weight="bold">
              {job.company.name}
            </Text>
            <Text size="3" color="gray">
              Trusted Employer
            </Text>
          </Box>
        </Flex>
      </Card>

      {/* Job Description */}
      <Box>
        <Heading size="5" className="mb-2">
          📝 Job Description
        </Heading>
        <Text as="p" size="4" color="gray" className="leading-relaxed">
          {job.description}
        </Text>
      </Box>

      {/* Job Details */}
      <Box>
        <Heading size="5" className="mb-2">
          📌 Job Details
        </Heading>
        <Flex direction="column" gap="3" className="text-[16px]">
          <Text>
            <strong>💰 Salary:</strong> ₹{job.salary.toLocaleString()}
          </Text>
          <Text>
            <strong>📄 Employment Type:</strong> {job.employment_type}
          </Text>
          <Text>
            <strong>🔧 Job Type:</strong> {job.job_type}
          </Text>
          <Text>
            <strong>📍 Location:</strong> {job.location}
          </Text>
        </Flex>
      </Box>

      {/* Edit Button */}
      <Box className="pt-6">
        { authUser?.role === "admin" && <Editjob job={job} />}
      </Box>
      {/* <div className="bg-green-400 hover:bg-green-600 p-2 w-25 rounded ">
        apply job 
      </div> */}
      {/* <ApplyDelete  job={job} userapply={authUser} /> */}
    </Box>
  );
}
