import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import QuantumAlgorithmList from './components/QuantumAlgorithmList';

/* ==========================================================================
   DATA MATRIX: QUANTUM ALGORITHMS SOURCE
   ========================================================================== */
const quantumAlgorithms = [
  { id: 1, name: "QAOA", purpose: "Purpose: Approximate Optimization for Combinatorial Problems", usedInAI: true, isPracticalToday: true, note: "Explored for optimization layers in hybrid quantum-classical models." },
  { id: 2, name: "HHL", purpose: "Purpose: Solving Systems of Linear Equations", usedInAI: true, isPracticalToday: false, note: "Theoretically promising but currently limited by hardware depth requirements." },
  { id: 3, name: "Grover's Algorithm", purpose: "Purpose: Quadratic Speedup for Unstructured Search", usedInAI: true, isPracticalToday: "partially", note: "Conceptually applied to search and optimization; practical impact still emerging." },
  { id: 4, name: "Quantum Phase Estimation", purpose: "Purpose: Estimating Eigenvalues of Unitary Operators", usedInAI: false, isPracticalToday: false, note: "Foundational subroutine, more indirect relevance to AI workflows." },
  { id: 5, name: "Shor's Algorithm", purpose: "Purpose: Factoring Integers", usedInAI: false, isPracticalToday: false, note: "Primarily relevant for cryptography; not directly applied in AI contexts." },
  { id: 6, name: "Variational Quantum Eigensolver", purpose: "Purpose: Finding Ground State Energies of Molecular Systems", usedInAI: true, isPracticalToday: "partially", note: "Applied in quantum chemistry and materials science; potential for AI integration." },
  { id: 7, name: "Quantum Machine Learning", purpose: "Purpose: Integrating Quantum Computing with Machine Learning", usedInAI: true, isPracticalToday: "partially", note: "An emerging field with potential for significant impact in AI." },
  { id: 8, name: "Quantum Annealing", purpose: "Purpose: Optimization through Quantum Fluctuations", usedInAI: true, isPracticalToday: "partially", note: "Used in solving optimization problems; potential for AI applications." },
  { id: 10, name: "Quantum Simulation", purpose: "Purpose: Simulating Quantum Systems", usedInAI: true, isPracticalToday: "partially", note: "Used in modeling complex quantum phenomena; potential for AI applications." },
  { id: 11, name: "Quantum Error Correction", purpose: "Purpose: Protecting Quantum Information from Errors", usedInAI: true, isPracticalToday: "partially", note: "Essential for scalable quantum computing; important for AI applications." },
  { id: 12, name: "Quantum Communication", purpose: "Purpose: Secure Information Transfer Using Quantum Properties", usedInAI: true, isPracticalToday: "partially", note: "Used in developing secure communication protocols; potential for AI applications." },
  { id: 13, name: "Quantum Cryptography", purpose: "Purpose: Secure Communication Using Quantum Properties", usedInAI: true, isPracticalToday: "partially", note: "Used in developing secure communication protocols; potential for AI applications." },
  { id: 14, name: "Quantum Information Theory", purpose: "Purpose: Understanding Fundamental Principles of Quantum Information", usedInAI: true, isPracticalToday: "partially", note: "Provides theoretical foundation for quantum algorithms; potential for AI applications." },
  { id: 15, name: "Quantum Algorithm Design", purpose: "Purpose: Developing New Quantum Algorithms", usedInAI: true, isPracticalToday: "partially", note: "Ongoing research area with potential for future AI applications." },
  { id: 16, name: "Quantum Algorithm Implementation", purpose: "Purpose: Implementing Quantum Algorithms on Actual Hardware", usedInAI: true, isPracticalToday: "partially", note: "Critical for translating theoretical algorithms into practical applications." },
  { id: 17, name: "Quantum Algorithm Analysis", purpose: "Purpose: Analyzing Performance and Complexity of Quantum Algorithms", usedInAI: true, isPracticalToday: "partially", note: "Important for evaluating the effectiveness of quantum algorithms in AI applications." },
  { id: 18, name: "Quantum Algorithm Optimization", purpose: "Purpose: Optimizing Quantum Algorithms for Better Performance", usedInAI: true, isPracticalToday: "partially", note: "Focuses on improving the efficiency and scalability of quantum algorithms for AI applications." },
  { id: 19, name: "Deutsch-Jozsa Algorithm", purpose: "Purpose: Determining if a Function is Constant or Balanced", usedInAI: false, isPracticalToday: false, note: "Primarily a theoretical algorithm demonstrating quantum advantage; limited direct AI relevance." }
];

function App() {
  return (
    <>
      <section id="center">
        {/* Logo Branding Container */}
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        {/* Heading Title Block */}
        <div>
          <h1 className="page-title" data-text="Quantum Algorithms for AI">
            Quantum Algorithms for AI
          </h1>
          <QuantumAlgorithmList algorithms={quantumAlgorithms} />
        </div>
      </section>

      {/* Spacer */}
      <div id="spacer"></div>
    </>
  );
}

export default App;