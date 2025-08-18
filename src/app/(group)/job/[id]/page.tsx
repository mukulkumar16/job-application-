



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
import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await fetch(`/api/applicants/${job?.id}`);
        const data = await res.json();
        setApplicants(data.data);
      } catch (err) {
        console.error("Failed to load applicants:", err);
      } finally {
        setIsAppModal(false);
      }
    }

    if (job) fetchApplicants();
  }, [job]);

  if (loading) return <Text>Loading...</Text>;
  if (!job) return <Text color="red">Job not found.</Text>;

  return (
    <Box className="max-w-5xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md space-y-8">
      {/* Header */}
      <Flex align="center" justify="between" wrap="wrap" className="gap-6">
        <Box>
          <Heading size="7" className="mb-2">
            {job.title}
          </Heading>
          <Text size="4" color="gray">
            📍 {job.location} • 🛠️ {job.job_type} • 💼 {job.employment_type}
          </Text>
        </Box>

        <Flex gap="4" align="center" className="mt-4 sm:mt-0">
          <ApplyDelete job={job} userapply={appliedUser} />
        </Flex>
      </Flex>

      <Separator size="4" />

      {/* Company */}
      <Card size="3" className="bg-gray-100 border rounded-lg">
        <Flex align="center" gap="4">
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
        <Heading size="5" mb="2">
          📝 Job Description
        </Heading>
        <Text as="p" size="4" color="gray">
          {job.description}
        </Text>
      </Box>

      {/* Details */}
      <Box>
        <Heading size="5" mb="2">
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
      <Box className="mt-6">
        <Editjob job={job} />
      </Box>
    </Box>
  );
}
