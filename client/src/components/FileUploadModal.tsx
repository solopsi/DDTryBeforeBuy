import { useState, useCallback } from "react";
import styled from "styled-components";
import { Modal } from "vienna-ui/dist/Modal";
import { Button } from "vienna-ui/dist/Button";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContainer = styled.div`
  padding: 24px;
  min-width: 500px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: hsl(0 0% 8%);
  margin: 0 0 24px 0;
`;

const UploadArea = styled.div<{ $isDragOver: boolean }>`
  border: 2px dashed ${props => props.$isDragOver ? 'hsl(45 100% 50%)' : 'hsl(0 0% 80%)'};
  border-radius: 8px;
  background: ${props => props.$isDragOver ? 'hsl(45 100% 98%)' : 'hsl(0 0% 99%)'};
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 24px;
  
  &:hover {
    border-color: hsl(45 100% 60%);
    background: hsl(45 100% 99%);
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  color: hsl(0 0% 64%);
  margin-bottom: 16px;
`;

const UploadText = styled.p`
  color: hsl(0 0% 45%);
  font-size: 16px;
  margin: 0 0 8px 0;
`;

const UploadSubtext = styled.p`
  color: hsl(0 0% 64%);
  font-size: 14px;
  margin: 0;
`;

const FilesList = styled.div`
  margin-bottom: 24px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: hsl(0 0% 98%);
  border: 1px solid hsl(0 0% 93%);
  border-radius: 6px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FileName = styled.span`
  color: hsl(0 0% 8%);
  font-size: 14px;
`;

const FileSize = styled.span`
  color: hsl(0 0% 64%);
  font-size: 12px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: hsl(0 100% 67%);
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
  
  &:hover {
    color: hsl(0 100% 50%);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid hsl(0 0% 93%);
`;

const HiddenInput = styled.input`
  display: none;
`;

export default function FileUploadModal({ isOpen, onClose }: FileUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const isValidType = file.type === 'application/vnd.ms-excel' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                         file.type === 'text/csv';
      const isValidExtension = /\\.(xlsx|xls|csv)$/i.test(file.name);
      return isValidType || isValidExtension;
    });
    
    // Deduplicate files by name
    const newFiles = validFiles.filter(newFile => 
      !files.some(existingFile => existingFile.name === newFile.name)
    );
    
    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, [files]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type === 'application/vnd.ms-excel' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                         file.type === 'text/csv';
      const isValidExtension = /\.(xlsx|xls|csv)$/i.test(file.name);
      return isValidType || isValidExtension;
    });
    
    // Deduplicate files by name
    const newFiles = validFiles.filter(newFile => 
      !files.some(existingFile => existingFile.name === newFile.name)
    );
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    console.log('Uploading files:', files);
    // Here you would typically upload the files to the server
    onClose();
    setFiles([]);
  };

  const handleCancel = () => {
    onClose();
    setFiles([]);
  };

  if (!isOpen) return null;

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      data-testid="file-upload-modal"
    >
      <ModalContainer>
        <ModalTitle>Загрузка файла поставок</ModalTitle>
        
        <UploadArea
          $isDragOver={isDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
          data-testid="upload-area"
        >
          <UploadIcon>↓</UploadIcon>
          <UploadText>Перетащите файлы сюда или нажмите для выбора</UploadText>
          <UploadSubtext>Поддерживаются форматы: Excel (.xlsx, .xls), CSV</UploadSubtext>
        </UploadArea>

        <HiddenInput
          id="file-input"
          type="file"
          multiple
          accept=".xlsx,.xls,.csv"
          onChange={handleFileSelect}
          data-testid="file-input"
        />

        {files.length > 0 && (
          <FilesList>
            {files.map((file, index) => (
              <FileItem key={index} data-testid={`file-item-${index}`}>
                <div>
                  <FileName>{file.name}</FileName>
                  <FileSize> ({formatFileSize(file.size)})</FileSize>
                </div>
                <RemoveButton 
                  onClick={() => removeFile(index)}
                  data-testid={`button-remove-file-${index}`}
                >
                  ×
                </RemoveButton>
              </FileItem>
            ))}
          </FilesList>
        )}

        <ModalFooter>
          <Button 
            design="outline" 
            onClick={handleCancel}
            data-testid="button-cancel-upload"
          >
            Отмена
          </Button>
          <Button 
            design="primary" 
            onClick={handleUpload}
            disabled={files.length === 0}
            data-testid="button-confirm-upload"
          >
            Загрузить ({files.length} файл{files.length !== 1 ? (files.length > 4 ? 'ов' : 'а') : ''})
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
}