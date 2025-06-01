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
