import { Twitter, Linkedin, Mail, Github } from "lucide-react";


const Footer = () => {
    return (
        <div className='flex justify-between items-center bg-black px-10 py-4'>
            <div className=" flex gap-3 items-center text-white">
                <a
                    href="https://x.com/VishalAakash18"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-400 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-blue-400 hover:scale-105"
                >
                    <Twitter size={20} />
                </a>
                <a
                    href="https://www.linkedin.com/in/vishal-aakash"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-blue-600 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-blue-600 hover:scale-105"
                >
                    <Linkedin size={20} />
                </a>
                <a
                    href="https://github.com/vishalmet/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className=" transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-white hover:scale-105"
                >
                    <Github size={20} />
                </a>
                <a
                    href="mailto:dev.vishalaakash@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Vishal%2C%0A%0AI%20visited%20your%20portfolio%20and%20wanted%20to%20reach%20out%20to%20you.%0A%0A"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-red-500 transition-all duration-300 bg-black border border-white/[0.15] p-2 rounded-xl hover:border-red-500 hover:scale-105"
                >
                    <Mail size={20} />
                </a>
            </div>
            <p className='text-white/50'>Designed & Developed by <span className='text-white'>Vishal Aakash</span></p>
        </div>
    )
}

export default Footer