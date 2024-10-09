import React from 'react';

const ResumePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 leading-tight">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold">James B. Courson</h1>
        <span>
            <a href={`mailto:jcourson@proton.me`}>jcourson@proton.me |</a>
            <a href="https://github.com/jcourson8"> github.com/jcourson8</a> | U.S. Citizen
        </span>
      </header>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <hr className="border-t-2 border-primary my-2"/>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Auburn University, Auburn, AL</h3>
          <p className="italic">Fall 2018 - Spring 2024</p>
          <ul className="list-disc pl-5">
            <li><strong>M.S.E. in Cybersecurity Engineering</strong>, May 2024. GPA: 3.90</li>
            <li><strong>B.S.E. in Computer Science with Concentration in Mathematics</strong>, May 2022. GPA: 3.55</li>
            <li><strong>Graduate Coursework:</strong> Cloud Computing; Artificial Intelligence; Evolutionary Computing; Cybersecurity Threats and Countermeasures; Digital Forensics; Advanced Operating Systems; Software Reverse Engineering; Advanced Computer and Network Security</li>
            <li><strong>Undergraduate Coursework:</strong> Algorithms; Machine Learning; Cryptography, Data Compression; Operating Systems; Computer Networks; Graph Theory.</li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Employment</h2>
        <hr className="border-t-2 border-primary my-2"/>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Software Engineer, Military REACH Program</h3>
          <p className="italic">Fall 2023 - Current</p>
          <ul className="list-disc pl-5">
            <li><strong>Semantic Search Integration:</strong> Spearheaded the integration of AI-driven search by designing a system that leverages OpenAI embeddings in conjunction with keyword search, significantly enhancing retrieval capabilities of over 8000 documents on our production website.</li>
            <li><strong>Streamlined Content Management:</strong> Initiated and oversaw the transition to Markdown for content representation, employing Python to automate the migration of 154 static web pages to our new React/TypeScript based website. This overhaul streamlined content management and accelerated the deployment of business requirements.</li>
            <li><strong>Innovated Content Delivery System:</strong> Proposed and delivered a new content delivery system for monthly newsletters that minimized manual coordination between the development team and content authors, enhanced operational efficiency and responsiveness to business needs.</li>
          </ul>
        </div>
        {/* Add other employment sections here */}
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Technical Experience</h2>
        <hr className="border-t-2 border-primary my-2"/>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Projects</h3>
          <ul className="list-disc pl-5">
            <li><strong>Conversational Codebase</strong> (2024). A current project, written in Python, aimed at developing a conversational AI tool to simplify interactions with codebases. It employs semantic search, utilizing OpenAI generative AI models, for context-aware explanations. The project utilizes cutting edge concepts such as dependency resolutions within knowledge graphs, LLM validation with citation, and Retrieval Augmented Generation (RAG).</li>
            <li><strong>Novel CAN Intrusion Detection System</strong> (2023). Developed an advanced intrusion detection system for in-vehicle Controller Area Networks, focusing on time-based features and Long Short-Term Memory (LSTM) networks. This approach emphasizes the timing and frequency of packet transmissions and leveraged LSTM's ability to remember and analyze temporal data patterns enhancing the security against complex cyberthreats in modern vehicle communication networks.</li>
            {/* Add other projects here */}
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Additional</h2>
        <hr className="border-t-2 border-primary my-2"/>
        <ul className="list-disc pl-5">
          <li><strong>Languages:</strong> <em>Proficient:</em> Python; <em>Intermediate:</em> TypeScript; Java; <em>Competent:</em> C; Rust</li>
          <li><strong>Technologies:</strong> OpenAI API; PyTorch; Flask; LangChain; NextJS; Leptos; Git; Linux; IDA; Docker; Ansible; Openstack; Ceph; Kubernetes</li>
          <li><strong>Other:</strong> CyberCorps SFS Recipient</li>
        </ul>
      </section>
    </div>
  );
};

export default ResumePage;
