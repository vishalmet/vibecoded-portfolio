import { Card, CardContent } from "@/components/ui/card";
import { Meteors } from "@/components/ui/meteors";
import { Twitter, Linkedin, Mail, CircleArrowRight, Github, Earth, Activity } from "lucide-react";

const About = () => {
    return (
        <div className=" bg-black flex justify-center items-center">
            <div className=" space-y-3 md:space-y-0 md:gap-2 md:flex items-center h-auto m-4 my-10 md:m-10 md:my-24">
                <Card className=" text-white max-w-[650px] ">
                    <CardContent className=" space-y-3 md:space-y-6">
                        <div className=" md:flex gap-6 justify-between">
                            <div className="">
                                <p>Hey, I'm Vishal Aakash.</p>
                                <p className=" text-sm text-white/60">
                                    Web3 Frontend Developer / MERN Stack Developer
                                </p>
                            </div>
                            <div className=" flex gap-3 items-center">
                                <a
                                    href="https://x.com/VishalAakash18"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-blue-400 hover:scale-105"
                                >
                                    <Twitter size={20} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/vishal-aakash"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-blue-600 hover:scale-105"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                    href="https://github.com/vishalmet/"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-blue-600 hover:scale-105"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                    href=""
                                    rel="noopener noreferrer"
                                    className="hover:text-red-500 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-red-500 hover:scale-105"
                                >
                                    <Mail size={20} />
                                </a>
                            </div>
                        </div>
                        <p className=" md:text-xl font-light">
                            Full-stack developer (MERN) with a focus on <span className=" bricolage-font italic font-semibold">building user-friendly front-ends</span> using ReactJS (Vite), NextJS, and Tailwind CSS.
                        </p>
                        <p className="text-sm md:text-base text-white/60">
                            Building decentralized solutions at{' '}
                            <a
                                className="text-white/90 hover:underline hover:cursor-pointer"
                                href="https://winks.fun"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @winksdotfun
                            </a>{' '}
                            and{' '}
                            <a
                                className="text-white/90 hover:underline hover:cursor-pointer"
                                href="https://caddy.finance"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @caddyfinance
                            </a>.
                        </p>
                    </CardContent>
                </Card>

                <div className="">
                    <div className=" w-full relative min-w-[300px]">
                        <Card className="absolute inset-0 h-full w-full transform scale-[0.80] rounded-full blur-3xl" />
                        <div className="relative bg-[#121212] h-full overflow-hidden rounded-3xl p-6 md:p-10 border border-white/[0.15] shadow-inner hover:shadow-amber-500/50 transition-all duration-300">
                            <div className=" relative z-50 text-white text-2xl flex items-center mb-3">
                                <div className="">
                                    <p className=" text-white/60 flex items-center gap-1">
                                        <Earth size={20} className=" text-gray-500" />Based in
                                    </p>
                                    <p className=" italic bricolage-font">Chennai, India</p>
                                </div>
                            </div>
                            <div className=" relative z-50 text-white text-2xl flex items-center mb-3">
                                <div className="">
                                    <p className=" text-white/60 flex items-center gap-1">
                                        <Activity size={20} className=" text-gray-500" />Actively looking for
                                    </p>
                                    <p className=" italic bricolage-font">Full-time roles</p>
                                </div>
                            </div>
                            <div className="group transition-all duration-300 bg-black border border-white/[0.15] p-2 px-4 w-fit rounded-xl hover:border-white/30 hover:scale-105 text-white">
                                <span className="flex items-center gap-2">
                                    Get in touch
                                    <CircleArrowRight size={20} className="transition-transform duration-300 group-hover:-rotate-30" />
                                </span>
                            </div>
                            <Meteors number={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
