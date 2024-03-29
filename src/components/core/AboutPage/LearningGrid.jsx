import React from 'react'
import CTAButton from "../Homepage/Button";
import HighlightText from '../Homepage/HighlightText';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className="grid max-auto grid-cols-1 lg:grid-cols-4">
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div key={index}
                            className={`${index === 0 && "lg:col-span-2 lg:h-[250px]"}
                ${card.order % 2 === 1 ? "bg-richblack-700" : "richblack-800"}
                ${card.order === 3 && "lg:col-start-2"}

                `}
                        >

                            {
                                card.order < 0 ? (
                                    <div className="lg:w-[90%]">
                                        <div>
                                            {card.heading}
                                            <HighlightText text={card.highlightText} />
                                            <p>{card.description}</p>
                                            <div className="w-fit">
                                                <CTAButton
                                                    active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                                            </div>

                                        </div>
                                    </div>
                                ) : (
                                    <div className="lg:h-[250px] flex flex-col gap-5 items-center justify-center">
                                        <h1 className="ring-richblack-5 text-lg">{card.heading}</h1>
                                        <p className="richblack-300">{card.description}</p>
                                    </div>

                                )
                            }


                        </div>
                    )
                })
            }

        </div>
    )
}

export default LearningGrid