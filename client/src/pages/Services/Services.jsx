import "./Services.css"; // Import the CSS file for styling
import requirmentManagement from "./img/RequirementGethering.png";
import BugTracking from "./img/BugTracking.png";
import TestCaseManagement from "./img/testCase.png";
import TestExecution from "./img/testExecute.png";
import CodeReviewManagement from "./img/codeReview.png";
import TestingProcessReview from "./img/testProcess.png";
import ReportingandAnalytics from "./img/reportAnalytics.png";
import UserCollaboration from "./img/userCollab.png";
const Services = () => {
  return (
    <>
      <h1 className="Services-heading">Our Services</h1>
      <div className="services-container">
        <div className="services-column">
          <ServiceCard
            imageSrc={requirmentManagement}
            serviceName="Requirements Management"
            slogan="Streamline project requirements"
          />
          <ServiceCard
            imageSrc={TestCaseManagement}
            serviceName="Test Case Management"
            slogan="Create and organize test cases"
          />
          <ServiceCard
            imageSrc={CodeReviewManagement}
            serviceName="Code Review Management"
            slogan="Facilitate and track code reviews"
          />
          <ServiceCard
            imageSrc={ReportingandAnalytics}
            serviceName="Reporting and Analytics"
            slogan="Generate insights into project progress"
          />
        </div>

        <div className="services-column">
          <ServiceCard
            imageSrc={BugTracking}
            serviceName="Bug Tracking"
            slogan="Efficiently track and manage software defects"
          />
          <ServiceCard
            imageSrc={TestExecution}
            serviceName="Test Execution"
            slogan="Execute and record test cases"
          />
          <ServiceCard
            imageSrc={TestingProcessReview}
            serviceName="Testing Process Review"
            slogan="Review testing processes and strategies"
          />
          <ServiceCard
            imageSrc={UserCollaboration}
            serviceName="User Collaboration and Communication"
            slogan="Foster effective communication among stakeholders"
          />
        </div>
      </div>
    </>
  );
};

const ServiceCard = ({ imageSrc, serviceName, slogan }) => {
  return (
    <div className="service-card">
      <img src={imageSrc} className="service-image" />
      <h3 className="service-name">{serviceName}</h3>
      <p className="slogan">{slogan}</p>
    </div>
  );
};

export default Services;
