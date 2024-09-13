import React, { useState, useEffect, createContext, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import Spinner from '../../Shared/Spinner/Spinner';
import '../../../styles.css';


// Create a context for the services
const ServicesContext = createContext();

const services = [
  {
    id: 1,
    title: 'Billing',
    description: `
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Our Billing Process</h2>
      <ol class="list-decimal pl-6 space-y-4">
        <li class="mb-4">
          <span class="font-semibold">Patient Registration and Insurance Verification:</span> We begin by gathering accurate patient information and verifying insurance coverage. This step lays the foundation for a seamless billing process.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Medical Coding:</span> Our certified coders meticulously translate medical procedures and diagnoses into appropriate codes, ensuring alignment with industry standards. This step is pivotal for proper reimbursement.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Claim Generation:</span> Using advanced billing software, we generate comprehensive claims that include all relevant codes, patient information, and procedure details. Our attention to detail minimizes the risk of claim denials.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Claims Submission:</span> We submit claims electronically to insurance companies, expediting the processing time. Our familiarity with various insurance portals ensures a smooth submission process.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Denial Prevention and Management:</span> Our proactive approach includes conducting thorough reviews of claims before submission to identify potential issues. If a claim is denied, we promptly analyze the reason and take corrective measures for resubmission.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Payment Posting and Reconciliation:</span> As payments are received, we accurately post them to individual patient accounts. Our reconciliation process ensures that payments match the expected amounts.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Patient Invoicing and Statements:</span> Patients receive clear and detailed invoices that explain the services rendered, the amounts billed, and any applicable insurance adjustments. We also manage patient statements and inquiries.
        </li>
        <li>
          <span class="font-semibold">Reporting and Analytics:</span> Through insightful reports, you gain a comprehensive view of your practice's financial performance. These reports highlight key metrics, trends, and areas for improvement.
        </li>
      </ol>
    `,
  },
  {
    id: 2,
    title: 'Coding',
    description: `
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Our Medical Coding Process</h2>
      <ol class="list-decimal pl-6 space-y-4">
        <li class="mb-4">
          <span class="font-semibold">Medical Coding:</span> Medical coding is a critical process that involves translating complex medical procedures, diagnoses, and services into standardized codes. These codes serve as a universal language that helps healthcare providers, insurance companies, and regulatory agencies understand and process medical information consistently and accurately.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Certified Medical Coders:</span> At Abad IQ, our certified medical coders are highly trained professionals with a deep understanding of medical terminology, anatomy, and healthcare procedures. They meticulously review patient medical records, extracting pertinent information and assigning the appropriate alphanumeric codes to each service provided. These codes are essential for documentation, billing, and reimbursement purposes.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Standardized Coding Systems:</span> Medical coding relies on established code sets such as the Current Procedural Terminology (CPT) code set, which defines medical procedures and services performed by healthcare providers. The International Classification of Diseases (ICD) codes capture diagnoses and health conditions. Additionally, the Healthcare Common Procedure Coding System (HCPCS) covers supplies, equipment, and other services not included in CPT.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Accuracy and Compliance:</span> Each code reflects specific details about the medical service, including its nature, complexity, and any associated conditions. Accurate coding ensures that medical services are appropriately documented and billed, facilitating transparent communication between healthcare providers and insurance companies. It also aids in preventing fraud, maintaining compliance with regulations, and promoting consistent data analysis.
        </li>
        <li>
          <span class="font-semibold">Impact on Reimbursement:</span> In the medical billing process, precise coding is crucial for proper reimbursement. The coded information is included in insurance claims submitted to payers. Our team's commitment to accuracy and compliance guarantees that each code accurately represents the medical service provided, contributing to a seamless billing process and optimal financial outcomes for both patients and healthcare organizations.
        </li>
      </ol>
    `,
  },
  {
    id: 3,
    title: 'RCM',
    description: `
      <h2 class="text-3xl font-semibold text-purple-600 mb-4">Streamlining the Revenue Cycle</h2>
      <p class="mb-4">
        At Abad IQ, we specialize in comprehensive Revenue Cycle Management (RCM) services that optimize the financial performance of healthcare practices. Our RCM process encompasses every stage of the patient's journey, from appointment scheduling to final payment collection.
      </p>
      <ol class="list-decimal pl-6 space-y-4">
        <li class="mb-4">
          <span class="font-semibold">Appointment Scheduling:</span> The RCM process begins with efficient appointment scheduling and patient registration. Accurate collection of patient data and insurance information sets the groundwork for a smooth financial journey.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Eligibility Verification:</span> Before providing services, we verify patient insurance coverage and eligibility. This step ensures that services are covered, minimizing claim denials and reducing payment delays.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Claims Submission:</span> Our team uses advanced billing software to generate and submit accurate claims to insurance companies. Thorough documentation and coding help expedite claim processing and reimbursement.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Denial Management:</span> In the event of claim denials, we analyze the reasons and take corrective actions for resubmission. Our proactive approach maximizes the chances of successful claim processing.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Payment Posting:</span> We accurately post payments and reconcile them with expected amounts. This meticulous process ensures proper financial tracking and prevents revenue leakage.
        </li>
        <li class="mb-4">
          <span class="font-semibold">Patient Invoicing:</span> Patients receive transparent and detailed invoices that explain services rendered, amounts billed, and insurance adjustments. Clear communication fosters trust and timely payments.
        </li>
        <li>
          <span class="font-semibold">Reporting and Analytics:</span> Through insightful reports, we provide a comprehensive view of your practice's financial performance. These reports highlight key metrics, trends, and areas for improvement.
        </li>
      </ol>
    `,
  },
];

const Service = ({ title, description, isOpen, toggleOpen }) => (
    <div className="service-item mb-4 p-4 border rounded-lg shadow-lg">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <h3 className="text-2xl font-semibold text-purple-600">{title}</h3>
        <span className="text-xl">{isOpen ? '-' : '+'}</span>
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div className="text-left text-gray-700 mt-4" dangerouslySetInnerHTML={{ __html: description }} />
      </CSSTransition>
    </div>
  );
  
  const ServicesProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [openServiceId, setOpenServiceId] = useState(null);
  
    useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);
  
    const toggleOpen = (id) => {
      setOpenServiceId(openServiceId === id ? null : id);
    };
  
    return (
      <ServicesContext.Provider value={{ loading, openServiceId, toggleOpen }}>
        {children}
      </ServicesContext.Provider>
    );
  };
  
  const Services = () => {
    const { loading, openServiceId, toggleOpen } = useContext(ServicesContext);
  
    return (
      <section id="services" className="services py-12 bg-gray-50">
        <h4 className="miniTitle text-center text-4xl font-bold text-purple-600 mb-8">SERVICES</h4>
        {loading ? (
          <div className="spinner text-center"><Spinner /></div>
        ) : (
          <div className="container mx-auto px-4">
            {services.map(service => (
              <Service 
                key={service.id} 
                title={service.title} 
                description={service.description} 
                isOpen={openServiceId === service.id}
                toggleOpen={() => toggleOpen(service.id)}
              />
            ))}
          </div>
        )}
      </section>
    );
  };
  
  export default function ServicesContainer() {
    return (
      <ServicesProvider>
        <Services />
      </ServicesProvider>
    );
  }
  