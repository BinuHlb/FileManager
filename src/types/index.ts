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
