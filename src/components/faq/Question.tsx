import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IconChevronDown } from '@tabler/icons-react';
import train_faq from '../../../public/train_faq.svg';
import ticket_1 from '../../../public/ticket_line_1.svg';
import ticket_2 from '../../../public/ticket_line_2.svg';

interface QuestionProps {
    // Expects one question item that contains a question and a list of answers
    item: { question: string; answers: string[] };
}

const QuestionItem: React.FC<QuestionProps> = ({ item }) => {
    // Item initially not open
    const [open, setOpen] = useState(false);
    // Ref to <details> element
    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        class AccordionAnimation {
            el: HTMLDetailsElement;
            summary: HTMLElement;
            content: HTMLElement;
            animation: Animation | null;
            isClosing: boolean;
            isExpanding: boolean;

            constructor(el: HTMLDetailsElement) {
                // Stores the <details> element
                this.el = el;
                // Finds the <summary> element inside <details> and stores it
                this.summary = el.querySelector('summary')!;
                // Finds the <div class="content"> element inside <details> and stores it
                this.content = el.querySelector('.content')!;

                // Store animation for use (e.g., canceling animations)
                this.animation = null;
                // Stores if element is closing
                this.isClosing = false;
                // Stores if element is expanding
                this.isExpanding = false;
                // Detects when user clicks on <summary> element
                this.summary.addEventListener('click', (e) => this.onClick(e));
            }

            onClick(e: Event) {
                // Stop browser's default behavior
                e.preventDefault();
                // Stop content overflow
                this.el.style.overflow = 'hidden';
                // Open element if the object is closing or is already closed
                if (this.isClosing || !this.el.open) {
                    this.open();
                    // Close element if the object is opening or is already open
                } else if (this.isExpanding || this.el.open) {
                    this.shrink();
                }
            }

            shrink() {
                // The element is being closed
                this.isClosing = true;

                // Store the current height
                const startHeight = `${this.el.offsetHeight}px`;
                // Find and store final/shrinked height
                const endHeight = `${this.summary.offsetHeight}px`;

                // Cancel current animation if exists
                if (this.animation) {
                    this.animation.cancel();
                }

                // Animate shrinking from start height -> end height
                this.animation = this.el.animate(
                    {
                        height: [startHeight, endHeight],
                    },
                    {
                        duration: 250,
                        easing: 'ease-out',
                    },
                );

                // Call onAnimationFinish() when animation completes
                this.animation.onfinish = () => this.onAnimationFinish(false);
                // If shrinking animation is canceled, fix isClosing variable
                this.animation.oncancel = () => (this.isClosing = false);
            }

            open() {
                // Apply a fixed height to element
                this.el.style.height = `${this.el.offsetHeight}px`;
                // Set open state to true
                this.el.open = true;
                // Wait for next frame to call expand function -- keeps animation smooth
                window.requestAnimationFrame(() => this.expand());
            }

            expand() {
                // The element is expanding
                this.isExpanding = true;

                // Store the current height
                const startHeight = `${this.el.offsetHeight}px`;
                // Find and store final/expanded height
                const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

                // Cancel current animation if exists
                if (this.animation) {
                    this.animation.cancel();
                }

                // Animate expanding from start height -> end height
                this.animation = this.el.animate(
                    {
                        height: [startHeight, endHeight],
                    },
                    {
                        duration: 250,
                        easing: 'ease-out',
                    },
                );

                // Call onAnimationFinish() when animation completes
                this.animation.onfinish = () => this.onAnimationFinish(true);
                // If expanding animation is canceled, fix isExpanding variable
                this.animation.oncancel = () => (this.isExpanding = false);
            }

            onAnimationFinish(open: boolean) {
                // Set the open attribute based on parameter
                this.el.open = open;
                // Clear stored animation since it's over
                this.animation = null;
                // Reset isClosing & isExpanding
                this.isClosing = false;
                this.isExpanding = false;
                // Remove overflow hidden and fixed height
                this.el.style.height = this.el.style.overflow = '';
            }
        }

        // If there's a valid ref to <details> element, create new instance of AccordionAnimation
        if (detailsRef.current) {
            new AccordionAnimation(detailsRef.current);
        }
    }, []);

    return (
        <>
            <details
                ref={detailsRef}
                className={`faq-question relative mb-10 flex flex-col rounded-3xl font-poppins text-[#292254]`}
            >
                <summary
                    className={`flex cursor-pointer items-center rounded-t-3xl bg-[#F5BFE4] text-xl font-medium ${open ? '' : 'rounded-b-3xl transition-all delay-[170ms]'}`}
                    onClick={() => setOpen(!open)}
                >
                    <Image
                        src={train_faq}
                        alt="Prizes"
                        className="my-3 ml-10 mr-10 h-9 w-auto"
                    />
                    {/*Add question*/}
                    {item.question}
                    {/*Add arrow*/}
                    <span
                        className={`flip ml-auto ${open ? 'arrow-open' : 'arrow-close'}`}
                    >
                        <IconChevronDown className="mr-6 h-10 w-10" />
                    </span>
                </summary>
                <div
                    className={`content flex bg-white ${open ? 'rounded-b-3xl' : 'rounded-b-3xl'}`}
                >
                    {/*Add each answer*/}
                    <p className="my-2 ml-10 w-7/12 pb-2 pt-4 text-lg">
                        {item.answers.map((answer, index) => (
                            <span key={index} className="">
                                {answer}
                            </span>
                        ))}
                    </p>
                    <Image src={ticket_1} alt="Prizes" className="ml-10" />
                    <Image src={ticket_2} alt="Prizes" className="ml-auto" />
                </div>
            </details>
            {/*Animate up/down arrows*/}
            <style jsx>{`
                .arrow-open {
                    animation: flip-icon 0.25s ease-in-out;
                    transform: rotateX(180deg);
                }

                .arrow-close {
                    animation: flip-icon-close 0.25s ease-in-out;
                    transform: rotateX(0deg);
                }

                @keyframes flip-icon {
                    0% {
                        transform: rotateX(0deg);
                    }
                    100% {
                        transform: rotateX(180deg);
                    }
                }

                @keyframes flip-icon-close {
                    0% {
                        transform: rotateX(180deg);
                    }
                    100% {
                        transform: rotateX(0deg);
                    }
                }
            `}</style>
        </>
    );
};

export default QuestionItem;
