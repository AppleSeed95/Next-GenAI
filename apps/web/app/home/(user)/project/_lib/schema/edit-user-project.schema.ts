import { z } from 'zod';


export const EditProjectSchema = z
   .object({
      id: z.number(),
      projectName: z.string().nullable(),
      topic: z.string(),
   })
export const UpdateProjectSchema = z
   .object({
      id: z.number(),
      pName: z.string().nullable(),
      pMainTopic: z.string().nullable(),
      pSubTopic: z.string().nullable(),
      pMode: z.string().nullable(),
      pState: z.boolean().nullable(),
      pStartDate: z.string().nullable(),
      pEndDate: z.string().nullable(),
      pPlatform: z.string().nullable(),
      pPlatformurl: z.string().nullable(),
      pCnt: z.number().nullable(),
      pAtmosphere: z.string().nullable(),
      pPostMode: z.string().nullable(),
      pTitle: z.string().nullable(),
      pTextContent: z.string().nullable(),
      pGeneratedTitles: z.string().nullable(),
      pImages: z.string().nullable(),
      pImageBrand: z.string().nullable(),
      pImageFormat: z.string().nullable(),
      pImageCnt: z.number().nullable(),
      pImageRatio: z.string().nullable(),
      pUseText: z.boolean().nullable(),
      pUseImage: z.boolean().nullable(),
      pUseVideo: z.boolean().nullable(),
      pVideo: z.string().nullable()
   })