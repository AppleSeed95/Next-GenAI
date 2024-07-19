'use client'
import { Settings, DiscAlbum, Type, Image, Clapperboard, CircleCheckBig } from "lucide-react"
export interface CompaignStepIndicatorProps {
    steps: string[],
    currentStep: number,
    setCurrentStep: (v: number) => void
}

export const CompaignStepIndicatorCpn = ({ steps, currentStep, setCurrentStep }: CompaignStepIndicatorProps) => {
    return (
        <>
            <div className="flex items-center justify-between w-full">
                {steps.map((a, idx) =>
                    <div
                        className="flex cursor-pointer hover:bg-[#02ab51] hover:w-[80px] hover:h-[80px] duration-500 text-[20px] bold shadow-lg justify-center items-center rounded-full bg-[#027538] w-[70px] h-[70px]"
                        style={idx === currentStep ? {
                            width: '80px',
                            height: '80px',
                            backgroundColor: '#02ab51'
                        } : {}}
                        onClick={() => {
                            // setCurrentStep(idx)
                        }}
                    >
                        {/* {idx + 1} */}
                        {idx === 0 && <Settings />}
                        {idx === 1 && <DiscAlbum />}
                        {idx === 2 && <Type />}
                        {idx === 3 && <Image />}
                        {idx === 4 && <Clapperboard />}
                        {idx === 5 && <CircleCheckBig />}
                    </div>
                )}
            </div>
            <div className="w-full mt-[-40px] border-[2px] border-t-[#02ab51]"></div>
        </>
    )
}
