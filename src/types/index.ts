
import type { LucideIcon } from 'lucide-react';

export enum FileType {
  FOLDER = "Folder",
  DOCUMENT = "Document",
  IMAGE = "Image",
  VIDEO = "Video",
  AUDIO = "Audio",
  ARCHIVE = "Archive",
  SPREADSHEET = "Spreadsheet",
  PRESENTATION = "Presentation",
  PDF = "PDF",
  CODE = "Code",
  OTHER = "Other",
}

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number; // in bytes
  lastModified: Date;
  path: string;
  icon?: LucideIcon; // Optional: specific icon override
  isFavorite?: boolean;
  sharedWith?: string[]; // List of user IDs or emails
  owner?: string;
}

// User Management Types
export interface UserItem {
  id: string;
  srNo: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export interface RoleItem {
  id: string;
  srNo: number;
  role: string;
  description: string;
  isActive: boolean;
}

export enum DepartmentStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ARCHIVED = "Archived",
}

export interface DepartmentItem {
  id: string;
  srNo: number;
  name: string;
  description: string;
  isActive: boolean;
  status: DepartmentStatus;
}

// Template Management Types
export enum TemplateStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  ARCHIVED = "Archived",
}

export interface MasterTemplateItem {
  id: string;
  srNo: number;
  name: string;
  description: string;
  version: string;
  status: TemplateStatus;
  lastModified: Date;
}

export enum DocumentStatus {
  DRAFT = "Draft",
  PENDING_APPROVAL = "Pending Approval",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export interface DocumentListItem {
  id: string;
  srNo: number;
  name: string;
  templateUsed: string; // Name of the master template
  status: DocumentStatus;
  createdBy: string;
  lastModified: Date;
}

export enum ApprovalStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export interface ApprovalListItem {
  id: string;
  srNo: number;
  documentName: string;
  submittedBy: string;
  submissionDate: Date;
  status: ApprovalStatus;
  approver?: string; // Optional: who approved/rejected
}
