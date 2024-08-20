'use client'
import { Settings, DiscAlbum, Type, Image, Clapperboard, CircleCheckBig } from "lucide-react"
export interface CompaignStepIndicatorProps {
    steps: string[],
    currentStep: number,
    setCurrentStep: (v: number) => void
    useText: boolean,
    useVideo: boolean,
    useImage: boolean
}
import { WithAnimation } from "~/home/(user)/_components/animated-element"


export const CompaignStepIndicatorCpn = ({ useText, useVideo, useImage, steps, currentStep, setCurrentStep }: CompaignStepIndicatorProps) => {
    return (
        <>
            <div className="flex z-30 items-center relative justify-between w-full">
                {steps.map((a, idx) => {
                    return (
                        <WithAnimation
                            key={idx}
                            delay={0.2 * idx}
                            mode="zoom" isVisible={
                                !((idx === 2 && !useText) || (idx === 3 && !useImage) || (idx === 4 && !useVideo))
                            }>
                            <div
                                key={idx}
                                className="flex cursor-pointer text-[20px] bold shadow-lg justify-center items-center rounded-full bg-[#027538] w-[70px] h-[70px]"
                                style={idx === currentStep ?
                                    {
                                        width: '80px',
                                        height: '80px',
                                        backgroundColor: '#02ab51',
                                        transitionDuration: '500ms',
                                        color: 'white'
                                    } :
                                    { transitionDuration: '500ms', color: 'white' }
                                }
                                onClick={() => {
                                    // setCurrentStep(idx)
                                }}
                            >
                                {/* {idx + 1} */}
                                {idx === 0 && <WithAnimation mode="zoom"> <Settings /></WithAnimation>}
                                {idx === 1 && <DiscAlbum />}
                                {idx === 2 && <Type />}
                                {idx === 3 && <WithAnimation mode="zoom"> <Image /></WithAnimation>}
                                {idx === 4 && <Clapperboard />}
                                {idx === 5 && <CircleCheckBig />}
                            </div>
                        </WithAnimation>
                    )
                }
                )}
            </div >
            <WithAnimation mode="up" delay={1.0}>
                <div className="w-full z-20 relative mt-[-40px] border-[2px] border-t-[#02ab51]"></div>
            </WithAnimation>
        </>
    )
}
