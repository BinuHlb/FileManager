import type { FileItem, UserItem, RoleItem, DepartmentItem } from '@/types';
import { FileType, DepartmentStatus } from '@/types';
import { 
  FileText, ImageIcon, Video, Folder as FolderIcon, Music, FileArchive, 
  FileSpreadsheet, Presentation, FileJson, FileCode, FileQuestion
} from 'lucide-react';

export const MOCK_FILES: FileItem[] = [
  {
    id: '1',
    name: 'Project Alpha Proposal.pdf',
    type: FileType.PDF,
    size: 1200000, // 1.2 MB
    lastModified: new Date('2023-10-26T10:00:00Z'),
    path: '/documents/',
    icon: FileText,
    isFavorite: true,
    owner: 'Alice',
  },
  {
    id: '2',
    name: 'Team Meeting Notes.docx',
    type: FileType.DOCUMENT,
    size: 50000, // 50 KB
    lastModified: new Date('2023-11-15T14:30:00Z'),
    path: '/documents/',
    icon: FileText,
    sharedWith: ['Bob', 'Charlie'],
    owner: 'Alice',
  },
  {
    id: '3',
    name: 'Company Logos',
    type: FileType.FOLDER,
    size: 0, // Folders might have size 0 or calculated sum
    lastModified: new Date('2023-09-01T09:00:00Z'),
    path: '/images/',
    icon: FolderIcon,
    owner: 'System',
  },
  {
    id: '4',
    name: 'Vacation Photos Summer 2023',
    type: FileType.FOLDER,
    size: 0,
    lastModified: new Date('2023-08-20T17:00:00Z'),
    path: '/images/',
    icon: FolderIcon,
    isFavorite: true,
    owner: 'Bob',
  },
  {
    id: '5',
    name: 'logo-final.png',
    type: FileType.IMAGE,
    size: 850000, // 850 KB
    lastModified: new Date('2023-09-05T11:20:00Z'),
    path: '/images/Company Logos/',
    icon: ImageIcon,
    owner: 'Alice',
  },
  {
    id: '6',
    name: 'Product Demo.mp4',
    type: FileType.VIDEO,
    size: 250000000, // 250 MB
    lastModified: new Date('2023-11-01T16:45:00Z'),
    path: '/videos/',
    icon: Video,
    owner: 'Charlie',
  },
  {
    id: '7',
    name: 'Website Backup.zip',
    type: FileType.ARCHIVE,
    size: 52428800, // 50 MB
    lastModified: new Date('2023-11-20T08:15:00Z'),
    path: '/backups/',
    icon: FileArchive,
    owner: 'System',
  },
  {
    id: '8',
    name: 'Soundtrack Ep1.mp3',
    type: FileType.AUDIO,
    size: 5200000, // 5.2 MB
    lastModified: new Date('2023-07-10T12:00:00Z'),
    path: '/audio/',
    icon: Music,
    sharedWith: ['David'],
    owner: 'Eve',
  },
   {
    id: '9',
    name: 'Quarterly Sales Report.xlsx',
    type: FileType.SPREADSHEET,
    size: 780000, // 780 KB
    lastModified: new Date('2024-01-15T09:30:00Z'),
    path: '/reports/',
    icon: FileSpreadsheet,
    owner: 'FinanceBot',
  },
  {
    id: '10',
    name: 'Investor Pitch Deck.pptx',
    type: FileType.PRESENTATION,
    size: 3200000, // 3.2 MB
    lastModified: new Date('2024-02-01T14:00:00Z'),
    path: '/presentations/',
    icon: Presentation,
    isFavorite: true,
    owner: 'Alice',
  },
  {
    id: '11',
    name: 'API Configuration.json',
    type: FileType.CODE, // or JSON specific if needed
    size: 15000, // 15 KB
    lastModified: new Date('2023-12-05T10:10:00Z'),
    path: '/config/',
    icon: FileJson,
    owner: 'DevTeam',
  },
  {
    id: '12',
    name: 'main_script.py',
    type: FileType.CODE,
    size: 8000, // 8 KB
    lastModified: new Date('2024-02-10T11:55:00Z'),
    path: '/scripts/',
    icon: FileCode,
    owner: 'Charlie',
  },
  {
    id: '13',
    name: 'unknown_file.dat',
    type: FileType.OTHER,
    size: 102400, // 100 KB
    lastModified: new Date('2023-05-03T00:00:00Z'),
    path: '/archive/legacy/',
    icon: FileQuestion,
    owner: 'System',
  },
];

export const getFileIcon = (type: FileType) => {
  switch (type) {
    case FileType.FOLDER:
      return FolderIcon;
    case FileType.DOCUMENT:
      return FileText;
    case FileType.IMAGE:
      return ImageIcon;
    case FileType.VIDEO:
      return Video;
    case FileType.AUDIO:
      return Music;
    case FileType.ARCHIVE:
      return FileArchive;
    case FileType.SPREADSHEET:
        return FileSpreadsheet;
    case FileType.PRESENTATION:
        return Presentation;
    case FileType.PDF:
        return FileText; 
    case FileType.CODE:
        return FileCode; 
    default:
      return FileQuestion;
  }
};

export const MOCK_USERS: UserItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `user-${i + 1}`,
  srNo: i + 1,
  firstName: `UserFirst${i + 1}`,
  lastName: `UserLast${i + 1}`,
  email: `user${i + 1}@example.com`,
  isActive: Math.random() > 0.3, // Roughly 70% active
}));

export const MOCK_ROLES: RoleItem[] = [
  { id: 'role-1', srNo: 1, role: 'Administrator', description: 'Full access to all system features.', isActive: true },
  { id: 'role-2', srNo: 2, role: 'Editor', description: 'Can create and modify content.', isActive: true },
  { id: 'role-3', srNo: 3, role: 'Viewer', description: 'Can only view content.', isActive: true },
  { id: 'role-4', srNo: 4, role: 'Contributor', description: 'Can submit content for review.', isActive: false },
  { id: 'role-5', srNo: 5, role: 'Moderator', description: 'Manages user-generated content.', isActive: true },
];

export const MOCK_DEPARTMENTS: DepartmentItem[] = Array.from({ length: 15 }, (_, i) => {
  const statuses = Object.values(DepartmentStatus);
  return {
    id: `dept-${i + 1}`,
    srNo: i + 1,
    name: `Department ${String.fromCharCode(65 + i)}`, // A, B, C...
    description: `This is department ${String.fromCharCode(65 + i)}. It handles various important tasks related to its specialized area of operations.`,
    isActive: Math.random() > 0.2, // Roughly 80% active
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
});
