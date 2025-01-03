import React, { useEffect, useRef, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

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
                        duration: 200,
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
                        duration: 200,
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
                className="faq-question relative font-serif text-[#000000]"
            >
                <summary
                    className="flex cursor-pointer items-center justify-between text-lg font-medium md:text-xl"
                    onClick={() => setOpen(!open)}
                >
                    {/*Add question*/}
                    {item.question}
                    {/*Add arrow*/}
                    <span
                        className={`flip ${open ? 'arrow-open' : 'arrow-close'}`}
                    >
                        <IconChevronDown className="h-5 w-5" />
                    </span>
                </summary>
                <p className="content pb-2 pt-4 text-base md:text-lg">
                    {/*Add each answer*/}
                    {item.answers.map((answer, index) => (
                        <span key={index} className="">
                            {answer}
                        </span>
                    ))}
                </p>
            </details>
            <div className="faq-question-bottom mb-6 mt-2 h-[2px] w-full rounded-full bg-[#000000] opacity-25 md:mt-4" />
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
