/* eslint-disable @typescript-eslint/ban-ts-comment */
import { db } from "@/db";
import { reports } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getReports = async (kindeId: string) => {
  return await db
    .select()
    .from(reports)
    .where(eq(reports.kindeId, kindeId))
    // @ts-ignore
    .orderBy(reports.generatedAt, "desc");
};

export const generateReport = async (data: {
  kindeId: string;
  startDate: string;
  endDate: string;
  format: "PDF" | "CSV" | "EXCEL";
}) => {
 
  const reportUrl = await generateAndUploadReport(data); 

  return await db.insert(reports)
  // @ts-ignore
  .values({
    ...data,
    url: reportUrl,
    generatedAt: new Date()
  });
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function generateAndUploadReport(data: {
  kindeId: string;
  startDate: string;
  endDate: string;
  format: "PDF" | "CSV" | "EXCEL";
}) {
  
  return " ";
}