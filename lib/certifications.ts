export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  description: string;
  skills: string[];
  verificationUrl: string;
  color: string; // brand accent color for placeholder logo
  initials: string;
}

export const certifications: Certification[] = [
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: 2024,
    description:
      "Validates expertise in designing distributed systems and scalable applications on AWS. Covers core services including EC2, S3, RDS, Lambda, and VPC networking.",
    skills: ["Cloud Architecture", "EC2", "S3", "Lambda", "VPC", "IAM"],
    verificationUrl: "https://www.credly.com/badges/placeholder",
    color: "#FF9900",
    initials: "AWS",
  },
  {
    id: "google-professional-cloud",
    name: "Professional Cloud Developer",
    issuer: "Google Cloud",
    year: 2023,
    description:
      "Demonstrates ability to build scalable and highly available applications using Google-recommended practices and tools on Google Cloud Platform.",
    skills: ["GCP", "Kubernetes", "Cloud Run", "BigQuery", "Pub/Sub"],
    verificationUrl: "https://www.credential.net/placeholder",
    color: "#4285F4",
    initials: "GCP",
  },
  {
    id: "meta-react",
    name: "Meta Front-End Developer",
    issuer: "Meta",
    year: 2023,
    description:
      "Professional certificate covering React development, UI/UX design principles, and modern front-end engineering practices.",
    skills: ["React", "JavaScript", "CSS", "Figma", "Testing"],
    verificationUrl: "https://www.coursera.org/placeholder",
    color: "#0866FF",
    initials: "META",
  },
  {
    id: "mongodb-developer",
    name: "MongoDB Associate Developer",
    issuer: "MongoDB",
    year: 2022,
    description:
      "Certification for proficiency in building modern applications with MongoDB, covering data modelling, aggregation pipelines, and performance optimisation.",
    skills: ["MongoDB", "NoSQL", "Aggregation", "Indexing", "Atlas"],
    verificationUrl: "https://www.credly.com/badges/placeholder",
    color: "#00ED64",
    initials: "MDB",
  },
  {
    id: "github-actions",
    name: "GitHub Actions Certification",
    issuer: "GitHub",
    year: 2024,
    description:
      "Validates knowledge of automating software workflows with GitHub Actions, including CI/CD pipelines, custom actions, and security best practices.",
    skills: ["CI/CD", "YAML", "Automation", "Docker", "Security"],
    verificationUrl: "https://www.credly.com/badges/placeholder",
    color: "#1F2328",
    initials: "GH",
  },
  {
    id: "terraform-associate",
    name: "Terraform Associate",
    issuer: "HashiCorp",
    year: 2022,
    description:
      "Demonstrates understanding of infrastructure as code concepts and the ability to provision, manage, and destroy infrastructure using Terraform.",
    skills: ["Terraform", "IaC", "AWS", "Azure", "State Management"],
    verificationUrl: "https://www.credly.com/badges/placeholder",
    color: "#844FBA",
    initials: "TF",
  },
];
