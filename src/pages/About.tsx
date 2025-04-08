import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin, Mail, CircleArrowRight, Github } from "lucide-react";

const About = () => {
    return (
        <div className="lg:min-h-screen bg-gradient-to-t from-black via-black to-gray-900 flex justify-center items-center">
            <Card className=" text-white max-w-[650px]">
                <CardContent className=" space-y-6">
                    <div className=" flex gap-6 justify-between">
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
                    <p className=" text-xl font-semibold">
                        Full-stack developer (MERN) with a focus on building user-friendly front-ends using ReactJS (Vite), NextJS, and Tailwind CSS.
                    </p>
                    <p className="text-white/60">
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
                    <div className="group transition-all duration-300 bg-black border border-white/[0.15] p-4 w-fit rounded-xl hover:border-white/30 hover:scale-105">
                        <span className="flex items-center gap-2">
                            Get in touch
                            <CircleArrowRight className="transition-transform duration-300 group-hover:-rotate-30" />
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default About;
