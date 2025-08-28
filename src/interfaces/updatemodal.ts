export interface UpdateModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSave: (description: string, category: string) => void;
  initialDescription: string;
  initialCategory: string;
}
