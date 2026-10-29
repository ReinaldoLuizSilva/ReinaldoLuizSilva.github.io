export interface Certification {
  /** Official name, as issued (not translated). */
  name: string;
  issuer: string;
  status: 'earned' | 'in-progress';
  /** Public verification page (Credly or issuer). The link is hidden while missing. */
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    status: 'earned',
    // TODO(reinaldo): Credly link
  },
  {
    name: 'Oracle Cloud Infrastructure 2023 Certified Foundations Associate',
    issuer: 'Oracle',
    status: 'earned',
    // TODO(reinaldo): verification link
  },
  {
    name: 'Google Cloud Computing Foundations Certificate',
    issuer: 'Google Cloud',
    status: 'earned',
    // TODO(reinaldo): verification link
  },
  {
    name: 'Microsoft Azure Administrator (AZ-104)',
    issuer: 'Microsoft',
    status: 'in-progress',
  },
];
