import React from 'react';
import { Camera, Code2, Smartphone, Megaphone, MonitorPlay, PenTool, Film, CheckCircle, Palette } from 'lucide-react';
import { SiHtml5, SiJavascript, SiPython, SiCplusplus, SiReact } from 'react-icons/si';
import { FaCss3Alt, FaMicrosoft, FaGoogle } from 'react-icons/fa';
import './About.css';

const iconMap = {
  'Social Media Management': <Smartphone size={14} />,
  'UGC Content Creation': <Camera size={14} />,
  'Content Planning & Strategy': <Megaphone size={14} />,
  'Short-Form Video Editing': <MonitorPlay size={14} />,
  'Canva': <Palette size={14} />,
  'CapCut': <Film size={14} />,
  'Web Design': <PenTool size={14} />,
  'HTML5': <SiHtml5 size={14} />,
  'CSS': <FaCss3Alt size={14} />,
  'JavaScript': <SiJavascript size={14} />,
  'React': <SiReact size={14} />,
  'Python': <SiPython size={14} />,
  'C++': <SiCplusplus size={14} />,
  'Microsoft Office': <FaMicrosoft size={14} />,
  'Google Workspace': <FaGoogle size={14} />
};

export function About({ portfolio }) {
  return (
    <section id="about" className="about section">
      <h2>ABOUT ME</h2>
      <div className="about-grid">
        <div className="about-left">
          <p>{portfolio.intro}</p>
          <p>My background in IT gives me a practical technical foundation, while content creation has strengthened my creative direction and digital storytelling skills.</p>
        </div>
        <div className="about-right">
          <div className="skills-group">
            <h3><Camera size={18} /> Content Creation</h3>
            <div className="chips">
              {portfolio.skills.content.map(s => (
                <span key={s}>
                  {iconMap[s] || <CheckCircle size={14} />} {s}
                </span>
              ))}
            </div>
          </div>
          <div className="skills-group">
            <h3><Code2 size={18} /> Web & Tech</h3>
            <div className="chips">
              {portfolio.skills.tech.map(s => (
                <span key={s}>
                  {iconMap[s] || <CheckCircle size={14} />} {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
