import { withI18n } from "~/lib/i18n/with-i18n";
import { HomeLayoutPageHeader } from "../_components/home-page-header";
import { Trans } from "@kit/ui/trans";
import { PageBody } from "@kit/ui/page";
import { Button } from "@kit/ui/button";
import { Heading } from "@kit/ui/heading";
import { FacebookIcon, TicketCheckIcon, YoutubeIcon } from "lucide-react";
import { Input } from "@kit/ui/input";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@kit/ui/card";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@kit/ui/tabs";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";


const buttonData = [
   { id: 1, label: 'Facebook', value: 'facebook' },
   { id: 2, label: 'Instagram', value: 'instagram' },
   { id: 3, label: 'LinkedIn', value: 'linkedin' },
   { id: 4, label: 'YouTube', value: 'youtube' },
   { id: 5, label: 'TikTok', value: 'tiktok' },
   { id: 6, label: 'Wordpress', value: 'wordpress' },
   { id: 7, label: 'Contao', value: 'contao' },
   { id: 8, label: 'Joomla', value: 'joomla' },
]


function PersonalProject() {
   return (
      <>
         <HomeLayoutPageHeader
            title={<Trans i18nKey={'common:platformsTabLabel'} />}
            description={<Trans i18nKey={'common:platformsTabDescription'}
            />}
         />
         <PageBody>
            <div className={'flex flex-col space-y-4 gap-8'}>
               <div className={'flex flex- row gap-2'}>
                  <Tabs defaultValue="facebook" className={'flex flex-col gap-8'}>
                     <TabsList>
                        {buttonData.map(btn => (
                           <TabsTrigger value={btn.value} children={btn.label} key={btn.id} />
                        ))}
                     </TabsList>
                     <TabsContent value="facebook">
                        <div className="flex flex-row gap-12">
                           <FacebookIcon className={'h-6 w-6'} />
                           <div className={'fex flex-col gap-6'}>
                              <Button variant={'outline'} children={'Connect via Facebook login'} />
                              <Heading level={5} children={'Autopilot-Release- Mail for checking the content '} className={'pt-12'} />
                              <div className={'flex flex-row gap-4 pt-8'}>
                                 <Input placeholder={'Mail'} />
                                 <Button variant={'outline'} children={'Update'} />
                              </div>
                              <div className={'flex flex-row gap-6 pt-8'}>
                                 <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                 </label>
                                 <Heading level={5} children={'Send email with info after successfull posting'} />
                              </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="instagram">
                        <div className="flex flex-row gap-12">
                           <InstagramLogoIcon className={'h-6 w-6'} />
                           <div className={'fex flex-col gap-6'}>
                              <Button variant={'outline'} children={'Connect via Instagram login'} />
                              <Heading level={5} children={'Autopilot-Release- Mail for checking the content '} className={'pt-12'} />
                              <div className={'flex flex-row gap-4 pt-8'}>
                                 <Input placeholder={'Mail'} />
                                 <Button variant={'outline'} children={'Update'} />
                              </div>
                              <div className={'flex flex-row gap-6 pt-8'}>
                                 <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                 </label>
                                 <Heading level={5} children={'Send email with info after successfull posting'} />
                              </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="linkedin">
                        <div className="flex flex-row gap-12">
                           <LinkedInLogoIcon className={'h-6 w-6'} />
                           <div className={'fex flex-col gap-6'}>
                              <Button variant={'outline'} children={'Connect via Linkedin login'} />
                              <Heading level={5} children={'Autopilot-Release- Mail for checking the content '} className={'pt-12'} />
                              <div className={'flex flex-row gap-4 pt-8'}>
                                 <Input placeholder={'Mail'} />
                                 <Button variant={'outline'} children={'Update'} />
                              </div>
                              <div className={'flex flex-row gap-6 pt-8'}>
                                 <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                 </label>
                                 <Heading level={5} children={'Send email with info after successfull posting'} />
                              </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="youtube">
                        <div className="flex flex-row gap-12">
                           <YoutubeIcon className={'h-6 w-6'} />
                           <div className={'fex flex-col gap-6'}>
                              <Button variant={'outline'} children={'Connect via Youtube login'} />
                              <Heading level={5} children={'Autopilot-Release- Mail for checking the content '} className={'pt-12'} />
                              <div className={'flex flex-row gap-4 pt-8'}>
                                 <Input placeholder={'Mail'} />
                                 <Button variant={'outline'} children={'Update'} />
                              </div>
                              <div className={'flex flex-row gap-6 pt-8'}>
                                 <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                 </label>
                                 <Heading level={5} children={'Send email with info after successfull posting'} />
                              </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="tiktok">
                        <div className="flex flex-row gap-12">
                           <TicketCheckIcon className={'h-6 w-6'} />
                           <div className={'fex flex-col gap-6'}>
                              <Button variant={'outline'} children={'Connect via TikTok login'} />
                              <Heading level={5} children={'Autopilot-Release- Mail for checking the content '} className={'pt-12'} />
                              <div className={'flex flex-row gap-4 pt-8'}>
                                 <Input placeholder={'Mail'} />
                                 <Button variant={'outline'} children={'Update'} />
                              </div>
                              <div className={'flex flex-row gap-6 pt-8'}>
                                 <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                 </label>
                                 <Heading level={5} children={'Send email with info after successfull posting'} />
                              </div>
                           </div>
                        </div>
                     </TabsContent>
                     <TabsContent value="wordpress">
                        <div className={'flex flex-col gap-5'}>
                           
                        </div>
                     </TabsContent>
                     <TabsContent value="contao">
                     </TabsContent>
                     <TabsContent value="joomla">
                     </TabsContent>
                  </Tabs>
               </div>

            </div>
         </PageBody>
      </>
   );
}

export default withI18n(PersonalProject);