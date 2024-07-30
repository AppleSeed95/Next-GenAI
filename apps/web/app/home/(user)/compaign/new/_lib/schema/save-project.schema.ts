import { z } from 'zod';


export const SaveProjectSchema = z
   .object({
      pUserId: z.string().uuid(),
      pName: z.string(),
      pMainTopic: z.string(),
      pSubTopic: z.string(),
      pMode: z.string(),
      pState: z.boolean(),
      pStartDate: z.string(),
      pEndDate: z.string(),
      pPlatform: z.string(),
      pPlatformurl: z.string(),
      pCnt: z.number(),
      pAtmosphere: z.string(),
      pPostMode: z.string(),
      pTitle: z.string(),
      pTextContent: z.string(),
      pGeneratedTitles: z.string(),
      pImages: z.string(),
      pImageBrand: z.string(),
      pImageFormat: z.string(),
      pImageCnt: z.number(),
      pImageRatio: z.string(),
      pUseText: z.boolean(),
      pUseImage: z.boolean(),
      pUseVideo: z.boolean(),
      pTextBrand: z.string(),
      pTextWordsCnt: z.number(),
      pTextLanguage: z.string(),
      pTextAddition: z.string(),
      pImageAddition: z.string()
   })